import React, {useContext} from "react";
import {Avatar, Tooltip} from '@components';
import {UsersContext} from '@context';
import './MainAvatar.less';
import clsx from "clsx";

export interface MainAvatarProps {
}

const prefixCls = "page-main-avatar"

export const MainAvatar : React.FC<MainAvatarProps> = () => {
    const {currentUser} = useContext(UsersContext);

    const getName = () => {
        const {name, surname, login} = currentUser

        if (name && surname) {
            return `${name[0].toUpperCase()}${surname[0].toUpperCase()}`
        }

        return `${login[0].toUpperCase()}${login[1].toUpperCase()}`
    }

    if (!currentUser) {
        return null
    }

    return (
        <Tooltip title={currentUser.login}>
            <Avatar
                className={clsx(`${prefixCls}`)}
                size={56}
            >{getName()}</Avatar>
        </Tooltip>

    );
}
