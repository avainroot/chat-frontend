import React from "react";
import {Badge as AntdBadge, BadgeProps as AntdBadgeProps} from 'antd';

export interface BadgeProps extends AntdBadgeProps {}

export const Badge: React.FC<BadgeProps> = (props: BadgeProps) => {
    return (<AntdBadge {...props}/>);
}