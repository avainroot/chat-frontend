import React from "react";
import {Avatar as AntdAvatar, AvatarProps as AntdAvatarProps} from 'antd';

export interface AvatarProps extends AntdAvatarProps {}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
    return (<AntdAvatar {...props}/>);
}

export const AvatarGroup = AntdAvatar.Group;