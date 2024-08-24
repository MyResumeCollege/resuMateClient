import Flying from "@/assets/icons/flying.svg";
import { Button } from "@/components/shared/button/Button";
import {
  getUserResume,
  getUserResumePreviews
} from "@/services/cvService";
import { isUserPremiumSelector, userIdSelector } from "@/store/atoms/userAtom";
import { ResumeOverview } from "@/types/resume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { removeCV } from "../../../services/cvService";
import Preview from "../generating-proccess/view-cv/Preview";
import { ResumeOverviewItem } from "./resume-overview-item/ResumeOverview";

export const Dashboard = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdSelector);

  const [isLoadingResumes, setLoadingResumes] = useState(true);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState<number>();
  const [selectedResumeId, setSelectedResumeId] = useState<string>();
  const [resumes, setResumes] = useState<ResumeOverview[]>([]);
  const isPremiumUser = useRecoilValue(isUserPremiumSelector);

  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);

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
    } finally {
      setIsDeleting(false);
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

  const getCountResumes = () => {
    if (resumes.length >= 3) return true
    else return false
  }

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
                disabled={isPremiumUser ? false : getCountResumes()}
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
              <div className="flex-1 px-10 flex flex-col h-full">
                <div className="flex mb-3 gap-2">
                  <Button
                    dense
                    variant="primary"
                    buttonClassName="!w-fit"
                    onClick={goToEditResume}
                  >
                    Preview & Edit
                  </Button>
                  <Button
                    loading={isDeleting}
                    dense
                    variant="outlined-danger"
                    buttonClassName="!w-fit"
                    onClick={deleteResume}
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
          {isLoadingResumes ?
            <>
              <span className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading"/>
              <span className="font-bold">
                Loading your resumes...
              </span>
            </> :
            <>
              <img src={Flying} className="h-[250px]" />
              <span className="text-lg">
                Your'e one step away from your{" "}
                <span className="font-bold underlineded">Dream Job</span>
              </span>
              <Button buttonClassName="!w-[300px]" onClick={goToCreateResume}>
                Let's start building your resume
              </Button>
            </>}
        </div>
      )}
    </main>
  );
};
