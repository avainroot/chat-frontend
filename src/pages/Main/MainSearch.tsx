import React, { useState, useEffect } from "react";
import { TagsListOptionProps, GlobalSearch} from "@components";
import { TagsApi, KnowledgesApi } from "@api";
import {useBreakpoint} from "@helpers";

import { isMobile } from "@helpers";
import clsx from "clsx";
import {KnowledgeItemProps} from "@types";

import "./MainSearch.less";

export interface MainSearchProps {
  onItemClick: (id: KnowledgeItemProps["id"], e: any) => void
}

const prefixCls = "page-main-search";

export const MainSearch: React.FC<MainSearchProps> = (props: MainSearchProps) => {
  const {onItemClick} = props;

  const screens = useBreakpoint();

  const [optionsTags, setOptionsTags] = useState<TagsListOptionProps[]>([]);


  const handleSubmit = async (values: any) => { 
    return await KnowledgesApi.search(values);
  };



  useEffect(() => {
    const fetchInit = async () => {
      const tags = await TagsApi.getList();

      setOptionsTags(tags);
    };

    fetchInit().catch(console.error);
  }, []);

  return (
    <div
      className={clsx(`${prefixCls}`, {
        [`${prefixCls}-mobile`]: isMobile(screens),
      })}
    >
      <GlobalSearch
        onItemClick={onItemClick}
        onSearch={handleSubmit}
        dataTags={optionsTags}
      />
    </div>
  );
};
