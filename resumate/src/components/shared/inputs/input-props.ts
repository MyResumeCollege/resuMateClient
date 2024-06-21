export type InputProps = {
    value: string;
    wrapperClassName?: string;
    label?: string;
    onChange?: (newValue: string) => void;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    placholder?: string;
    icon?: React.ReactNode;
}
