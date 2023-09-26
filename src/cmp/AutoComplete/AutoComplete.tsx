import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete as AntdAutoComplete, AutoCompleteProps as AntdAutoCompleteProps } from 'antd';
import { Button, Loader, Popover, Space, TypographyText } from '@components';
import { PlusIcon } from '@assets/icons';
import clsx from "clsx";

import "./AutoComplete.less"
import { GroupItemProps } from '@types';

export interface AutoCompleteProps {
    value?: AntdAutoCompleteProps["value"];
    placeholder?: AntdAutoCompleteProps["placeholder"];
    options?: Array<GroupItemProps>;
    onChange?: (value: any) => void;
    onCreate?: (value: any, metaData: any) => void;
}

const prefixCls = "cmp-auto-complete";

export const AutoComplete: React.FC<AutoCompleteProps> = (props: AutoCompleteProps) => {
    const { placeholder, options, onCreate, onChange, value } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [autoCompleteText, setAutoCompleteText] = useState<string>();

    const filterList = (inputValue: string, option: GroupItemProps | undefined): boolean => {
        return (option!.label!.toString()).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    }
  

    const handleFinish = () => {
        onCreate!(autoCompleteText, { setVisible, setLoading })
    }

    const handleVisible = () => {
        setVisible(true)
    }
    
    const handleClose = () => {
        setVisible(false)
    }

    const handleSelect = useCallback((value: any) => {
        const option = options?.find((option: any) => option.value === value);
        if (option) {
            setAutoCompleteText(option.label)
            onChange!(option.value)
        }
    }, [onChange, options])

    useEffect(() => {
        handleSelect(value)
    }, [handleSelect, value])

    const handleChange = (value: any) => {
        setAutoCompleteText(value)
    }

    const handleVisibleChange = (visible: boolean) => {
        if (!visible) {
            setVisible(visible);
        }
    };



    const getContent = () => (
        <Space direction="vertical">
            <TypographyText>Вы действительно хотите добавить?</TypographyText>
            <Space>
                <Button
                    size="small"
                    type='primary'
                    onClick={handleFinish}
                >Да</Button>
                <Button
                    size="small"
                    type='secondary'
                    onClick={handleClose}
                >Нет</Button>
            </Space>
        </Space>
    )

    return (
        <>
            {onCreate && autoCompleteText && 
                    <Popover
                        onVisibleChange={handleVisibleChange}
                        content={getContent()}
                        placement="top"
                        visible={visible}
                        trigger="click"
                    >
                        <Button
                            afterIcon={loading ? <Loader size='small'/> : <PlusIcon />}
                            size="middle"
                            className={clsx(`${prefixCls}-button-create`)}
                            type="dropdown"
                            onClick={handleVisible}
                        />
                </Popover>
            }
            <AntdAutoComplete
                prefixCls={clsx(`${prefixCls}`)}
                options={options}
                value={autoCompleteText}
                onChange={(value: string) => handleChange(value)}
                filterOption={(inputValue, option) => filterList(inputValue, option)}
                placeholder={placeholder}
                onSelect={(value: string) => handleSelect(value)}
            />
      </>
    );
};


