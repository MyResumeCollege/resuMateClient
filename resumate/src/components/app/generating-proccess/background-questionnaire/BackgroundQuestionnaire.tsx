import { useState } from "react";

import { Button } from "@/components/shared/button/Button";
import { useNavigate } from "react-router-dom";
import { Stepper } from "./stepper/Stepper";
import { Personal } from "./steps/personal/Personal";
import { WantedJob } from "./steps/wanted-job/WantedJob";
import { Skills } from "./steps/skills/Skills";
import { Experience } from "./steps/experience/Experience";
import { showCVPreview } from "../../../../services/cvPreview";
import { useRecoilValue } from "recoil";
import { fullNameState, jobTitleState } from "../store/state";

export const BackgroundQuestionnaire = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const fullName = useRecoilValue(fullNameState);
  const jobTitle = useRecoilValue(jobTitleState);

  const steps = [<WantedJob />, <Personal />, <Experience />, <Skills />];

  const generateCV = () => {
    navigate("/build-cv/generate");
  };

  const next = () => {
    // finished last step
    if (currentStep + 1 === steps.length) {
      generateCV();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const back = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const previewPdf = async () => {
    try {
      await showCVPreview(fullName, jobTitle);
      setPdfUrl(
        `http://localhost:5173/preview?fullName=${fullName}&jobTitle=${jobTitle}`
      );
    } catch (error) {
      console.error("Error fetching PDF preview:", error);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center pt-[50px]">
      <Stepper stepsCount={steps.length} currentStep={currentStep} />
      <section className="current-step flex-1 flex w-[600px] overflow-hidden">
        {steps[currentStep]}
      </section>
      <section className="controls flex gap-[20px] pb-[50px] pt-[50px]">
        {currentStep !== 0 && (
          <Button text="Back" variant="secondary" onClick={back} />
        )}
        <Button text="Continue" onClick={next} />
        <Button text="preview" onClick={previewPdf} />
      </section>
      {pdfUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[80%] h-[80%]">
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
            />
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setPdfUrl(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};