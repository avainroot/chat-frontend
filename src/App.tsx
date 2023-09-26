/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ControlsProps, SessionProps} from '@types';
import {translations, LOCALES} from '@translations';

import {
    ControlsContext, SessionsContext,
    UsersContext, TranslatorContext
} from '@context';
import {SessionsApi, ControlsApi, UsersApi} from '@api';
import {SignIn, Main, Page404} from '@pages';
import {notificationError} from '@components';
// import {createOperatorSocked} from '@helpers';
import { ChatContextProvider } from '@context/Chat';
import "./App.less";
import { SocketContextProvider } from '@context/Socket';

const localisation = {
    notificationErrorMassage: "ERROR!",
}

const timeoutDelayMs = 70000;
const defaultLocal = LOCALES.RUSSIAN;
let tmCheckToken: any;

// let cacheGroups: GroupsItemProps[] = [];

const App = () => {
    const [currentUser, setCurrentUser] = useState<any>();
    // const [groups, setGroups] = useState<GroupsItemProps[]>([]);
    const [controls, setControls] = useState<ControlsProps>();
    const [session, setSession] = useState<any>(localStorage.getItem("auth") || null);

    const onLogout = useCallback(async () => {
        await SessionsApi.remove();
        localStorage.removeItem("auth");
        window.location.pathname = "/sign-in"
    }, []);

    const getMainRoute = () => [
        <Route key={1} exact path="/error/404" component={Page404}/>,
        <Route key={2} path="/" component={Main}/>,
    ];

    const getLoginRoute = () => [
        <Route key={1} exact path="/sign-in" component={() => <SignIn/>}/>,
        <Route key={2} path="/" render={() => (<Redirect to={{pathname: "/sign-in"}}/>)}/>
    ];

    // const handleCommandCustomer = (data: any) => {
    //     const {id_cust} = data;
    //     console.log(cacheGroups)
    //     if (!cacheGroups.find(({id}: GroupsItemProps) => id === id_cust)) {
    //         cacheGroups.push({
    //             id: id_cust,
    //             name: `Customer #${id_cust}`,
    //             path: `/group-chat/${id_cust}`,
    //             countNewMassage: 0
    //         });
    //     }

    //     setGroups(cacheGroups.concat([]));
    // }

    // const handleDestroyCustomer = (data: any) => {
    //     const {id_cust} = data;
        
    //     cacheGroups = cacheGroups.filter(({id}: any) => id !== id_cust);

    //     setGroups(cacheGroups);
    // }

    useEffect(() => {

        const fetchControls = async () => {
            const controls = await ControlsApi.get();
            setControls(controls);

        }

        if (!session) {
            return
        }

        fetchControls().catch(console.error)

    }, [session])

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const currentUser = await UsersApi.getCurrent();

            setCurrentUser(currentUser);

            // if (currentUser) {
            //     const socked = createOperatorSocked({
            //         id: 200,
            //         groups: [100,200,300],
            //         onCommandCustomer: handleCommandCustomer,
            //         onDestroyCustomer: handleDestroyCustomer
            //     });
            //     setSocket(socked)
            // }

        }

        if (!session) {
            return
        }

        if (!currentUser) {
            fetchCurrentUser().catch(console.error);
        }

    }, [session])

    useEffect(() => {

        const checkSuccessResponse = async (response: any) => {
            const {status} = response;

            if (status === 401) {
                await onLogout();
            }

            return response;
        }

        const checkFailureResponse = async (error: any) => {
            const {response} = error;
            const {status, data} = response;

            if (status === 500 && data && !data.success) {
                notificationError({
                    message: localisation.notificationErrorMassage,
                    description: data.message
                });
            }
            else if (status === 401) {
                await onLogout();
            }

            return Promise.reject(error);
        }

        axios.interceptors.response.use(checkSuccessResponse, checkFailureResponse);
    })

    useEffect(() => {

        const onCheckToken = async (authData: SessionProps) => {

            if (!session) {
                return
            }

            const nowDateTime = (new Date()).getTime();
            const sessionDateTime = (new Date(authData.session_end)).getTime();
            const delay = sessionDateTime - (nowDateTime + timeoutDelayMs);

            if (delay <= 0) {
                await onLogout();
                return;
            }

            if (tmCheckToken) clearTimeout(tmCheckToken);

            tmCheckToken = setTimeout(async () => {
                const response = await SessionsApi.update();

                if (!response) {
                    await onLogout();
                    return
                }

                const {session_hash, session_end} = response;
                const auth: any = JSON.stringify({session_hash, session_end});

                setSession(auth);
            }, delay);
        }

        if (!session) {
            return
        }

        const authData: SessionProps = JSON.parse(session);
        // @ts-ignore
        axios.defaults.headers.common['x-session-hash'] = authData.session_hash;
        localStorage.setItem("auth", session);
        onCheckToken(authData).catch(e => console.error(e));

        return () => {
            if (tmCheckToken) clearTimeout(tmCheckToken);
        };
    }, [session, onLogout])

    return (
        <ControlsContext.Provider value={{
            controls: controls
        }}>
            <SessionsContext.Provider value={{
                session: session,
                setSession: setSession,
                deleteSession: onLogout,
            }}>
                <SocketContextProvider>
                    <TranslatorContext.Provider value={{
                        translator: translations[defaultLocal]
                    }}>
                        <UsersContext.Provider value={{
                            currentUser: currentUser
                        }}>
                            <ChatContextProvider>
                                {controls && <BrowserRouter>
                                    <Switch>{getMainRoute()}</Switch>
                                </BrowserRouter>}
                            </ChatContextProvider>
                        </UsersContext.Provider>

                        {!session && <BrowserRouter>
                            <Switch>{getLoginRoute()}</Switch>
                        </BrowserRouter>}

                    </TranslatorContext.Provider>
                </SocketContextProvider>
            </SessionsContext.Provider>
        </ControlsContext.Provider>
    );
}

export default App;
