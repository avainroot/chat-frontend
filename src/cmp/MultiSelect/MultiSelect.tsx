import React, {useContext, useState, useMemo} from "react";
import {Input, InputSearch} from '../Input/Input';
import {Popover, PopoverProps} from '../Popover/Popover';
import {CheckboxGroup, CheckboxGroupProps} from '../CheckboxGroup/CheckboxGroup';
import {TranslatorContext} from "@context";
import {ArrowDownIcon} from "@icons";
import {OptionProps} from "@types";
import clsx from "clsx";
import "./MultiSelect.less";

export interface MultiSelectProps {
    value?: CheckboxGroupProps["value"]
    onChange?: CheckboxGroupProps["onChange"]
    defaultValue?: CheckboxGroupProps["defaultValue"]
    className?: PopoverProps["className"]
    options?: CheckboxGroupProps["options"]
}

const prefixCls = "cmp-multi-select";

export const MultiSelect : React.FC<MultiSelectProps> = (props: MultiSelectProps) => {
    const {
        options, className, value, defaultValue, onChange
    } = props;
    const { translator } = useContext(TranslatorContext);
    const [visible, setVisible] = useState<any>(false)
    const [search, setSearch] = useState<string>();
    const localisation = translator["components"];

    const data = useMemo(() => options && options.sort((a: any, b: any) => {
        if (value && value.indexOf(a.value) > -1 && value.indexOf(b.value) === -1) {
            return -1
        }
        else if (value && value.indexOf(a.value) === -1 && value.indexOf(b.value) > -1) {
            return 1
        }
        else {
            return a.label > b.label ? 1 : -1;
        }
        // eslint-disable-next-line
    }), [options, visible])

    const getContent = (() => (<div className={clsx(`${prefixCls}-body`)}>
        <InputSearch
            placeholder={localisation.search}
            onChange={(e: any) => setSearch(e.target.value)}
        />
        <CheckboxGroup
            size="large"
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            options={data && data.map(({label, style, ...props}: OptionProps) => ({
                label, ...props, style: {display: !hasSearched(label) ? "none" : "", ...style}
            }))}
        />
    </div>))

    const hasSearched = (text: string) => !search || (text && text.toLowerCase().indexOf(search.toLowerCase()) > -1);

    const handleClick = () => {
        setVisible(!visible)
    }

    return (<Popover
        className={clsx(`${prefixCls}-popover`, className)}
        content={getContent()}
        placement="bottom"
        visible={visible}
        onVisibleChange={setVisible}
    >
        <Input
            disabled={true}
            placeholder={value && value.length ? `Выбрано (${value.length})` : `Выбрать` }
            className={clsx(`${prefixCls}-input`)}
            onClick={handleClick}
            suffix={<span
                onClick={handleClick}
                className={clsx(`${prefixCls}-input-icon`)}
            >{<ArrowDownIcon/>}</span>}
        />
    </Popover>);
}

