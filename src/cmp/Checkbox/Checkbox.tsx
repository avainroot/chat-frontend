import React from "react";
import {Checkbox as AntdCheckbox, CheckboxProps as AntdCheckboxProps} from 'antd';
import {CheckboxChangeEvent as AntdCheckboxChangeEvent} from 'antd/lib/checkbox/Checkbox';
import {SizeProp} from '@types';
import clsx from "clsx";
import "./Checkbox.less";

export interface CheckboxProps {
    style?: AntdCheckboxProps["style"]
    children?: AntdCheckboxProps["children"]
    disabled?: AntdCheckboxProps["disabled"]
    defaultValue?: AntdCheckboxProps["defaultChecked"]
    onChange?: (checked: boolean) => void
    value?: AntdCheckboxProps["checked"]
    size?: SizeProp
}

const prefixCls = "cmp-checkbox";

export const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {

    const { defaultValue, onChange, value, disabled, size = "middle", style, children } = props;

    const handleChange: any = (event: AntdCheckboxChangeEvent) => {
        onChange && onChange(event.target.checked)
    }

    return (<AntdCheckbox
        style={style}
        prefixCls={prefixCls}
        disabled={disabled}
        defaultChecked={defaultValue}
        onChange={handleChange}
        value={value}
        className={clsx(`${prefixCls}-${size}`)}
    ><span className={clsx(`${prefixCls}-box-label`)}>{children}</span>
    </AntdCheckbox>);
}