export type InputProps = {
    value: string;
    wrapperClassName?: string;
    inputClassName?: string;
    label?: string;
    autoFocus?: boolean;
    onChange?: (newValue: string) => void;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    icon?: React.ReactNode;
    maxLength?: number;
}
