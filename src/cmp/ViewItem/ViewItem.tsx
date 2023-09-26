import React, {useState} from "react";
import { TypographyText, TypographyTitle, Tag, Space, Button, Loader, Drawer} from "@components";
import { KnowledgeItemProps, KnowledgeVersionProps } from "@types";
import {PencilIcon} from "@assets/icons";
import moment from "moment";
import clsx from "clsx";

import "./ViewItem.less";

const prefixCls = "cmp-view-item";

export interface ViewItemProps {
    record: KnowledgeItemProps;
    onClick?: (id: KnowledgeItemProps["id"]) => void;
    onGetVersionsList?: (id: any, metaData: any) => void;
    listVersions?: KnowledgeVersionProps[];
    onClose?: (metaData: any) => void;
    onGetVersion?: (id: any, metaData: any) => void;
}

export const ViewItem: React.FC<ViewItemProps> = (props: ViewItemProps) => {
    const { onClick, onGetVersionsList, listVersions = [], onClose, onGetVersion } = props;

    // @ts-ignore
    const record = props.record[0];

    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false)
    
    const handleClickVersions = (id: any) => {
        onGetVersionsList!(id, { setLoading, setVisible })
    }
    
    const handleClose = () => {
        onClose!({setVisible})
    }

    const handleVersion = (id: any) => {
        onGetVersion!(id, {setLoading})
    }


    return (
        <>
        <div className={clsx(`${prefixCls}`)}>
            <Space direction="vertical">
                <div className={clsx(`${prefixCls}-top`)}>
                    <Space direction="horizontal" size="small">
                        {record.tags?.map(({tag_id, tag_name, type_name}: any) => (
                            <Tag key={tag_id} type={type_name}>
                                {tag_name}
                            </Tag>
                        ))}
                    </Space>

                    {onClick && <Button
                        size="small"
                        afterIcon={<PencilIcon/>}
                        type="dropdown"
                        className={clsx(`${prefixCls}-pencil`)}
                        onClick={() => onClick && onClick(record.id)}
                    />}
                </div>

                <TypographyTitle level="title">{record.title}</TypographyTitle>
                    {onGetVersionsList ?
                        <TypographyText
                            level="middle"
                        >
                            <span
                                className={clsx(`${prefixCls}-link`)}
                                onClick={() => handleClickVersions(record.id)}
                            >Версия: {record.version}</span>
                        </TypographyText> :
                        <TypographyText level="middle">Версия: {record.version} </TypographyText>
                    }
                <div dangerouslySetInnerHTML={{__html: record.content}} />
                <Space>
                    <TypographyText disabled level="small">{record.author}</TypographyText>
                    <TypographyText disabled level="small">{moment(record.update_date).format("LL")}</TypographyText>
                </Space>

            </Space>
            </div>
            
            <Drawer
                onClose={handleClose}
                className={clsx(prefixCls)}
                placement="right"
                mask={true}
                closable={true}
                getContainer={false}
                visible={visible}
            >
                <Loader spinning={loading} size="middle">
                    {!loading && (listVersions!.map(({ id, content, name, start, end, tags }) =>
                        <div
                            key={id}
                            className={clsx(`${prefixCls}-container`)}
                        >
                            <Space size='small' direction="vertical">
                                <Space direction="horizontal">
                                    {tags?.map(({ value, type, label }: any) => (
                                        <div key={value}>
                                            <Tag type={type} size='small'>
                                                {label}
                                            </Tag>
                                        </div>
                                    ))}
                                </Space>
                                <Space>
                                    <TypographyText>
                                        <span
                                            className={clsx(`${prefixCls}-link`)}
                                            onClick={() => handleVersion(id)}
                                        >
                                            {name}
                                        </span>
                                    </TypographyText>
                                    <TypographyText disabled level="small">с: {moment(start).format("LL")}</TypographyText>
                                    <TypographyText disabled level="small">по: {moment(end).format("LL")}</TypographyText>
                                </Space>
                                <div>{content}</div>
                            </Space>
                        </div>))}
                </Loader>
            </Drawer> 
        </>
    );
};