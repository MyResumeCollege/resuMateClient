export type InputProps = {
    value: string;
    wrapperClassName?: string;
    label?: string;
    autoFocus?: boolean;
    onChange?: (newValue: string) => void;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    placholder?: string;
    icon?: React.ReactNode;
}
