import React from "react";
import { DatePicker as AntdDatePicker, DatePickerProps as AntdDatePickerProps} from 'antd';
import clsx from "clsx";

import "./DatePicker.less";


import { CloseIcon, СalendarIcon } from "@assets/icons";

export interface DatePickerProps {
    placement?: AntdDatePickerProps["placement"],
    className?: AntdDatePickerProps["className"],
    value?: AntdDatePickerProps["value"],
    defaultValue?: AntdDatePickerProps["defaultValue"],
    onChange?: AntdDatePickerProps["onChange"]
}

const dateFormat = 'DD-MM-YYYY';

export const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
    const {
        placement, className, onChange, value, defaultValue
    } = props;

    return (
        <AntdDatePicker
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placement={placement}
            className={clsx(className)}
            suffixIcon={<СalendarIcon />}
            clearIcon={<CloseIcon/>}
            bordered={false}
            format={dateFormat}
            showToday={false}
        />
    )
}