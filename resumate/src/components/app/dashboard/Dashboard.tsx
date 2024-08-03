import { Button } from "@/components/shared/button/Button";
import { getUserResumePreviews } from "@/services/cvPreview";
import { userIdSelector } from "@/store/atoms/userAtom";
import { ResumeOverview } from "@/types/resume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Preview from "../generating-proccess/view-cv/Preview";
import { ResumeOverviewItem } from "./resume-overview-item/ResumeOverview";
import Flying from '@/assets/icons/flying.svg';

export const Dashboard = () => {
    const navigate = useNavigate();
    const userId = useRecoilValue(userIdSelector);

    const [isLoadingResumes, setLoadingResumes] = useState(true);
    const [selectedResumeId, setSelectedResumeId] = useState<number>();
    const [resumes, setResumes] = useState<ResumeOverview[]>([]);

    const onResumeSelect = (resumeIndex: number) => {
        setSelectedResumeId(resumeIndex);
    }

    const goToCreateResume = () => {
        navigate('/build-cv');
    }

    const goToEditResume = () => {
        navigate(`/preview/${selectedResumeId}`);
    }

    const emptyStateRenderer = () => {
        return <div className="flex-1 flex flex-col items-center pt-[200px]">
            <span className="font-semibold">Select a resume to preview it</span>
        </div>
    }

    const getResumes = async () => {
        setLoadingResumes(true);

        try {
            const response = await getUserResumePreviews(userId);
            setResumes(response.data);
        } catch (err) {
            toast.error("An error occured while fetching resumes")
        }
        finally {
            setLoadingResumes(false);
        }
    }

    useEffect(() => {
        getResumes();
    }, [])

    return <main className="flex-1 flex">
        {!isLoadingResumes && resumes.length > 0 ?
            <>
                {/* Resume Select */}
                <div className="bg-white px-6 py-5 rounded-lg border border-gray-300 w-fit">
                    <div className="flex mb-4 justify-between items-center">
                        <h2 className="text-lg font-semibold">Your Resumes</h2>
                        <Button variant='light' onClick={goToCreateResume} dense buttonClassName="!w-fit !text-primary">Create</Button>
                    </div>
                    <div className="flex flex-col gap-2 w-[300px]">
                        {resumes.map((resume, index) => (
                            <ResumeOverviewItem key={index} current={index + 1 === selectedResumeId} resume={resume} onSelect={() => onResumeSelect(index + 1)} />
                        ))}
                    </div>
                </div>
                {/* Resume Preview */}
                <div className="flex-1 flex">
                    {selectedResumeId ?
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
                        : emptyStateRenderer()
                    }
                </div>
            </> :
            <div className="flex-1 flex items-center flex-col justify-center gap-5">
                <img src={Flying} className="h-[250px]" />
                <span className="text-lg">Your'e one step away from your <span className="font-bold underlineded">Dream Job</span></span>
                <Button buttonClassName="!w-[300px]" onClick={goToCreateResume}>Let's start building your resume</Button>
            </div>
        }
    </main>
}