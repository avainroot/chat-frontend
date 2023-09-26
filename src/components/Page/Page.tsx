import React from "react";
import {Breadcrumb, BreadcrumbItem} from "../Breadcrumb/Breadcrumb";
import {useHistory} from "react-router-dom"
import clsx from "clsx";
import "./Page.less";

const prefixCls = "component-page"

interface PageBreadcrumbItemProps {
    title?: string | JSX.Element
    href?: string
}

export interface PageProps {
    className?: string
    breadcrumb?: Array<PageBreadcrumbItemProps>
    children?: JSX.Element | JSX.Element[] | null
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
    const {children, breadcrumb, className} = props;
    const history = useHistory();

    const handleHref = (href?: string) => {
        if (href) {
            history.push(href);
        }
    }

    const renderBreadcrumb = (breadcrumb?: Array<PageBreadcrumbItemProps>) => {

        return <Breadcrumb className={clsx(`${prefixCls}-breadcrumb`)}>
            {breadcrumb?.map(
                ({title, href}: PageBreadcrumbItemProps, key: number) =>
                    <BreadcrumbItem
                        key={key}
                        className={clsx(`${prefixCls}-link`)}
                        onClick={() => handleHref(href)}
                    >{title}</BreadcrumbItem>
            )}
        </Breadcrumb>
    }

    return <div className={clsx(className, `${prefixCls}`)}>
        {breadcrumb && <div className={clsx(`${prefixCls}-title`)}>{renderBreadcrumb(breadcrumb)}</div>}
        <div className={clsx(`${prefixCls}-body`)}>{children}</div>
    </div>;
}