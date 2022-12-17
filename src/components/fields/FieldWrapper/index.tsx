import React, { ReactNode } from "react";

export interface FieldWrapperProps {
    children: ReactNode;
    helperText?: string;
    errorText?: string;
    label?: string;
}

const FieldWrapper = ({
    children,
    errorText,
    helperText,
    label,
}: FieldWrapperProps) => {
    return <div>{children}</div>;
};

export default FieldWrapper;
