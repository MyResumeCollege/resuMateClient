import { CSSProperties } from "react";

type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outlined' | 'outlined-danger' | 'outlined-white';

type ButtonProps = {
    text?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    dense?: boolean;
    variant?: ButtonVariant;
    loading?: boolean;
    onClick?: () => void;
    style?: CSSProperties;
    buttonClassName?: string;
}

export const Button = ({ text = 'Text is missing', disabled = false, loading = false, children, dense = false, variant = 'primary', onClick, style = {}, buttonClassName = '' }: ButtonProps) => {
    const classesByVariant: Record<ButtonVariant, string> = {
        primary: 'bg-primary',
        secondary: 'bg-accent',
        light: 'bg-white border text-black',
        outlined: 'border-2 !text-primary !border-primary',
        'outlined-danger': 'border-2 !text-[#d75b5b] !border-[#d75b5b]',
        'outlined-white': 'border-2 !text-white !border-[white]'
    }

    const classesByDense = dense ? 'py-2 px-3' : 'py-3 px-4';

    return <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={`transition-all w-full h-fit ${classesByDense} inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none hover:brightness-90 ${classesByVariant[variant]} ${buttonClassName}`}
        style={style}
    >
        {loading ?
            <span className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
            : (children || text)}
    </button>
}