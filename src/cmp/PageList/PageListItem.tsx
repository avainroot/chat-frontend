import React, {useState, useEffect, useRef} from "react";
import {PageListFieldsItemProps, PageListDataItemProps, PageListProps} from './PageList';
import {PencilIcon, TrashIcon} from '@icons';
import clsx from "clsx";
import "./PageListItem.less";

export type PageListItemFieldProps = PageListFieldsItemProps;
export type PageListItemFieldsProps = Array<PageListItemFieldProps>;

export interface PageListItemProps {
    onEdit?: PageListProps["onEdit"]
    onRemove?: (record: PageListDataItemProps) => void
    getPrefix?: PageListProps["getPrefix"]
    fields?: PageListItemFieldsProps
    isTotal?: boolean
    record: any
}

const prefixCls = "cmp-page-list-item";

export const PageListItem: React.FC<PageListItemProps> = (props: PageListItemProps) => {
    const {fields, record, isTotal, onEdit, onRemove} = props;
    const [titleField, setTitleField] = useState<PageListItemFieldProps>();
    const elItem = useRef<any>(null);

    const getValue = (record: any, {render, dataIndex, renderTotal}: any) => {
        const _render = isTotal ? renderTotal : render;

        return _render ?
            _render(record[dataIndex], record) : record[dataIndex]
    }

    const getTitle = () => {

        if (!titleField) {
            return null
        }

        const value = getValue(record, titleField);

        return (
            <div
                key="title"
                className={clsx(`${prefixCls}-title`)}
            >
                <div
                    onClick={() => onEdit && onEdit(record)}
                    className={clsx(`${prefixCls}-value`)}
                >{value}<PencilIcon/></div>
                <div className={clsx(`${prefixCls}-splitter`)}/>
                {onRemove && <TrashIcon onClick={() => onRemove && onRemove(record)}/>}
            </div>
        )
    }

    const getFields = (fields: any) => (
        fields?.map(({dataIndex, label, render, ...props}: PageListItemFieldProps, i: number) => {

            const value = getValue(record, {dataIndex, label, render, ...props});

            return (
                <div
                    key={i}
                    className={clsx(`${prefixCls}-field`)}
                >
                    <div className={clsx(`${prefixCls}-label`)}>{label}</div>
                    <div className={clsx(`${prefixCls}-value`, {
                        [`${prefixCls}-value-total`]: isTotal
                    })}>{value}</div>
                </div>
            )

        })
    )

    useEffect(() => {

        const titleField = fields?.filter((_: any, i: number) => i === 0)[0] || (fields && fields[0]);

        setTitleField(titleField);

    }, [fields])

    return (
        <div
            ref={elItem}
            className={clsx(prefixCls, {
                [`${prefixCls}-total`]: isTotal
            })}
        >
            <div className={clsx(`${prefixCls}-wrap`)}>
                {titleField && getTitle()}

                <div className={clsx(`${prefixCls}-data`)}
                >{getFields(fields?.filter((_: any, i: number) => i > 0))}</div>
            </div>
        </div>
    );
}