type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
    text: string;
    dense?: boolean;
    variant?: ButtonVariant;
    onClick?: () => void;
}

export const Button = ({ text, dense = false, variant = 'primary', onClick }: ButtonProps) => {
    const classesByVariant: Record<ButtonVariant, string> = {
        primary: 'bg-primary',
        secondary: 'bg-accent'
    }

    const classesByDense = dense ? 'py-2 px-3' : 'py-3 px-4';

    return <button
        type="button"
        onClick={onClick}
        className={`transition-all w-full h-fit ${classesByDense} inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none hover:brightness-90 ${classesByVariant[variant]}`}>
        {text}
    </button>
}