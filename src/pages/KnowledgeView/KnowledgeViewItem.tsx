import React, {useEffect, useState} from "react";
import {Loader, ViewItem} from "@components";
import {KnowledgeItemProps} from "@types";
import {KnowledgesApi} from "@api";

import "./KnowledgeViewItem.less";

const prefixCls = "page-knowledge-view-item";

export interface KnowledgeViewItemProps {
    itemId?: any,
}

export const KnowledgeViewItem: React.FC<KnowledgeViewItemProps> = (
    props: KnowledgeViewItemProps
) => {

    const {itemId} = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [record, setRecord] = useState<KnowledgeItemProps>();


    useEffect(() => {

        const fetchInit = async () => {
            setLoading(true);
            const record = itemId ? await KnowledgesApi.getRecord(itemId) : undefined;
            setRecord(record);
            setLoading(false);
        }

        fetchInit().catch(console.error)

    }, [itemId]);


    return (
        <div className={prefixCls}>
            <Loader
                spinning={loading}
                size="middle"
            >
                {record && (
                    <ViewItem
                        record={record}
                    />
                )}
            </Loader>
        </div>
    );
};