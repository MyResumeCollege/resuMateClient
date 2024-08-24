
type EditableTextProps = React.PropsWithChildren & {
    onChange: (newValue: string) => void;
    readonly: boolean;
    className?: string;
}

export const EditableText = ({ children, onChange, readonly, className }: EditableTextProps) => {
    return <div className={className} contentEditable={!readonly} suppressContentEditableWarning onInput={e => onChange(e.currentTarget.textContent || '')}>
        {children}
    </div>
}