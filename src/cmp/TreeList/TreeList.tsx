import React, {useState} from "react";
import {TypographyText} from "../Typography/Typography";
import {ButtonText} from "../Button/Button";
import {ArrowDownIcon, ArrowUpIcon, ForwardIcon, ConfigIcon} from "@icons";
import {GroupItemProps} from "@types";
import clsx from "clsx";

import "./TreeList.less";

export type TreeListItemValueType = GroupItemProps["value"]

export interface TreeListItemProps extends GroupItemProps {}

export interface TreeListProps {
    onClickConfig?: (value: TreeListItemValueType) => void
    activeKey?: TreeListItemValueType
    items?: Array<TreeListItemProps>
    onClick?: (value: TreeListItemProps) => void
}

const prefixCls = "cmp-tree-list";

export const TreeList : React.FC<TreeListProps> = (props: TreeListProps) => {
    const { items, activeKey, onClick, onClickConfig } = props;

    const [expandKeys, setExpandKeys] = useState<Array<TreeListItemValueType>>([]);

    const handleExpand = (key: string) => {

        if (expandKeys.indexOf(key) > -1) {
            expandKeys.splice(expandKeys.indexOf(key), 1);
        }
        else {
            expandKeys.push(key);
        }

        setExpandKeys([...expandKeys]);
    }

    const handleActive = (record: TreeListItemProps) => {
        onClick && onClick(record);
    }

    const getItemCard = ({ label, value, type = "info", items }: TreeListItemProps) => (<div
        key={value}
        className={clsx(`${prefixCls}-card`)}
    >
        <div className={clsx(`${prefixCls}-indicator`, `${prefixCls}-indicator-${type}`)}/>

        <div>
            <div className={clsx(`${prefixCls}-header`)}>
                {onClickConfig && <ButtonText
                    size="small"
                    onClick={() => onClickConfig(value)}
                    className={clsx(`${prefixCls}-config`)}
                    afterIcon={<ConfigIcon/>}
                />}
                <TypographyText level="large">{label}</TypographyText>
                <ButtonText
                    size="large"
                    onClick={() => handleExpand(value)}
                    afterIcon={expandKeys.indexOf(value) > -1 ? <ArrowUpIcon/> : <ArrowDownIcon/>}
                />
            </div>
            {items && <div
                className={clsx(`${prefixCls}-body`, {
                    "expand": expandKeys.indexOf(value) > -1
                })}
            >{items.map(getItem)}</div>}
        </div>
                
    </div>)

    const getItem = ({ label, value, ...props }: TreeListItemProps) => (<div
        key={value}
        onClick={() => handleActive({ label, value, ...props })}
        className={clsx(`${prefixCls}-item`, {
            "active": activeKey === value
        })}
    >
        <span>{label}</span>
        <ForwardIcon/>
    </div>)


    return (<div className={clsx(prefixCls)}>
        {items?.map((item: TreeListItemProps) => getItemCard(item))}
    </div>);
}

