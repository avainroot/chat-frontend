import React, { useState } from "react";
import {
  Input as AntdInput,
  InputProps as AntdInputProps,
} from "antd";
import { EyeIcon, SearchIcon } from "@icons";
import clsx from "clsx";
import "./Input.less";

const prefixCls = "cmp-input";

export interface InputProps {
  value?: AntdInputProps["value"];
  defaultValue?: AntdInputProps["defaultValue"];
  onBlur?: AntdInputProps["onBlur"];
  onClick?: AntdInputProps["onClick"];
  onChange?: AntdInputProps["onChange"];
  onPressEnter?: AntdInputProps["onPressEnter"];
  suffix?: AntdInputProps["suffix"];
  prefix?: AntdInputProps["prefix"];
  className?: AntdInputProps["className"];
  placeholder?: AntdInputProps["placeholder"];
  disabled?: AntdInputProps["disabled"];
  type?: AntdInputProps["type"];
  prefixCls?: AntdInputProps["prefixCls"];
  ref?: any;
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    disabled,
    type,
    value,
    onBlur,
    prefix,
    suffix,
    onChange,
    onPressEnter,
    className,
    placeholder,
    prefixCls = "cmp-input",
  } = props;

  return (
    <AntdInput
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      disabled={disabled}
      onPressEnter={onPressEnter}
      className={clsx(className)}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
      prefixCls={prefixCls}
    />
  );
};

export interface InputPasswordProps extends InputProps {
  type?: undefined;
  suffix?: undefined;
}

export const InputPassword: React.FC<InputPasswordProps> = (
  props: InputPasswordProps
) => {
  const [type, setType] = useState<AntdInputProps["type"]>("password");

  const handleClick = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <Input type={type} suffix={<EyeIcon onClick={handleClick} />} {...props} />
  );
};

export interface InputSearchProps extends InputProps {
  type?: undefined;
  prefix?: undefined;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  className,
  ...props
}: InputSearchProps) => {
  return (
    <Input
      className={clsx(`${prefixCls}-search`, className)}
      prefix={<SearchIcon />}
      {...props}
    />
  );
};
