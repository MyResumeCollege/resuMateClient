import { InputProps } from "../input-props";

type TextAreaProps = {
    rows?: number;
}

export const TextArea = ({ value, onChange, label, wrapperClassName, inputClassName, disabled = false, placeholder, rows = 3 }: InputProps & TextAreaProps) => {
    return <div className={`flex flex-col gap-[5px] ${wrapperClassName}`}>
        {label && <label className="text-sm">{label}</label>}
        <textarea className={`py-3 px-4 block w-full border-transparent rounded-lg text-sm outline-2 focus:outline focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${inputClassName}`}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        ></textarea>
    </div>
}