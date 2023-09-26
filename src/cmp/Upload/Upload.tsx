import { Upload, UploadProps as AntdUploadProps } from "antd";
import React from "react";
import { DownloadIcon } from "@icons";
import "./Upload.less";

export interface UploadProps {
  data?: AntdUploadProps["data"];
  action?: AntdUploadProps["action"];
  method?: AntdUploadProps["method"];
  prefixCls?: AntdUploadProps["prefixCls"];
  fileList?: AntdUploadProps["fileList"];
  onChange?: AntdUploadProps["onChange"];
}

const prefixCls = "cmp-upload";

export const UploadFile: React.FC<UploadProps> = (props: UploadProps) => {
  const { onChange } = props;
  return (
    <Upload.Dragger onChange={onChange} prefixCls={prefixCls}>
      <DownloadIcon />
    </Upload.Dragger>
  );
};
