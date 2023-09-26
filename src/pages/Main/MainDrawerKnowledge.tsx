import React from "react";
import { Drawer} from '@components';

import clsx from "clsx";
import { KnowledgeViewItem } from "@pages/KnowledgeView/KnowledgeViewItem";
import './MainDrawerKnowledge.less';


export interface MainDrawerKnowLedgeProps {
    visible?: boolean
    onClose?: () => void,
    itemId?: any
}

const prefixCls = "page-main-drawer-knowledge"

export const MainDrawerKnowledge : React.FC<MainDrawerKnowLedgeProps> = (props: MainDrawerKnowLedgeProps ) => {
    const {visible, onClose, itemId} = props;

    return (
        <Drawer
            onClose={onClose}
            className={clsx(prefixCls)}
            closable={true}
            visible={visible}
            mask={true}
        >
            <KnowledgeViewItem
                itemId={itemId}
            />
        </Drawer>
    );
}
