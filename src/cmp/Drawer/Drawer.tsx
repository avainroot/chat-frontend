import React from "react";
import {Drawer as AntdDrawer, DrawerProps as AntdDrawerProps} from "antd";
import {CloseIcon} from "@assets/icons";
import clsx from "clsx";

import "./Drawer.less";

export interface DrawerProps {
    children?: AntdDrawerProps["children"];
    visible?: AntdDrawerProps["visible"];
    className?: AntdDrawerProps["className"];
    size?: AntdDrawerProps["size"];
    placement?: "right" | "left";
    mask?: AntdDrawerProps["mask"];
    closable?: AntdDrawerProps["closable"];
    getContainer?: AntdDrawerProps["getContainer"];
    prefixCls?: AntdDrawerProps["prefixCls"];
    onClose?: () => void
}

const prefixCls = "cmp-drawer";

export const Drawer: React.FC<DrawerProps> = (props: DrawerProps) => {
    const {
        children, visible, onClose, className, size,
        placement = "right", mask, closable, getContainer
    } = props;

    return (
        <AntdDrawer
            destroyOnClose={true}
            prefixCls={clsx(`${prefixCls}`)}
            className={clsx(className)}
            getContainer={getContainer}
            closeIcon={<CloseIcon/>}
            placement={placement}
            closable={closable}
            visible={visible}
            onClose={onClose}
            mask={mask}
            size={size}
        >{children}</AntdDrawer>
    );
};
