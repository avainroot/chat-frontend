import React from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { html } from "js-beautify";
import clsx from 'clsx';
import "./Diff.less";
import { Drawer, Space, TypographyText } from "@components";
import { KnowledgeItemProps } from "@types";

export interface DiffProps {
    lastHtml: KnowledgeItemProps["content"] | undefined,
    currentHtml: KnowledgeItemProps["content"] | undefined,
    version: KnowledgeItemProps["version"] | undefined,
    onClose?: () => void,
}

const prefixCls = "cmp-diff";

const htmlOptions = {
    indent_size: 4,
    html: {
        end_with_newline: true
    }
};

export const Diff: React.FC<DiffProps> = (props: DiffProps) => {
    const { lastHtml, currentHtml, onClose, version } = props;


    const formatHTML = (htmlStr: string) => {
        const formattedHTML = html(htmlStr, htmlOptions);
        return new DOMParser().parseFromString(formattedHTML, "text/html").body.innerText;
    }

    return (
        <Drawer
            onClose={onClose}
            className={clsx(prefixCls)}
            placement="right"
            mask={false}
            closable={true}
            getContainer={false}
            visible={!!lastHtml}
        >
                <Space direction="vertical">
                    <TypographyText level='large'>Сравнение версий</TypographyText>
                    <ReactDiffViewer
                        splitView={true}
                        oldValue={formatHTML(lastHtml!)}
                        newValue={formatHTML(currentHtml!)}
                        compareMethod={DiffMethod.WORDS}
                        leftTitle={`Версия: ${version}`}
                        rightTitle="Текущая версия"
                    />
                </Space>
        </Drawer>
    );
}

