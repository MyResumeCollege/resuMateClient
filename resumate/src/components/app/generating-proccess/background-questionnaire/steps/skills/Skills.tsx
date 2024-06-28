import { Button } from "@/components/shared/button/Button";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SKILL_LEVEL_COLOR, SKILL_LEVEL_COLOR_LIGHTEN, SKILL_LEVEL_NAME, Skill } from "@/types/skill";
import { CSSProperties, useState } from "react";
import { useRecoilState } from "recoil";
import { skillsState } from "../../../store/state";

export const Skills = () => {
    const [skills, setSkills] = useRecoilState(skillsState);

    const [newSkill, setNewSkill] = useState<Skill>();
    const [error, setError] = useState<string>();

    const removeSkill = (skill: Skill) => {
        const newSkills = skills.filter(currentSkill => currentSkill.name !== skill.name);
        setSkills(newSkills);
    }

    const addSkill = (skill: Skill) => {
        const newSkills = [...skills, skill];
        setSkills(newSkills);
    }

    const openAddNewSkill = () => {
        setNewSkill({
            name: '',
            level: 4,
        })
    }

    const validateNewSkillName = (): boolean => {
        if (newSkill && newSkill?.name.trim().length > 0) {
            const isNameAlreadyExist = skills.find(skill => skill.name === newSkill.name);
            if (!isNameAlreadyExist) return true;
        }
        return false;
    }

    const closeAddNewSkill = () => { setNewSkill(undefined); setError(undefined) };

    const ref = useClickOutside(closeAddNewSkill);

    const handleDoneAddSkill = () => {
        if (newSkill && validateNewSkillName()) {
            addSkill(newSkill);
            setNewSkill(undefined);
            setError(undefined);
        } else {
            setError('Skill name should be one letter minimum, and not exists')
        }
    }

    const skillRenderer = (skill: Skill): React.ReactNode => {
        return <div key={skill.name} className="group flex items-center py-2 px-4 bg-[#dbdbdb] hover:bg-[#cacaca] transition-all rounded-md">
            <span className="font-bold text-md mr-[10px]">{skill.name}</span>
            <span className="text-sm px-2 py-1 rounded-md text-white bg-background"
                style={{ background: SKILL_LEVEL_COLOR[skill.level] }}
            >{SKILL_LEVEL_NAME[skill.level]}</span>
            <svg onClick={() => removeSkill(skill)} className="size-5 ml-auto opacity-0 group-hover:opacity-100 transition-all cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </div>
    }

    const renderNewSkillForm = () => {
        return newSkill &&
            <div ref={ref} className="flex flex-col gap-[10px]">
                <div ref={ref} className="flex items-stretch py-2 px-4 bg-[#dbdbdb] rounded-md gap-[10px]">
                    <TextInput
                        autoFocus
                        label="Skill Name"
                        placholder="Microsoft Excel.."
                        inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                        value={newSkill.name}
                        onChange={(newName) => setNewSkill(({ level: newSkill.level, name: newName }))}
                    />
                    <div className="flex flex-col flex-1 gap-[5px]">
                        <span className="text-sm">Level - <span style={{ color: SKILL_LEVEL_COLOR[newSkill.level] }}>{SKILL_LEVEL_NAME[newSkill.level]}</span></span>
                        <div className="flex-1 flex gap-[5px]">
                            {Object.keys(SKILL_LEVEL_NAME).map((level) =>
                                <div
                                    key={level}
                                    className="bg-white flex-1 rounded-md hover:bg-[var(--lighten-color)] cursor-pointer opacity-50"
                                    style={{
                                        "--lighten-color": SKILL_LEVEL_COLOR_LIGHTEN[+level],
                                        ...(newSkill.level === +level && { background: SKILL_LEVEL_COLOR[+level], opacity: 1 }),
                                    } as CSSProperties}
                                    onClick={() => setNewSkill({ ...newSkill, level: +level })}
                                />
                            )}
                        </div>
                    </div>
                    <Button onClick={handleDoneAddSkill} buttonClassName='!w-fit mt-auto'>Done</Button>
                </div>
                {error && <div className="text-sm text-[red] text-center">{error}</div>}
            </div>

    }

    return (
        <section className="personal flex-1 flex flex-col pt-[70px] items-stretch">
            <h2 className="font-bold text-3xl text-center mb-5">
                Let's Talk About<br />
                Your Skills
            </h2>
            <main className="flex-1 px-10 flex flex-col gap-2 overflow-y-scroll">
                {skills.map(skillRenderer)}
                {renderNewSkillForm()}
                <Button onClick={openAddNewSkill} disabled={!!newSkill}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add New Skill
                </Button>
            </main>
        </section>
    );
};
