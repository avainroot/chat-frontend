import React from "react";
import {Breadcrumb as AntdBreadcrumb, BreadcrumbProps as AntdBreadcrumbProps} from 'antd';
import {Space} from '@components';
import {useHistory} from "react-router-dom"
import clsx from 'clsx';
import "./Breadcrumb.less";

export interface BreadcrumbItemProps {
    title: React.ReactNode
    icon?: React.ReactNode
    href?: string
}

export interface BreadcrumbProps {
    className?: AntdBreadcrumbProps["className"]
    items: Array<BreadcrumbItemProps>
}

const prefixCls = "cmp-breadcrumb";
const AntdBreadcrumbItem = AntdBreadcrumb.Item;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({className, items}: BreadcrumbProps) => {
    const history = useHistory();

    const renderItems = (items: BreadcrumbProps["items"]) => (
        items.map(({ title, href, icon }: BreadcrumbItemProps, i: number) => (
            <AntdBreadcrumbItem
                key={i}
                href={href}
                prefixCls={clsx(`${prefixCls}-item`)}
                onClick={(event: any) => {
                    href && history.push(href);
                    event.preventDefault();
                }}
            >
                <Space>{icon}{title}</Space>
            </AntdBreadcrumbItem>
        ))
    )

    return (<AntdBreadcrumb
        prefixCls={prefixCls}
        className={clsx(className)}
    >{renderItems(items)}</AntdBreadcrumb>);
}