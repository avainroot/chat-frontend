import {Radio as AntdRadio, RadioProps as AntdRadioProps} from "antd";
import React from "react";
import clsx from "clsx";

import "./Radio.less";

export interface RadioProps {
    style?: AntdRadioProps["style"];
    children?: AntdRadioProps["children"];
    disabled?: AntdRadioProps["disabled"];
    defaultValue?: AntdRadioProps["defaultChecked"];
    onChange?: (checked: boolean) => void;
    value?: AntdRadioProps["value"];
    className?: AntdRadioProps["className"];
    prefixCls?: AntdRadioProps["prefixCls"];
}

export interface RadioChangeEventTarget extends RadioProps {
    checked: boolean;
}

export interface RadioChangeEvent {
    target: RadioChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}

const prefixCls = "cmp-radio";

export const Radio: React.FC<RadioProps> = (props: RadioProps) => {
    const {defaultValue, value, disabled, style, children, onChange} = props;

    const handleChange: any = (event: RadioChangeEvent) => {
        onChange && onChange(event.target.value);
    };

    return (
        <AntdRadio
            value={value}
            style={style}
            disabled={disabled}
            defaultChecked={defaultValue}
            onChange={handleChange}
            prefixCls={clsx(`${prefixCls}`)}
        >
            {children}
        </AntdRadio>
    );
};
