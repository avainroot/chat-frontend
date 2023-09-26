import React from "react";
import {Menu as AntdMenu, MenuProps as AntdMenuProps} from "antd";

export interface MenuProps extends AntdMenuProps {}

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
    return (<AntdMenu {...props}/>);
}

export const MenuItem = AntdMenu.Item;
export const MenuSubMenu = AntdMenu.SubMenu;
export const MenuItemGroup = AntdMenu.ItemGroup;
