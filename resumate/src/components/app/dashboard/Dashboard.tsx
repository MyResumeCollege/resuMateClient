import { Button } from "@/components/shared/button/Button";
import {
  getUserResume,
  getUserResumePreviews,
  downloadPDF,
} from "@/services/cvService";
import { userIdSelector } from "@/store/atoms/userAtom";
import { ResumeOverview } from "@/types/resume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Preview from "../generating-proccess/view-cv/Preview";
import { ResumeOverviewItem } from "./resume-overview-item/ResumeOverview";
import Flying from "@/assets/icons/flying.svg";
import { fullNameState } from "../generating-proccess/store/state";
import { removeCV } from "../../../services/cvService";

export const Dashboard = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdSelector);

  const [isLoadingResumes, setLoadingResumes] = useState(true);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState<number>();
  const [selectedResumeId, setSelectedResumeId] = useState<string>();
  const [resumes, setResumes] = useState<ResumeOverview[]>([]);

  const fullName = useRecoilValue(fullNameState);
  const fileName = fullName
    ? `${fullName.replace(/ /g, "_")}-Resume.pdf`
    : "Resume.pdf";

  const onResumeSelect = async (resumeIndex: number, resumeId: string) => {
    try {
      setSelectedResumeIndex(resumeIndex);
      
      const response = await getUserResume(userId, resumeId);
      if (response.data) setSelectedResumeId(response.data);
    } catch (err) {
      toast.error("An error occured while fetching resume Data");
    }
  };

  const goToCreateResume = () => {
    navigate("/build-cv");
  };

  const goToEditResume = () => {
    navigate(`/preview/${selectedResumeId}`);
  };

  const deleteResume = async () => {
    try {
      if (selectedResumeId) {
        const deletedResume = await removeCV(userId, selectedResumeId);
        const updatedResumes = resumes.filter(
          (resume) => resume.id !== deletedResume.data.resumeId
        );

        setResumes(updatedResumes);        
        setSelectedResumeIndex(undefined);
        setSelectedResumeId(undefined);

        toast.success("Resume deleted successfully.");
      } else toast.error("Failed to delete resume.");
    } catch (err) {
      toast.error("Failed to delete resume.");
    }
  };

  const emptyStateRenderer = () => {
    return (
      <div className="flex-1 flex flex-col items-center pt-[200px]">
        <span className="font-semibold">Select a resume to preview it</span>
      </div>
    );
  };

  const getResumes = async () => {
    setLoadingResumes(true);

    try {
      const response = await getUserResumePreviews(userId);
      setResumes(response.data);
    } catch (err) {
      toast.error("An error occured while fetching resumes");
    } finally {
      setLoadingResumes(false);
    }
  };

  useEffect(() => {
    getResumes();
  }, []);

  return (
    <main className="flex-1 flex">
      {!isLoadingResumes && resumes.length > 0 ? (
        <>
          {/* Resume Select */}
          <div className="bg-white px-6 py-5 rounded-lg border border-gray-300 w-fit">
            <div className="flex mb-4 justify-between items-center">
              <h2 className="text-lg font-semibold">Your Resumes</h2>
              <Button
                variant="light"
                onClick={goToCreateResume}
                dense
                buttonClassName="!w-fit !text-primary"
              >
                Create
              </Button>
            </div>
            <div className="flex flex-col gap-2 w-[300px]">
              {resumes.map((resume, index) => (
                <ResumeOverviewItem
                  key={index}
                  current={index + 1 === selectedResumeIndex}
                  resume={resume}
                  onSelect={() => onResumeSelect(index + 1, resume.id)}
                />
              ))}
            </div>
          </div>
          {/* Resume Preview */}
          <div className="flex-1 flex">
            {selectedResumeIndex ? (
              <div className="flex-1 px-10 flex flex-col">
                <div className="flex justify-end mb-3 gap-2">
                  <Button
                    dense
                    variant="secondary"
                    buttonClassName="!w-fit"
                    onClick={() =>
                      downloadPDF(
                        `${
                          import.meta.env.VITE_API_BASE_URL
                        }/preview/${selectedResumeId}/clear`,
                        fileName
                      )
                    }
                  >
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
                  <Button
                    dense
                    variant="primary"
                    buttonClassName="!w-fit"
                    onClick={goToEditResume}
                  >
                    Edit
                  </Button>
                  <Button
                    dense
                    variant="primary"
                    buttonClassName="!w-fit"
                    onClick={deleteResume}
                    style={{ backgroundColor: 'red'}}
                  >
                    Delete
                  </Button>
                </div>
                <Preview id={selectedResumeId} readonly />
              </div>
            ) : (
              emptyStateRenderer()
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center flex-col justify-center gap-5">
          <img src={Flying} className="h-[250px]" />
          <span className="text-lg">
            Your'e one step away from your{" "}
            <span className="font-bold underlineded">Dream Job</span>
          </span>
          <Button buttonClassName="!w-[300px]" onClick={goToCreateResume}>
            Let's start building your resume
          </Button>
        </div>
      )}
    </main>
  );
};
