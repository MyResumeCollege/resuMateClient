import { useRecoilState } from "recoil";
import { educationState } from "../../../store/state";
import { useState } from "react";
import { EducationPeriod } from "@/types/education-period";
import { uniqueId } from "lodash";
import { useClickOutside } from "@/hooks/useClickOutside";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { Button } from "@/components/shared/button/Button";
import { TextArea } from "@/components/shared/inputs/textarea/TextArea";

export const Education = () => {
    const [educationPeriods, seteducationPeriods] = useRecoilState(educationState);

    const [editedEducationPeriod, seteditedEducationPeriod] = useState<EducationPeriod>();
    const [error, setError] = useState<string>();

    const isEditededucationNew = !educationPeriods.find(period => period.id === editedEducationPeriod?.id);

    const removePeriod = (education: EducationPeriod) => {
        const newPeriods = educationPeriods.filter(currenteducation => currenteducation.id !== education.id);
        seteducationPeriods(newPeriods);
    }

    const addPeriod = (period: EducationPeriod) => {
        const newPeriods = [...educationPeriods, period];
        seteducationPeriods(newPeriods);
    }

    const openAddNewPeriod = () => {
        seteditedEducationPeriod({
            id: uniqueId('periodid'),
            degree: '',
            school: '',
            description: '',
            endDate: { year: '', month: '' },
            startDate: { year: '', month: '' },
            isCurrent: false
        })
    }

    const updateEditedPeriod = (educationPart: Partial<EducationPeriod>) => {
        if (editedEducationPeriod) {
            seteditedEducationPeriod({ ...editedEducationPeriod, ...educationPart })
        }
    }

    const closeAddNewPeriod = () => { seteditedEducationPeriod(undefined); setError(undefined) };

    const ref = useClickOutside(closeAddNewPeriod);

    const handleDoneEditPeriod = () => {
        if (editedEducationPeriod) {
            const clonedPeriods = [...educationPeriods];

            const periodIndex = clonedPeriods.findIndex(eduPeriod => eduPeriod.id === editedEducationPeriod.id);
            // updating existing period
            if (periodIndex !== -1) {
                clonedPeriods[periodIndex] = { ...editedEducationPeriod };
                seteducationPeriods(clonedPeriods);
            } else {
                // creating new period
                addPeriod(editedEducationPeriod);
            }

            seteditedEducationPeriod(undefined);
            setError(undefined);

        }
    }

    const renderEditPeriod = () => {
        return editedEducationPeriod &&
            <div ref={ref} className="flex flex-col gap-[10px]">
                <div ref={ref} className="flex flex-col items-stretch py-2 px-4 bg-[#dbdbdb] rounded-md gap-[10px]">
                    <div className="flex gap-[10px]">
                        <TextInput
                            autoFocus
                            label="Degree"
                            wrapperClassName="flex-1"
                            inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                            value={editedEducationPeriod.degree}
                            onChange={(newDegreeName) => updateEditedPeriod(({ degree: newDegreeName }))}
                        />
                        <TextInput
                            autoFocus
                            label="Institution"
                            wrapperClassName="flex-1"
                            inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                            value={editedEducationPeriod.school}
                            onChange={(newSchool) => updateEditedPeriod(({ school: newSchool }))}
                        />
                    </div>
                    <div className="flex gap-[10px]">
                        <TextInput
                            autoFocus
                            label="Start Date"
                            wrapperClassName="flex-1"
                            inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                            value={editedEducationPeriod.startDate.year}
                            onChange={(newStartDate) => updateEditedPeriod(({ startDate: { month: 'Jan', year: newStartDate } }))}
                        />
                        <TextInput
                            autoFocus
                            label="End Date"
                            disabled={editedEducationPeriod.isCurrent}
                            wrapperClassName="flex-1"
                            inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                            value={editedEducationPeriod.endDate.year}
                            onChange={(newEndDate) => updateEditedPeriod(({ endDate: { month: 'Apr', year: newEndDate } }))}
                        />
                    </div>
                    <div className="flex items-center gap-[10px]"
                    >
                        <input type="checkbox"
                            checked={editedEducationPeriod.isCurrent}
                            onChange={(e) => updateEditedPeriod(({ isCurrent: e.target.checked }))}
                        />
                        <span className="text-sm"
                            onClick={() => updateEditedPeriod(({ isCurrent: editedEducationPeriod.isCurrent }))}
                        >I currently study here</span>
                    </div>
                    <div className="flex gap-[10px]">
                        <TextArea
                            wrapperClassName="flex-1"
                            inputClassName="bg-[#c8c8c8]"
                            label="Description"
                            value={editedEducationPeriod.description}
                            rows={5}
                            onChange={(newDescription) => updateEditedPeriod(({ description: newDescription }))}
                        />
                    </div>
                    <Button onClick={handleDoneEditPeriod} buttonClassName='mt-auto'>Done</Button>
                </div>
                {error && <div className="text-sm text-[red] text-center">{error}</div>}
            </div>
    }

    const periodRenderer = (eduPeriod: EducationPeriod) => {
        return editedEducationPeriod?.id === eduPeriod.id ?
            renderEditPeriod() :
            <div key={eduPeriod.id} className="group flex items-center py-2 px-4 bg-[#dbdbdb] hover:bg-[#cacaca] transition-all rounded-md">
                <span className="font-bold text-md mr-[7px]">{eduPeriod.degree}</span>
                <span className="text-sm opacity-60">| {eduPeriod.school} </span>
                <span className="text-sm opacity-60 ml-[5px]">({eduPeriod.startDate.month} {eduPeriod.startDate.year} {!eduPeriod?.isCurrent && <> - {eduPeriod.startDate.month} {eduPeriod.endDate.year}</>})</span>
                <div className="flex items-center gap-1 ml-auto opacity-0  group-hover:opacity-100 transition-all">
                    <svg onClick={() => seteditedEducationPeriod(eduPeriod)} className="size-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <svg onClick={() => removePeriod(eduPeriod)} className="size-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>
    }

    return (
        <section className="personal flex-1 flex flex-col pt-[70px] items-stretch">
            <h2 className="font-bold text-3xl text-center mb-5">
                Let's Talk About<br />
                Your Education
            </h2>
            <main className="flex-1 px-10 flex flex-col gap-2 overflow-y-scroll">
                {educationPeriods.map(periodRenderer)}
                {isEditededucationNew && renderEditPeriod()}
                <Button onClick={openAddNewPeriod} disabled={!!editedEducationPeriod}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add New education Period
                </Button>
            </main>
        </section>
    );
};