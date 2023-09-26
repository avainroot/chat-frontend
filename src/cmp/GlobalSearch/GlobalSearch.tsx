import React, { useContext, useState } from "react";
import { Popover as AntdPopover } from "antd";
import {
    InputSearch, Tag, TagsListOptionProps, TagsList,
    Form, Space, FormItem, useForm, Button, ButtonText,
    Select, RadioGroupProps, Loader, TypographyText, TypographyTitle
} from "@components";
import {useBreakpoint} from "@helpers";
import {TranslatorContext} from "@context";
import {KnowledgeItemProps} from "@types";
import {SearchIcon} from "@assets/icons";
import { isMobile } from "@helpers";
import {CloseIcon} from "@icons";
import moment from "moment";
import clsx from "clsx";

import "./GlobalSearch.less";
import { useChatContext } from "@context/Chat";

export interface GlobalSearchProps {
    onItemClick: (id: KnowledgeItemProps["id"], e: any) => void
    onSearch: (values: any) => Promise<KnowledgeItemProps[]>
    dataTags?: TagsListOptionProps[]

}

const prefixCls = "cmp-global-search";

export const GlobalSearch: React.FC<GlobalSearchProps> = (props: GlobalSearchProps) => {
    const {onItemClick, onSearch, dataTags} = props;

    const {translator} = useContext(TranslatorContext);
    const localisation = translator.main;
    const screens = useBreakpoint();
    const [form] = useForm();

    const {room} = useChatContext();

    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [findItems, setFindItems] = useState<KnowledgeItemProps[]>([]);

    const optionsRadio: RadioGroupProps["options"] = [
        {
            value: "all",
            label: localisation.allDate,
        },
        {
            value: "last_day",
            label: localisation.lastDay,
        },
        {
            value: "last_week",
            label: localisation.lastWeek,
        },
        {
            value: "last_month",
            label: localisation.lastMonth,
        },
        {
            value: "last_year",
            label: localisation.lastYear,
        },
    ];

    const [date, setDate] = useState<string>(localisation.allDate);

    const handleSubmit = async (values: any) => {

        setLoading(true);

        const result = await onSearch({
            ...{...values, tags: values.tags.length ? values.tags.join(','): []}, 
            ...{context_hash: room?.project_id}
        });

        setFindItems(result || []);

        setLoading(false);
    };

    const handleClick = (id: any, e: any) => {
        onItemClick(id, e);
    }

    const getContent = () => (
        <div className={clsx(`${prefixCls}-body`)}>

            <Form
                form={form}
                layout={isMobile(screens) ? "vertical" : "horizontal"}
                autoComplete="off"
                className={clsx(`${prefixCls}-form`)}
                onFinish={handleSubmit}
            >

                <div className={clsx(`${prefixCls}-header`)}>
                    <FormItem name="search">
                        <InputSearch
                            className={prefixCls}
                            placeholder={localisation.placeholderSearch}
                            onPressEnter={() => form.submit()}
                        />
                    </FormItem>
                    <Button
                        size="middle"
                        type="secondary"
                        onClick={() => form.resetFields()}
                    >
                        {localisation.resetFilter}
                    </Button>
                    <Button
                        beforeIcon={<CloseIcon/>}
                        size="large"
                        type="dropdown"
                        onClick={() => setVisible(false)}
                    />
                </div>

                <Space
                    size="large"
                    className={clsx(`${prefixCls}-filter`)}
                    direction={isMobile(screens) ? "vertical" : "horizontal"}
                >
                    <FormItem label={localisation.tags} name="tags">
                        <TagsList options={dataTags || []}/>
                    </FormItem>
                    <FormItem
                        initialValues={localisation.allDate}
                        label={localisation.period}
                        name="period"
                    >
                        <Select
                            value={date}
                            onChange={setDate}
                            bordered={false}
                            options={optionsRadio}
                        />
                    </FormItem>
                </Space>
            </Form>

            <Loader
                spinning={loading}
                size="middle"
            >
                {!loading && <Space direction="vertical" size="large">
                    {findItems.map(({content, author, update_date, title, tags, id, category_id}: KnowledgeItemProps) => (
                        <Space key={id} direction="vertical">
                            <TypographyTitle level="title">
                                <span
                                    className={clsx(`${prefixCls}-link`)}
                                    onClick={(e: any) => handleClick(id, e)}
                                >{title}</span>
                            </TypographyTitle>
                            <div>{content}</div>
                            <Space direction="horizontal" size="small">
                                {tags?.map(({value, type, label, tag_id, type_name, tag_name}: any) => (
                                    <Tag size="small" key={tag_id} type={type_name}>
                                        {tag_name}
                                    </Tag>
                                ))}
                            </Space>
                            <Space>
                                <TypographyText disabled level="small">{author}</TypographyText>
                                <TypographyText disabled level="small">{moment(update_date).format("LL")}</TypographyText>
                            </Space>
                        </Space>
                    ))}
                </Space>}
            </Loader>
        </div>
    );

    return (
        <AntdPopover
            content={getContent()}
            prefixCls={clsx(`${prefixCls}-popover`)}
            placement="bottom"
            visible={visible}
            trigger="click"
            onVisibleChange={() => {}}
        >
            <ButtonText
                size="large"
                beforeIcon={<SearchIcon/>}
                onClick={() => setVisible(true)}
                className={clsx(`${prefixCls}-button`, {
                    [`${prefixCls}-button-mobile`]: isMobile(screens)
                })}
            >{!isMobile(screens) && localisation.searchArticle}</ButtonText>
        </AntdPopover>
    );
};
