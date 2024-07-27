import { Button } from "@/components/shared/button/Button";
import { ResumeSections } from "@/types/resume";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Preview from "../generating-proccess/view-cv/Preview";
import { ResumeOverview } from "./resume-overview/ResumeOverview";

export const Dashboard = () => {
    const navigate = useNavigate();

    const [selectedResumeId, setSelectedResumeId] = useState<number>();

    const resumes: (ResumeSections)[] = [{
        jobTitle: "Frontend Developer",
        fullName: "Amit Brickman",
        bio: "",
        educations: "",
        experiences: "",
        languages: "",
        skills: ""
    },
    {
        jobTitle: "Frontend Developer",
        fullName: "Amit Brickman",
        bio: "",
        educations: "",
        experiences: "",
        languages: "",
        skills: ""
    },
    {
        jobTitle: "Frontend Developer",
        fullName: "Amit Brickman",
        bio: "",
        educations: "",
        experiences: "",
        languages: "",
        skills: ""
    }];

    const onResumeSelect = (resumeIndex: number) => {
        setSelectedResumeId(resumeIndex);
    }

    const goToCreateResume = () => {
        navigate('/build-cv');
    }

    const goToEditResume = () => {
        navigate(`/preview/${selectedResumeId}`);
    }

    const renderCreateNewResume = () => {
        return <div className="bg-accent p-5 border-[1px] rounded-md w-[300px]">
            <h2 className="font-bold text-md">Create New Resume</h2>
            <h5 className="opacity-60">and get you dream job</h5>
        </div>
    }

    return <main className="flex-1 flex">
        {/* Resume Select */}
        <div className="bg-white p-10 rounded-lg border border-gray-300 w-fit">
            <div className="flex mb-4 justify-between items-end">
                <h2 className="text-xl font-bold">Your Resumes</h2>
                <Button onClick={goToCreateResume} dense buttonClassName="!w-fit">Create</Button>
            </div>
            <div className="flex flex-col gap-2">
                {/* {renderCreateNewResume()} */}
                {resumes.map((resume, index) => (
                    <ResumeOverview key={index} current={index + 1 === selectedResumeId} resume={resume} onSelect={() => onResumeSelect(index + 1)} />
                ))}
            </div>
        </div>
        {/* Resume Preview */}
        <div className="flex-1 flex">
            {selectedResumeId &&
                <div className="flex-1 px-10 flex flex-col">
                    <div className="flex justify-end mb-3 gap-2">
                        <Button dense variant='secondary' buttonClassName="!w-fit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                            </svg>
                            Download
                        </Button>
                        <Button dense variant='primary' buttonClassName="!w-fit" onClick={goToEditResume}>Edit</Button>
                    </div>
                    <Preview id={'89d7495a-f86a-44c4-91e3-5f522b3e037f"'} readonly />
                </div>
            }
        </div>
    </main>
}