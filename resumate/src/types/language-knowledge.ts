export enum LanguageKnowledgeLevel {
    Advanced,
    Native,
}

export const LANGUAGE_LEVEL_NAME: Record<LanguageKnowledgeLevel, string> = {
    [LanguageKnowledgeLevel.Advanced]: "Advanced",
    [LanguageKnowledgeLevel.Native]: "Native",
}

export const LANGUAGE_LEVEL_COLOR: Record<LanguageKnowledgeLevel, string> = {
    [LanguageKnowledgeLevel.Advanced]: "rgb(234 179 8)",
    [LanguageKnowledgeLevel.Native]: "rgb(21 128 61)",
}

export const LANGUAGE_LEVEL_COLOR_LIGHTEN: Record<number, string> = {
    [LanguageKnowledgeLevel.Advanced]: 'rgb(253 230 138)',
    [LanguageKnowledgeLevel.Native]: 'rgb(187 247 208)'
}

export type LanguageKnowledge = {
    id: string;
    lang: string;
    level: LanguageKnowledgeLevel;
}