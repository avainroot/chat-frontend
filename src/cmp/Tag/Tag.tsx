import React, {useState} from "react";
import {
    Button, Space, Popover, TypographyText
} from "@components";
import {Tag as AntdTag, TagProps as AntdTagProps} from "antd";
import {TagTypeProp} from "@types";
import {CloseIcon} from "@icons";
import clsx from "clsx";
import "./Tag.less";

export interface TagProps {
    type?: TagTypeProp;
    children?: AntdTagProps["children"];
    style?: AntdTagProps["style"];
    onClick?: (event: any) => void;
    className?: AntdTagProps["className"];
    onRemove?: () => void;
    size?: "small" | "default";
}

const prefixCls = "cmp-tag";

export const Tag: React.FC<TagProps> = (props: TagProps) => {
    const {
        children, type = "default", size = "default", className,
        onClick, onRemove
    } = props;
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        onRemove && onRemove()
        setVisible(false)
    }

    const handleVisibleRemoveChange = (visible: boolean) => {
        if (!visible) {
            setVisible(visible);
        }
    };

    const getContentRemove = () => (
        <Space direction="vertical">
            <TypographyText>Вы действительно хотите удалить?</TypographyText>
            <Space>
                <Button
                    size="small"
                    type='primary'
                    onClick={handleClick}
                >Да</Button>
                <Button
                    size="small"
                    type='secondary'
                    onClick={() => setVisible(false)}
                >Нет</Button>
            </Space>
        </Space>
    )

    return (
        <Popover
            onVisibleChange={handleVisibleRemoveChange}
            content={getContentRemove()}
            placement="top"
            visible={visible}
            trigger="click"
        >
            <AntdTag
                onClose={() => setVisible(true)}
                closable={!!onRemove}
                closeIcon={<CloseIcon/>}
                onClick={onClick}
                className={clsx(`${prefixCls}-${type}`, `${prefixCls}-${size}`, className)}
                prefixCls={prefixCls}
            >
                {children}
            </AntdTag>
        </Popover>

    );
};
