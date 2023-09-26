import React from "react";
import clsx from "clsx"
import "./Icon.less"

const prefixCls = "icon";

export interface IconProps {
    IconSvg?: any
    onClick?: any
}

export const Icon: React.FC<IconProps> = ({IconSvg, onClick}: IconProps) => {

    return <i className={clsx(`${prefixCls}`)} onClick={onClick}>
        <IconSvg width="1em" height="1em" fill="currentColor"/>
    </i>
}