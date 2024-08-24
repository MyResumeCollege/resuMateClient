import { ResumeSections } from "./resume";

export type TemplateProps = {
    resume: ResumeSections;
    onRegenerateSection: (section: keyof ResumeSections) => void;
    onRephraseSection: (section: keyof ResumeSections, newValue: string) => void;
    readonly?: boolean;
}