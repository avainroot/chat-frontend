import React, {useState, useEffect} from "react";
import {Checkbox as AntdCheckbox} from 'antd';
import {CheckboxGroupProps as AntdCheckboxGroupProps} from 'antd/lib/checkbox';
import {SizeProp, OptionProps, DirectionProp} from '@types';
import {Checkbox} from '../Checkbox/Checkbox';
import clsx from "clsx";
import "./CheckboxGroup.less";

export interface CheckboxGroupProps {
    direction?: DirectionProp
    options?: Array<OptionProps>
    disabled?: AntdCheckboxGroupProps["disabled"]
    defaultValue?: AntdCheckboxGroupProps["defaultValue"]
    onChange?: AntdCheckboxGroupProps["onChange"]
    value?: AntdCheckboxGroupProps["value"]
    className?: AntdCheckboxGroupProps["className"]
    size?: SizeProp
}

const prefixCls = "cmp-checkbox";

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props: CheckboxGroupProps) => {
    const [innerValue, setInnerValue] = useState<CheckboxGroupProps["value"]>();

    const {
        disabled, defaultValue, onChange, value, options,
        direction = "vertical", className, size = "middle"
    } = props;

    const handleChange = (value: any) => {
        onChange && onChange(value || []);
        setInnerValue(value);
    }

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    return (<AntdCheckbox.Group
        prefixCls={prefixCls}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={disabled}
        value={innerValue}
        className={clsx(`${prefixCls}-${size}`, `${prefixCls}-${direction}`, className)}
    >{options?.map(({label, value, ...props}) =>
        <Checkbox value={value} key={value} size={size} {...props}>{label}</Checkbox>)}</AntdCheckbox.Group>);
}