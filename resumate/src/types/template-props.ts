import { ResumeSections } from "./resume";

export type TemplateProps = {
    resume: ResumeSections;
    onRegenerateSection: (section: keyof ResumeSections) => void;
    onRephraseSection: (section: keyof ResumeSections, newValue: string, index?: number) => void;
    readonly?: boolean;
}