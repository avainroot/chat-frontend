import React, {useEffect} from "react";
import {TypographyText} from "../Typography/Typography";

export interface FieldDisplayProps {
    value?: any
    onChange?: any
    format?: any
}

export const FieldDisplay: React.FC<FieldDisplayProps> = (props: FieldDisplayProps) => {
    const {value, onChange, format} = props;

    useEffect(() => {
        onChange && onChange(value);
    }, [value, onChange]);

    return (
        <TypographyText disabled>{(!format ? value : format(value)) || "n/a"}</TypographyText>
    );
}