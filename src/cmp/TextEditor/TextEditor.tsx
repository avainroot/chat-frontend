import React, { useState } from "react";
import clsx from "clsx";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";

import "./TextEditor.less";
import TextEditorToolbar, { modules, formats } from "./TextEditorToolbar";

export interface TextEditorProps {
  style?: React.CSSProperties;
  value?: ReactQuillProps["value"];
  placeholder?: ReactQuillProps["placeholder"];
  onChange?: ReactQuillProps["onChange"];
}

const prefixCls = "cmp-text-editor";

export const TextEditor: React.FC<TextEditorProps> = (
  props: TextEditorProps
) => {
  const { value, onChange} = props;

  const [bigEditor, setBigEditor] = useState<boolean>(false);

  return (
    <div className={clsx(`${prefixCls}`, {
      [`${prefixCls}-full-screen`]: bigEditor
    })}>
      <TextEditorToolbar
        bigEditor={bigEditor}
        onChangeModal={() => setBigEditor((bigEditor) => !bigEditor)}
      />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        theme="snow"
        className={clsx(`${prefixCls}-editor`)}
      />
    </div>
  );
};
