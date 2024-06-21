import Lottie from "react-lottie";
import AiLoadingAnimation from "@/assets/lotties/ai-loading.json";
import { useRecoilValue } from "recoil";
import {
  bioState,
  educationState,
  fullNameState,
  jobTitleState,
} from "../store/state";
import { useEffect } from "react";
import { uploadResume } from "../../../../services/uploadResume";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const Generate = () => {
  const location = useLocation();
  const { existCV } = location.state || {};

  const fullName = useRecoilValue(fullNameState);
  const bio = useRecoilValue(bioState);
  const education = useRecoilValue(educationState);
  const jobTitle = useRecoilValue(jobTitleState);

  const generateCV = async () => {
    if (fullName == "" && bio == "" && education == "" && jobTitle == "") {
      try {
        if (existCV instanceof File) {
          const improvedResume = await uploadResume(existCV);

          // TODO - convert text to pdf and download pdf
          console.log(improvedResume.data);
        }
      } catch (error) {
        toast.error("Failed to upload the file. Please try again.");
      }
    } else {
        // TODO: API call to generate, using the states above - if/else
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
