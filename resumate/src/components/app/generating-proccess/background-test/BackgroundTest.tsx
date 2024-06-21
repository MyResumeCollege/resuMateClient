import { useState } from "react";
import { GenerateResumeInput } from "@/types/resume";
import { generateResume } from "@/services/openAIService";
import { IntroForm } from "./intro-form/IntroForm";
import Lottie from "react-lottie";
import DocumentAnimation from '@/assets/animations/document.json';
import './BackgroundTest.css';

export const BackgroundTest = () => {
    const [resume, setResume] = useState<string>();
    const [isGenerating, setIsGenerating] = useState(false);
  
    const generatingResume = async ({ name,
      job,
      education,
      experience,
      description }: GenerateResumeInput) => {
      try {
        setIsGenerating(true);
        const generatedResume = await generateResume(
          name,
          job,
          education,
          experience,
          description
        );
        setResume(generatedResume);
        setTimeout(() => {
          console.log(resume);
        }, 2000);
      } catch (error) {
        console.error("Error generating resume:", error);
      } finally {
        setIsGenerating(false);
      }
    };
  
    return (
      <main className="background-test flex-1">
        <IntroForm onSubmit={generatingResume} />
        <div className="flex flex-col items-center justify-center px-[30px]">
          {isGenerating && <div className="flex flex-col items-center">
            <Lottie
              options={{ animationData: DocumentAnimation, loop: true }}
              style={{ height: 200, width: 200, filter: "drop-shadow(4px 4px 8px #bababa)" }}
            />
            <span style={{ color: "#707070" }}>Generating your resume...</span>
          </div>}
          {resume && !isGenerating &&
            <span style={{ fontSize: 12, whiteSpace: 'break-spaces' }}>
              {resume}
            </span>
          }
          {!resume && !isGenerating &&
            <span>Your resume will be here</span>
          }
        </div>
      </main>
    );
  }
  