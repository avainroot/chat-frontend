/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import { matchPath, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {
    Layout, LayoutHeader, LayoutContent,
    LayoutSider, Space
} from '@components';
import {ControlsContext, SessionsContext, TranslatorContext} from '@context';
import {ERoomStatus, RoomProps, RoomsGroup, RoutesItemProps, TypesGroup} from '@types';
import {isMobile, routeItems, useBreakpoint} from '@helpers';
import { NotificationsIcon, SingOutIcon} from '@icons';
// import {LogoImg} from '@images';

import {MainButton} from './MainButton';
import {MainAvatar} from './MainAvatar';
// import {MainMenu} from './MainMenu';

// import Arrow from '../../assets/icons/arrow.svg';
// import SearchBtn from '../../assets/icons/search.svg';

import clsx from 'clsx';
import './Main.less';
// import { Collapse } from 'antd';
import { RoomsApi } from '@api';
import { useChatContext } from '@context/Chat';
// import { Scrollbar } from '@components/Scrollbar/Scrollbar';
// import Search from 'antd/lib/input/Search';
import { InputSearch } from '@cmp/Input/Input';
// import { TypographyText } from '@cmp/Typography/Typography';
import { TreeList } from '@cmp/TreeList/TreeList';
import { Tag } from '@cmp/Tag/Tag';
import { MainSearch } from './MainSearch';
import { MainDrawerKnowledge } from './MainDrawerKnowledge';
import { MainDrawerNotifications } from './MainDrawerNotifications';
import { useSocketContext } from '@context/Socket';
import { MsgUnread } from '@components/ChatWindow/MsgUnread';

export interface MainProps {}

const prefixCls = "page-main"

export const Main: React.FC<MainProps> = () => {

    const screens = useBreakpoint();
    const { socket } = useSocketContext();
    const history = useHistory();
    const { pathname } = useLocation();
    const match: any = matchPath(pathname, {
        path: "/group-chat/:id",
        exact: true,
        strict: false
    });

    const { 
        setRoom, 
        roomsList, 
        setRoomsList 
    } = useChatContext();

    const { controls } = useContext(ControlsContext);
    const { translator } = useContext(TranslatorContext);
    const { deleteSession } = useContext(SessionsContext);

    const localization = translator.main;

    const [collapsed] = useState<boolean>(false);

    const [rooms, setRooms] = useState<RoomProps[] | undefined>();
    const [searchTO, setSearchTO] = useState<any>();
    // const { Panel } = Collapse;

    // const handleMenuItem = ({path}: MenuItemProps) => {
    //     path && history.push(path);
    // }

    const [visibleKnowledge, setVisibleKnowledge] = useState<boolean>(false);
    const [visibleNotifications, setVisibleNotifications] = useState<boolean>(false);
    const [notify] = useState<boolean>(true);
    const [itemId, setItemId] = useState<any>();

    useEffect(()=>{
        const result = RoomsApi.getRooms();
        result.then((rooms: RoomProps[]) => {
            setRooms(rooms);
            setRoomsList(rooms);
        })
    },[])

    useEffect(()=>{
        if(socket) {
            socket.on('createGroup', ()=>{
                const result = RoomsApi.getRooms();
                result.then((rooms: RoomProps[]) => {
                    setRooms(rooms);
                    setRoomsList(rooms);
                })
            })
        }
    },[socket])

    const searchHandle = (e: any) => {
        if(searchTO) clearTimeout(searchTO);
        const searchRooms = setTimeout(()=>{
            if(rooms) {
                const result = rooms.filter((room: RoomProps)=>{
                    let selectFields = room.customer_name+' '+room.project_name+' '+room.resource;
                    return selectFields.match(e.target.value)
                })
                setRoomsList(e.target.value ? result : (rooms ? rooms : result))
            }
        }, 400);
        setSearchTO(searchRooms);
    }

    const TextGroups: RoomsGroup = {
        [ERoomStatus.Processing]: localization.chatStatus.processing,
        [ERoomStatus.Queue]: localization.chatStatus.queue,
        [ERoomStatus.Closed]: localization.chatStatus.closed
    }

    const TypeGroups: TypesGroup = {
        [ERoomStatus.Processing]: 'success',
        [ERoomStatus.Queue]: 'warning',
        [ERoomStatus.Closed]: 'info'
    }

    const handleClick = ({value, room}: any) => {
        setRoom(room);
        history.push(`/group-chat/${value}`);
    }

    const groupRows = () => {
        const id: number | boolean = match ? parseInt(match.params.id) : false;

        const statusArr: any = Object.values(ERoomStatus).filter((v) => !isNaN(Number(v)));

        let rows: any[] = [];

        statusArr.map((statID: ERoomStatus, index: number) => {
            const group = roomsList.filter((room:RoomProps)=> room.status_id === statID);
            
            if(group.length) {
                const items = group.map((room:RoomProps, i) => {
                    return {
                        label: <>
                            <div>#{room.id} {room.customer_name} <MsgUnread classPrefix={prefixCls} count={3} /></div>
                            <Tag >{room.project_name}</Tag>
                        </>,
                        value: room.id,
                        room: room
                    }
                })
                rows.push({
                    label: TextGroups[statID],
                    value: statID,
                    type: TypeGroups[statID],
                    items: items
                })
            }
  
            return rows
        })

        // @ts-ignore
        return <TreeList 
            activeKey={id} 
            items={rows} 
            onClick={handleClick} 
        />
    }

    const handleClickKnowledge = (id: any, e: any) => {
        if (e.ctrlKey === true) {
            window.open(`${window.location.origin}/knowledge/view/item/${id}`)
        } else {
            setItemId(id)
            setVisibleKnowledge(true)
        }
    };

    const handleCloseKnowledge = () => {
        setVisibleKnowledge(false)
    }

    const handleClickNotifications = () => {
        setVisibleNotifications(true)
    }
    const handleCloseNotifications = () => {
        setVisibleNotifications(false)
    }

    return (
        <Layout className={clsx(`${prefixCls}`, {
            [`${prefixCls}-collapsed`]: collapsed,
            [`${prefixCls}-mobile`]: isMobile(screens)
        })}>
            <LayoutSider
                className={clsx(`${prefixCls}-sider`)}
                collapsed={collapsed}
                width={300}
            >
                <div
                    className={clsx(`${prefixCls}-logo`)}
                >
                    <InputSearch 
                        placeholder={localization.placeholderChatsSearch}
                        onChange={searchHandle}
                    />
                </div>

                {/* <MainMenu
                    onClick={handleMenuItem}
                /> */}
                
                {roomsList && groupRows()}

                {/* {roomsList ? (
                    <Collapse
                        className='Room-List'
                        defaultActiveKey={['1']}
                        bordered={false}
                    >
                        {groupRow()}
                    </Collapse>
                ): (<></>)} */}

            </LayoutSider>

            <Layout>

                <LayoutHeader className={clsx(`${prefixCls}-header`)}>

                    <MainSearch
                        onItemClick={handleClickKnowledge}
                    />

                    <MainDrawerKnowledge
                        itemId={itemId}
                        visible={visibleKnowledge}
                        onClose={handleCloseKnowledge}
                    />

                    <MainDrawerNotifications 
                        visible={visibleNotifications}
                        onClose={handleCloseNotifications}
                    />

                    <Space
                        size="large"
                        align="center"
                        className={clsx(`${prefixCls}-header-right`)}
                    >
                        <div className={clsx(`${prefixCls}-header-notify ${notify ? 'isNotify': ''}`)}>
                            <MainButton
                                title={localization.notifications}
                                onClick={handleClickNotifications}
                                icon={<NotificationsIcon />}
                            />
                        </div>
                        <MainButton
                            title={localization.exit}
                            onClick={deleteSession}
                            icon={<SingOutIcon />}
                        />
                        <MainAvatar/>
                    </Space>

                </LayoutHeader>

                <Layout>

                    <LayoutContent className={clsx(`${prefixCls}-content`)}>

                        <Switch>
                            {routeItems
                                .filter((item: any) => !item.control || !!controls[item.control])
                                .map(({path, Component}: RoutesItemProps, index: number) => (
                                    <Route
                                        exact
                                        key={index}
                                        path={path}
                                        render={props => <Component {...props}/>}
                                    />
                                ))}
                            <Redirect to="/error/404"/>
                        </Switch>

                    </LayoutContent>

                </Layout>

            </Layout>
        </Layout>
    );
}