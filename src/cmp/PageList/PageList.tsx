import React, { useContext, useState } from "react";
import { TranslatorContext } from "@context";
import { Select, SelectProps } from "../Select/Select";
import { InputSearch } from "../Input/Input";
import { Loader, LoaderProps } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { PageListItem } from "./PageListItem";
import clsx from "clsx";
import "./PageList.less";

export type PageListDataItemProps = any;

export interface PageListFieldsItemProps {
  label?: React.ReactNode;
  render?: (value: any, record: PageListDataItemProps) => React.ReactNode;
  dataIndex: string;
}

export interface PageListProps {
  keyField?: string;
  data: Array<PageListDataItemProps>;
  loading?: LoaderProps["spinning"];
  fields: Array<PageListFieldsItemProps>;
  sortOptions?: SelectProps["options"];
  defaultSort?: SelectProps["defaultValue"];
  getPrefix?: (record: PageListDataItemProps) => React.ReactNode;
  onChangeSearch?: (value: string) => void;
  onChangeSort?: (value: string) => void;
  onRemove?: (record: PageListDataItemProps, params: any) => void;
  onEdit?: (record: PageListDataItemProps) => void;
}

const prefixCls = "cmp-page-list";

let tm: any;

export const PageList = (props: PageListProps) => {
  const { translator } = useContext(TranslatorContext);

  const {
    data,
    fields,
    getPrefix,
    onEdit,
    onChangeSearch,
    sortOptions,
    onChangeSort,
    defaultSort,
    loading,
    onRemove,
    keyField = "id",
  } = props;

  const localisation = translator["components"];
  const [currentRecord, setCurrentRecord] = useState<
    PageListDataItemProps | boolean
  >();
  const [removing, setRemoving] = useState<boolean>();

  const handleChangeSearch = (event: any) => {
    const value = event.target.value;

    tm && clearTimeout(tm);

    tm = setTimeout(() => onChangeSearch && onChangeSearch(value), 500);
  };

  const handleCancel = () => {
    setCurrentRecord(undefined);
  };

  const handleIconRemove = (record: any) => {
    setCurrentRecord(record);
  };

  const handleRemove = () => {
    onRemove &&
      onRemove(currentRecord, { setVisible: setCurrentRecord, setRemoving });
  };

  return (
    <div className={clsx(`${prefixCls}`)}>
      <Modal
        title={localisation.warning}
        visible={!!currentRecord}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={removing}
            onClick={handleRemove}
          >
            {localisation.yes}
          </Button>,
          <Button
            key="cancel"
            type="secondary"
            disabled={removing}
            onClick={handleCancel}
          >
            {localisation.no}
          </Button>,
        ]}
      >
        {localisation.question}
      </Modal>

      <div className={clsx(`${prefixCls}-toolbar`)}>
        <div className={clsx(`${prefixCls}-toolbar-action`)}>
          {sortOptions && (
            <Select
              bordered={false}
              onChange={onChangeSort}
              defaultValue={defaultSort}
              className={clsx(`${prefixCls}-sort-field`)}
              placeholder={localisation.sort_placeholder}
              options={sortOptions}
            />
          )}
        </div>

        {onChangeSearch && (
          <InputSearch
            onChange={handleChangeSearch}
            onPressEnter={handleChangeSearch}
            placeholder={localisation.search}
          />
        )}
      </div>

      <Loader spinning={loading}>
        <div className={clsx(`${prefixCls}-body`)}>
          {data &&
            data.map((record: any) => (
              <PageListItem
                key={record[keyField]}
                onEdit={onEdit}
                onRemove={handleIconRemove}
                fields={fields}
                record={record}
                getPrefix={getPrefix}
              />
            ))}
        </div>
      </Loader>
    </div>
  );
};
