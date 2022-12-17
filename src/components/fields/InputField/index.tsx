import FieldWrapper, {
    FieldWrapperProps,
} from "@/src/components/fields/FieldWrapper";
import { forwardRef, LegacyRef } from "react";

interface InputFieldProps extends Omit<FieldWrapperProps, "children"> {}

const InputField = forwardRef(
    (
        { helperText, errorText, label, ...inputProps }: InputFieldProps,
        ref: LegacyRef<HTMLInputElement>
    ) => {
        return (
            <FieldWrapper
                helperText={helperText}
                errorText={errorText}
                label={label}
            >
                <input />
            </FieldWrapper>
        );
    }
);

export default InputField;
