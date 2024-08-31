export enum LanguageKnowledgeLevel {
    Intermediate,
    Proficient,
    Fluent,
    Native,
}

export const LANGUAGE_LEVEL_NAME: Record<LanguageKnowledgeLevel, string> = {
    [LanguageKnowledgeLevel.Intermediate]: "Intermediate",
    [LanguageKnowledgeLevel.Proficient]: "Proficient",
    [LanguageKnowledgeLevel.Fluent]: "Fluent",
    [LanguageKnowledgeLevel.Native]: "Native",
}

export const LANGUAGE_LEVEL_COLOR: Record<LanguageKnowledgeLevel, string> = {
    [LanguageKnowledgeLevel.Intermediate]: "rgb(249 115 22)",
    [LanguageKnowledgeLevel.Proficient]: "rgb(234 179 8)",
    [LanguageKnowledgeLevel.Fluent]: "rgb(101 163 13)",
    [LanguageKnowledgeLevel.Native]: "rgb(21 128 61)",
}

export const LANGUAGE_LEVEL_COLOR_LIGHTEN: Record<number, string> = {
    [LanguageKnowledgeLevel.Intermediate]: 'rgb(254 215 170)',
    [LanguageKnowledgeLevel.Proficient]: 'rgb(253 230 138)',
    [LanguageKnowledgeLevel.Fluent]: 'rgb(217 249 157)',
    [LanguageKnowledgeLevel.Native]: 'rgb(187 247 208)'
}

export type LanguageKnowledge = {
    id: string;
    lang: string;
    level: LanguageKnowledgeLevel;
}