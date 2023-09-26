import React, {useContext, useEffect, useState} from "react";
import {Menu, MenuItem, MenuItemGroup, Avatar, AvatarGroup, Badge, Space, TypographyText } from '@components';
import {ControlsContext, GroupsContext} from '@context';
import {useHistory} from "react-router-dom";
import {MenuItemProps, GroupsItemProps} from '@types';
import {menuItems} from "@helpers";
import clsx from 'clsx';

import './MainMenu.less';

export interface MainMenuProps {
    onClick?: (item: MenuItemProps) => void
}

const prefixCls = "page-main-menu"

export const MainMenu : React.FC<MainMenuProps> = (props: MainMenuProps) => {
    const history = useHistory();
    const { controls } = useContext(ControlsContext);
    const { groups } = useContext(GroupsContext);

    const { onClick } = props;

    const [selectedKeys, setSelectedMenuKeys] = useState<Array<string>>();

    useEffect(() => {
        if (history?.location?.pathname) {
            setSelectedMenuKeys([history?.location?.pathname]);
        }
    }, [history?.location?.pathname])

    const renderMenuItem = ({path, name, children, Icon, ...props}: MenuItemProps) => (
        !children || !children.length ?
            <MenuItem
                key={path}
                icon={<Icon/>}
                onClick={() => onClick && onClick({path, name, children, Icon, ...props})}
            >{name}</MenuItem> :
            <MenuItemGroup
                key={`group-${path}`}
                title={name}
            >
                {children?.map(child => {
                    return renderMenuItem(child)
                })}
            </MenuItemGroup>
    )

    return (
        <Menu
            selectedKeys={selectedKeys}
            theme="dark"
            mode="inline"
            className={clsx(`${prefixCls}`)}
        >
            {menuItems
                .filter((item: MenuItemProps) => !item.control || !!controls[item.control])
                .map((item: MenuItemProps) => renderMenuItem(item))}
            {groups && <MenuItemGroup
                key={`group-chats`}
                title="Активные чаты"
            >{groups.map(({path, name, description, countNewMassage, ...props}: GroupsItemProps) => (<MenuItem
                className={clsx(`${prefixCls}-item-chat`)}
                key={path}
                onClick={() => onClick && onClick({path, name, ...props})}
            >
                <Badge size="small" count={countNewMassage} offset={[-14, 2]}>
                    <div className={clsx(`${prefixCls}-item-chat-cnt`)}>
                        <AvatarGroup maxCount={2}>
                            <Avatar size="small"/>
                            <Avatar size="small"/>
                        </AvatarGroup>
                        <Space direction="vertical" size="small">
                            <TypographyText>{name}</TypographyText>
                            <TypographyText type="secondary">{description}</TypographyText>
                        </Space>
                    </div>
                </Badge>
            </MenuItem>))}
            </MenuItemGroup>}

        </Menu>
    );
}
