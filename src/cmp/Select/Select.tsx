import React from "react";
import {Select as AntdSelect, SelectProps as AntdSelectProps} from 'antd';
import {ArrowDownIcon} from "@icons";
import clsx from "clsx";
import {OptionProps} from "@types";
import "./Select.less";

export interface SelectProps {
    value?: AntdSelectProps["value"]
    defaultValue?: AntdSelectProps["defaultValue"]
    onBlur?: AntdSelectProps["onBlur"]
    onChange?: AntdSelectProps["onChange"]
    onClear?: AntdSelectProps["onClear"]
    onDeselect?: AntdSelectProps["onDeselect"]
    className?: AntdSelectProps["className"]
    placeholder?: AntdSelectProps["placeholder"]
    bordered?: AntdSelectProps["bordered"]
    options?: Array<OptionProps>
}

const prefixCls = "cmp-select";

export const Select : React.FC<SelectProps> = (props: SelectProps) => {
    const {
        options, placeholder, className, value, defaultValue,
        onBlur, onChange, onClear, onDeselect, bordered = true
    } = props;

    return (<AntdSelect
        placement="bottomLeft"
        bordered={bordered}
        dropdownMatchSelectWidth={false}
        placeholder={placeholder}
        className={clsx(className)}
        virtual={false}
        value={value}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onChange={onChange}
        onClear={onClear}
        onDeselect={onDeselect}
        suffixIcon={<ArrowDownIcon/>}
        prefixCls={prefixCls}
    >{options?.map(({value, label}) =>
        <AntdSelect.Option key={value}>{label}</AntdSelect.Option>)
    }</AntdSelect>);
}

