export const SKILL_LEVEL_NAME: Record<number, string> = {
    1: 'Novice',
    2: 'Beginner',
    3: 'Skillful',
    4: 'Experienced',
    5: 'Expert'
}

export const SKILL_LEVEL_COLOR: Record<number, string> = {
    1: 'rgb(239 68 68)',
    2: 'rgb(249 115 22)',
    3: 'rgb(234 179 8)',
    4: 'rgb(101 163 13)',
    5: 'rgb(21 128 61)'
}

export const SKILL_LEVEL_COLOR_LIGHTEN: Record<number, string> = {
    1: 'rgb(254 202 202)',
    2: 'rgb(254 215 170)',
    3: 'rgb(253 230 138)',
    4: 'rgb(217 249 157)',
    5: 'rgb(187 247 208)'
}

export type Skill = {
    name: string;
    level: number;
}