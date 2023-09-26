import React from "react";
import { Form as AntdFrom, FormProps as AntdFromProps } from "antd";
import { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import clsx from "clsx";
import "./Form.less";

export interface FormProps {
  form?: AntdFromProps["form"];
  name?: AntdFromProps["name"];
  layout?: AntdFromProps["layout"];
  autoComplete?: AntdFromProps["autoComplete"];
  onFinish?: AntdFromProps["onFinish"];
  initialValues?: AntdFromProps["initialValues"];
  className?: AntdFromProps["className"];
  children?: AntdFromProps["children"];
}

const prefixCls = "cmp-form";

export const Form: React.FC<FormProps> = (props: FormProps) => {
  const {
    children,
    form,
    className,
    name,
    layout,
    autoComplete,
    onFinish,
    initialValues,
  } = props;

  return (
    <AntdFrom
      prefixCls={prefixCls}
      name={name}
      form={form}
      layout={layout}
      autoComplete={autoComplete}
      onFinish={onFinish}
      initialValues={initialValues}
      className={className}
    >
      {children}
    </AntdFrom>
  );
};

export interface FormItemProps {
  label?: AntdFormItemProps["label"];
  name?: AntdFormItemProps["name"];
  rules?: AntdFormItemProps["rules"];
  children?: AntdFormItemProps["children"];
  className?: AntdFormItemProps["className"];
  layout?: AntdFromProps["layout"];
  initialValues?: AntdFromProps["initialValues"];
}

export const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
  const { className, label, name, rules, layout, children, initialValues } =
    props;
  return (
    <AntdFrom.Item
      prefixCls={clsx(`${prefixCls}`)}
      label={label}
      name={name}
      rules={rules}
      initialValue={initialValues}
      className={clsx(className, {
        [`${prefixCls}-item-${layout}`]: layout,
      })}
    >
      {children}
    </AntdFrom.Item>
  );
};

export const useForm = AntdFrom.useForm;
