import AiLoadingAnimation from "@/assets/lotties/ai-loading.json";
import apiClient from "@/services/httpCommon";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { uploadResume } from "../../../../services/uploadResume";
import {
  educationState,
  fullNameState,
  jobTitleState,
  summaryState,
} from "../store/state";

export const Generate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { existCV } = location.state || {};

  const fullName = useRecoilValue(fullNameState);
  const bio = useRecoilValue(summaryState);
  const education = useRecoilValue(educationState);
  const jobTitle = useRecoilValue(jobTitleState);

  const generateCV = async () => {
    let resumeText = "";

    if (existCV) {
      try {
        if (existCV instanceof File) {
          const improvedResume = await uploadResume(existCV);
          resumeText = improvedResume.data.CVTextContent;
        }
      } catch (error) {
        toast.error("Failed to upload the file. Please try again.");
      }
    } else {
      const res = await apiClient.post("/cv/generate-resume", {
        name: fullName,
        job: jobTitle,
        education: education,
        description: bio,
        goals: "",
      });
      resumeText = res.data.CVTextContent;
    }
    if (resumeText) {
      navigate("/build-cv/view", { state: { resumeText } });
    }
  };

  useEffect(() => {
    generateCV();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <Lottie
        isClickToPauseDisabled
        options={{ animationData: AiLoadingAnimation, loop: true }}
        style={{
          height: 200,
          width: 200,
          filter: "drop-shadow(4px 4px 8px #bababa)",
          marginBottom: 20,
        }}
      />
      <h2 className="font-semibold text-xl mb-[3px]">
        Our AI engine is generating your CV
      </h2>
      <span className="opacity-60">
        did you know? 80% don't put images on their CVs
      </span>
    </main>
  );
};
