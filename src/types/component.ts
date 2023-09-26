import * as React from "react";

export type SizeProp = 'small' | 'middle' | 'large';

export type DirectionProp = 'horizontal' | 'vertical';

export type TagTypeProp = "default" | "warning" | "success";

export type OptionProps = {
    disabled?: boolean
    label: any
    value: any
    style?: React.CSSProperties
}