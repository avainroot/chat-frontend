import React from "react";
import {Result as AntdResult, ResultProps as AntdResultProps} from 'antd';

export interface ResultProps extends AntdResultProps {}

export const Result: React.FC<ResultProps> = (props: ResultProps) => {
    return (<AntdResult {...props}/>);
}

