import React from "react";
import {Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps} from 'antd';
import "./Tooltip.less";

export interface TooltipProps {
    title: AntdTooltipProps["title"]
    placement?: AntdTooltipProps["placement"]
    trigger?: AntdTooltipProps["trigger"]
    children: AntdTooltipProps["children"]
    arrowPointAtCenter?: AntdTooltipProps["arrowPointAtCenter"]
}

const prefixCls = "cmp-tooltip";

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {

    const {title, children, placement = "bottom", trigger = "hover", arrowPointAtCenter} = props;

    return (<AntdTooltip
        title={title}
        trigger={trigger}
        placement={placement}
        prefixCls={prefixCls}
        arrowPointAtCenter={arrowPointAtCenter}
    >{children}</AntdTooltip>);
}