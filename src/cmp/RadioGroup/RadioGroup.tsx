import React, { useState, useEffect } from "react";
import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
} from "antd";

import { DirectionProp, OptionProps } from "@types";
import { Radio } from "../Radio/Radio";
import clsx from "clsx";
import "./RadioGroup.less";

export interface RadioGroupProps {
  direction?: DirectionProp;
  options?: Array<OptionProps>;
  disabled?: AntdRadioGroupProps["disabled"];
  defaultValue?: AntdRadioGroupProps["defaultValue"];
  onChange?: AntdRadioGroupProps["onChange"];
  value?: AntdRadioGroupProps["value"];
  className?: AntdRadioGroupProps["className"];
}

const prefixCls = "cmp-radio-group";

export const RadioGroup: React.FC<RadioGroupProps> = (
  props: RadioGroupProps
) => {
  const [innerValue, setInnerValue] = useState<RadioGroupProps["value"]>();

  const {
    disabled,
    defaultValue,
    onChange,
    value,
    options,
    direction = "vertical",
    className,
  } = props;

  const handleChange = (value: any) => {
    onChange && onChange(value || []);
    setInnerValue(value);
  };

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <AntdRadio.Group
      prefixCls={prefixCls}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={disabled}
      value={innerValue}
      className={clsx(
        `${prefixCls}-${direction}`,
        className
      )}
    >
      {options?.map(({ label, value, ...props }) => (
        <Radio value={value} key={value} {...props}>
          {label}
        </Radio>
      ))}
    </AntdRadio.Group>
  );
};
