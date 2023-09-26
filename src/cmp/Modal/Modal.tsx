import React, {useEffect} from "react";
import {Modal as AntdModal, ModalProps as AntdModalProps} from 'antd';
import {CloseIcon} from "@icons";
import "./Modal.less";

export interface ModalProps {
    title?: AntdModalProps["title"]
    visible?: AntdModalProps["visible"]
    closable?: AntdModalProps["closable"]
    footer?: AntdModalProps["footer"]
    className?: AntdModalProps["className"]
    onCancel?: AntdModalProps["onCancel"]
    children?: React.ReactNode,
    width?: AntdModalProps["width"]
}

const prefixCls = "cmp-modal";

export const Modal: React.FC<ModalProps> = ({visible, ...props}: ModalProps) => {

    useEffect(() => {
        document.getElementById("root")?.classList[visible ? "add" : "remove"]("cmp-modal-open");
    }, [visible])

    return (<AntdModal
        {...props}
        visible={visible}
        centered={true}
        prefixCls={prefixCls}
        destroyOnClose={true}
        closeIcon={<CloseIcon/>}
        getContainer={() => document.querySelector(".page-main-page") || document.body}
    />);
}