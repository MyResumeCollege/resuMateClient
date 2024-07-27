import { ResumeSections } from "@/types/resume"
import classNames from "classnames";

type ResumeOverviewProps = {
    resume: ResumeSections;
    current: boolean;
    onSelect: () => void;
}

export const ResumeOverview = ({ resume, current, onSelect }: ResumeOverviewProps) => {

    return <div
        className={classNames(`bg-white p-5 border-[1px] rounded-md shadow-md w-[300px] cursor-pointer`,
            { '!bg-primary text-white': current },
        )}
        onClick={onSelect}
    >
        <div className="flex flex-col">
            <h3 className="font-bold text-md">{resume.jobTitle}</h3>
            <h5 className="text-sm opacity-60">Generated at 27/07/2024</h5>
        </div>
    </div>

}