import Flying from "@/assets/icons/flying.svg";
import { Button } from "@/components/shared/button/Button";
import { getUserResume, getUserResumePreviews } from "@/services/cvService";
import { isUserPremiumSelector, userIdSelector } from "@/store/atoms/userAtom";
import { ResumeOverview } from "@/types/resume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { removeCV } from "../../../services/cvService";
import Preview from "../generating-proccess/view-cv/Preview";
import { ResumeOverviewItem } from "./resume-overview-item/ResumeOverview";
import CrownImage from "@/assets/images/crown.png";

export const Dashboard = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdSelector);

  const [isLoadingResumes, setLoadingResumes] = useState(true);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState<number>();
  const [selectedResumeId, setSelectedResumeId] = useState<string>();
  const [resumes, setResumes] = useState<ResumeOverview[]>([]);
  const isPremiumUser = useRecoilValue(isUserPremiumSelector);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const onResumeSelect = async (resumeIndex: number, resumeId: string) => {
    try {
      setSelectedResumeIndex(resumeIndex);

      const response = await getUserResume(userId, resumeId);
      if (response.data) setSelectedResumeId(response.data);
    } catch (err) {
      toast.error("An error occurred while fetching resume Data");
    }
  };

  const goToCreateResume = () => {
    if (!isPremiumUser && resumes.length >= 3) {
      setPopupVisible(true);
    } else {
      navigate("/build-cv");
    }
  };

  const goToEditResume = () => {
    navigate(`/preview/${selectedResumeId}`);
  };

  const goToPricing = () => {
    navigate("/pricing");
  };

  const closePopup = () => {
    setPopupVisible(false);
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
      toast.error("An error occurred while fetching resumes");
    } finally {
      setLoadingResumes(false);
    }
  };

  useEffect(() => {
    getResumes();
  }, []);

  return (
    <main className="flex-1 flex">
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] md:w-[600px] lg:w-[700px] relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="flex flex-col items-center mb-6">
              <img src={CrownImage} className="w-16 h-16 mb-4" alt="Premium" />
              <h3 className="text-2xl font-bold text-center">
                Upgrade to Premium
              </h3>
            </div>
            <p className="text-center opacity-60 mb-8">
              You've reached your maximum number of free resumes.
              <br />
              To continue, please get our premium plan for $3.5 per month!
            </p>

            <div className="flex justify-center">
              <Button onClick={goToPricing} buttonClassName="!w-fit !mr-4">
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      )}

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
            <div className="flex flex-col gap-2 w-[300px] h-[700px] overflow-y-auto">
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
          {isLoadingResumes ? (
            <>
              <span
                className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-primary rounded-full"
                role="status"
                aria-label="loading"
              />
              <span className="font-bold">Loading your resumes...</span>
            </>
          ) : (
            <>
              <img src={Flying} className="h-[250px]" />
              <span className="text-lg">
                Your'e one step away from your{" "}
                <span className="font-bold underlineded">Dream Job</span>
              </span>
              <Button buttonClassName="!w-[300px]" onClick={goToCreateResume}>
                Let's start building your resume
              </Button>
            </>
          )}
        </div>
      )}
    </main>
  );
};
