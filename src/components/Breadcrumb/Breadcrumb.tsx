import React from "react";
import {Breadcrumb as AntdBreadcrumb, BreadcrumbProps as AntdBreadcrumbProps} from 'antd';

export interface BreadcrumbProps extends AntdBreadcrumbProps {}

export const Breadcrumb: React.FC<BreadcrumbProps> = (props: BreadcrumbProps) => {
    return (<AntdBreadcrumb {...props}/>);
}

export const BreadcrumbItem = AntdBreadcrumb.Item;