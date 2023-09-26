import React from "react";
import {Input as AntdInput} from "antd";
import {TextAreaProps as AntdTextAreaProps} from "antd/lib/input/TextArea";
import clsx from "clsx";
import "./Textarea.less";

const prefixCls = "cmp-textarea";

export interface TextareaProps {
    value?: AntdTextAreaProps["value"]
    onBlur?: AntdTextAreaProps["onBlur"]
    onChange?: AntdTextAreaProps["onChange"]
    disabled?: AntdTextAreaProps["disabled"]
    onPressEnter?: AntdTextAreaProps["onPressEnter"]
    className?: AntdTextAreaProps["className"]
    placeholder?: AntdTextAreaProps["placeholder"]
}

export const Textarea: React.FC<TextareaProps> = (props: TextareaProps) => {
    const {
        disabled, value, onBlur,
        onChange, onPressEnter, className, placeholder
    } = props;

    return (<AntdInput.TextArea
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        onPressEnter={onPressEnter}
        className={clsx(className)}
        placeholder={placeholder}
        prefixCls={prefixCls}
        autoSize={{ minRows: 2, maxRows: 6 }}
    />);
}