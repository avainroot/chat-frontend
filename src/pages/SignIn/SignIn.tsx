import React, {useContext, useState} from 'react';
import clsx from 'clsx';

import {SessionsApi} from '@api';
import {SessionProps, SessionValuesProps} from '@types';
import {SessionsContext, TranslatorContext} from '@context';
import {Form, Input, Result, Button, FormItem, InputPassword, TypographyText} from '@components';
import {useHistory} from "react-router-dom";

const prefixCls = "page-sign-in"

const defaultInitialValues = {
    login: "",
    password: ""
}

export const SignIn = () => {
    const history = useHistory();
    const { setSession } = useContext(SessionsContext);
    const { translator } = useContext(TranslatorContext);

    const [loading, setLoading] = useState<boolean>(false);

    const localisation = translator["sign-in"];

    const onFinish = async (values: SessionValuesProps) => {
        setLoading(true);
        const response: SessionProps | null = await SessionsApi.create(values);
        setLoading(false);

        if (!response) {
            return;
        }

        const { session_hash, session_end } = response;

        const auth: string = JSON.stringify({session_hash, session_end});

        setSession && setSession(auth);

        history.push("/home")
    }

    return (
        <Result
            className={clsx(`${prefixCls}`)}
            icon={<></>}
            title={<TypographyText level="middle">{localisation.title}</TypographyText>}
            subTitle={localisation.subTitle}
            extra={<Form
                layout="vertical"
                autoComplete="off"
                name="page-sign-in"
                initialValues={{...defaultInitialValues}}
                className={clsx(`${prefixCls}-form`)}
                onFinish={onFinish}
            >

                <FormItem
                    label={localisation.fieldLogin}
                    name="login"
                    rules={[{ required: true, message: localisation.fieldLoginRequired }]}
                >
                    <Input/>
                </FormItem>

                <FormItem
                    label={localisation.fieldPassword}
                    name="password"
                    rules={[{ required: true, message: localisation.fieldPasswordRequired }]}
                >
                    <InputPassword/>
                </FormItem>

                <FormItem>
                    <Button
                        block
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                    >{localisation.button}</Button>
                </FormItem>

            </Form>}
        />
    );
}