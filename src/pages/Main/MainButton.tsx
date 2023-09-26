import React from "react";
import {ButtonText, Tooltip} from '@components';
import './MainButton.less';
import clsx from "clsx";

export interface MainButtonProps {
    icon: JSX.Element | null
    title: string
    onClick?: () => void
}

const prefixCls = "page-main-button"

export const MainButton : React.FC<MainButtonProps> = (props: MainButtonProps) => {
    const {icon, onClick, title} = props;

    return (
        <Tooltip title={title}>
            <ButtonText
                afterIcon={icon}
                size="large"
                onClick={onClick}
                className={clsx(`${prefixCls}`)}
            />
        </Tooltip>

    );
}
