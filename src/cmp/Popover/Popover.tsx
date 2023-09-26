import React, {useRef} from "react";
import {Popover as AntdPopover, PopoverProps as AntdPopoverProps} from "antd";
import clsx from "clsx";
import "./Popover.less";

export interface PopoverProps {
    className?: AntdPopoverProps["className"];
    placement?: AntdPopoverProps["placement"];
    visible?: AntdPopoverProps["visible"];
    trigger?: AntdPopoverProps["trigger"];
    onVisibleChange?: AntdPopoverProps["onVisibleChange"];
    content?: AntdPopoverProps["content"];
    children?: AntdPopoverProps["children"];
}

const prefixCls = "cmp-popover";

export const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
    const {
        children, className, placement, visible, content, onVisibleChange, trigger = "click"
    } = props;

    const popupContainer = useRef(null);

    return (
        <div ref={popupContainer} className={clsx(className, `${prefixCls}-cnt`)}>
            <AntdPopover
                trigger={trigger}
                prefixCls={clsx(className, `${prefixCls}`)}
                getPopupContainer={() =>
                    (popupContainer && popupContainer.current) || document.body
                }
                arrowPointAtCenter={false}
                placement={placement}
                content={content}
                visible={visible}
                onVisibleChange={onVisibleChange}
            >
                {children}
            </AntdPopover>
        </div>
    );
};
