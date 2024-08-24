import { CSSProperties, useState } from "react";
import { Button } from "../button/Button";

type RegenerateButtonProps = {
    onClick: () => void;
    style?: CSSProperties;
    mode?: 'white' | 'primary';
}

export const RegenerateButton = ({ onClick, style = {}, mode = 'primary' }: RegenerateButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);

        onClick();

        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }

    return <Button onClick={handleClick} style={style} buttonClassName="!w-fit !py-1 !pl-1 !pr-2 mb-1 !font-poppins" variant={mode === 'primary' ? 'outlined' : 'outlined-white'}>
        {loading ? <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
        }
        Regenerate
    </Button>
}