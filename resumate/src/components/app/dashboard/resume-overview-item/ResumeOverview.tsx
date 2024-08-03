import { ResumeOverview } from "@/types/resume";
import classNames from "classnames";

type ResumeOverviewItemProps = {
    resume: ResumeOverview;
    current: boolean;
    onSelect: () => void;
}

export const ResumeOverviewItem = ({ resume, current, onSelect }: ResumeOverviewItemProps) => {

    return <div
        className={classNames(`bg-white p-5 border-[1px] rounded-md shadow-md cursor-pointer`,
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