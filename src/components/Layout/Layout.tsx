import React from "react";
import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from 'antd';

export interface LayoutProps extends AntdLayoutProps {}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (<AntdLayout {...props}/>);
}

export const LayoutContent = AntdLayout.Content;

export const LayoutHeader = AntdLayout.Header;

export const LayoutSider = AntdLayout.Sider;

export const LayoutFooter = AntdLayout.Footer;
