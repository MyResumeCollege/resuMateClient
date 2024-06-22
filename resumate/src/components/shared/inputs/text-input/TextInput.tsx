import { InputProps } from "../input-props";

export const TextInput = ({ value, disabled = false, autoFocus = false, label, wrapperClassName, onChange, type = 'text', placholder, icon }: InputProps) => {
    return (<div className={`space-y-3 ${wrapperClassName}`}>
        <div className="relative flex flex-col gap-[5px]">
            {label && <label className="text-sm">{label}</label>}
            <input
                autoFocus={autoFocus}
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange && onChange(e.target.value)}
                className={`peer py-3 px-4 ${icon ? 'ps-11' : ''} block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                placeholder={placholder}
            />
            {icon &&
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                    {icon}
                </div>}
        </div>
    </div>)
}
