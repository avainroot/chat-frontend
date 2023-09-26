import React, {useState} from "react";

import {
    Button, Form, FormItem, Input,
    RadioGroup, Tag, Space, Popover,
    useForm
} from "@components";

import {TagItemProps} from "@types";
import {LockIcon, PlusIcon} from "@icons";
import clsx from "clsx";

import "./TagsList.less";


const prefixCls = "cmp-tags-list";

export type TagsListOptionProps = TagItemProps;

export interface TagsListProps {
    value?: Array<string>;
    options: Array<TagsListOptionProps>;
    onChange?: (value: any) => void;
    onCreate?: (value: any, metaData: any) => void;
    onRemove?: (value: TagsListOptionProps) => void;
    className?: string;
}

const defaultValue: TagItemProps = {
    value: null,
    label: "",
    type: "default"
};


export const TagsList: React.FC<TagsListProps> = (props: TagsListProps) => {
    let {
        value = [], options, onChange,
        className, onCreate, onRemove
    } = props;

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = useForm();

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const handleClick = (newValue: any) => {

        if (value.find((item: string) => item === newValue)) {
            value = value.filter((item: string) => newValue !== item);
        } else {
            value.push(newValue);
        }
        onChange!([...value]);
    };

    const handleFinish = (value: any) => {
        onCreate && onCreate(value, {setVisible, setLoading})
    }

    const handleClickCreate = () => {
        form.setFieldsValue(defaultValue)
        setVisible(true);
    }

    const getOptionsRadio = () => [
        {
            label: <span
                className={clsx(`${prefixCls}-circle`, `${prefixCls}-circle-default`)}
            >Обычный</span>,
            value: 'default',
        },
        {
            label: <span
                className={clsx(`${prefixCls}-circle`, `${prefixCls}-circle-warning`)}
            >Предупреждение</span>,
            value: 'warning',
        },
        {
            label: <span
                className={clsx(`${prefixCls}-circle`, `${prefixCls}-circle-success`)}
            >Иформирование</span>,
            value: 'success',
        }
    ]

    const getContent = () => (
        <Form
            form={form}
            layout='vertical'
            onFinish={handleFinish}
            initialValues={{...defaultValue}}
        >
            <FormItem
                name="label"
                rules={[{required: true, message: 'Пожалуйста введите название для тэга'}]}
            >
                <Input placeholder="Введите название"/>
            </FormItem>
            <FormItem
                name="type"
                rules={[{required: true, message: 'Пожалуйста укажите приоритет тэга'}]}
            >
                <RadioGroup options={getOptionsRadio()} direction='horizontal'/>
            </FormItem>
            <Space>
                <Button
                    size="small"
                    type='primary'
                    htmlType="submit"
                    loading={loading}
                >Добавить</Button>
                <Button
                    size="small"
                    type='secondary'
                    onClick={() => setVisible(false)}
                >Закрыть</Button>
            </Space>

        </Form>
    );

    return (
        <div className={clsx(`${prefixCls}`)}>
            {options.map(({label, type, disabled, ...props}: TagItemProps) => (
                <Tag
                    onRemove={onRemove && (() => onRemove && onRemove({label, type, disabled, ...props}))}
                    type={type}
                    key={props.value}
                    onClick={() => !disabled && handleClick(props.value)}
                    className={clsx(`${prefixCls}-item`, className, {
                        [`${prefixCls}-disabled`]: disabled,
                        [`${prefixCls}-active`]: value.indexOf(props.value) !== -1
                    })}
                >{disabled && <LockIcon/>}{label}</Tag>
            ))}
            {onCreate && <Popover
                content={getContent()}
                placement="bottom"
                visible={visible}
                trigger="click"
                onVisibleChange={handleVisibleChange}
            >
                <Button
                    size="small"
                    type="dropdown"
                    className={clsx(`${prefixCls}-button-create`)}
                    onClick={handleClickCreate}
                    beforeIcon={<PlusIcon/>}
                />
            </Popover>}
        </div>
    );
};
