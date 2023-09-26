import React from "react";
import { Breadcrumb, BreadcrumbProps } from "../Breadcrumb/Breadcrumb";
import clsx from "clsx";
import "./BlankPage.less";

const prefixCls = "cmp-blank-page";

export interface BlankPageProps {
  breadcrumb?: BreadcrumbProps["items"];
  children?: JSX.Element | JSX.Element[] | null;
  actions?: JSX.Element | JSX.Element[] | null;
  className?: string;
}

export const BlankPage: React.FC<BlankPageProps> = (props: BlankPageProps) => {
  const { className, children, breadcrumb, actions } = props;

  const renderBreadcrumb = (breadcrumb: BlankPageProps["breadcrumb"]) => {
    return (
      breadcrumb && (
        <Breadcrumb
          className={clsx(`${prefixCls}-breadcrumb`)}
          items={breadcrumb}
        />
      )
    );
  };

  return (
    <div className={clsx(`${prefixCls}`, className)}>
      {breadcrumb && (
        <div className={clsx(`${prefixCls}-title`)}>
          {renderBreadcrumb(breadcrumb)}
          {actions}
        </div>
      )}
      <div className={clsx(`${prefixCls}-body`)}>{children}</div>
    </div>
  );
};
