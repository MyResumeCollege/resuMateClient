import QuestionsIcon from "@/assets/icons/questions.svg";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./Start.module.css";
import { useResetRecoilState } from "recoil";
import {
  educationState,
  emailState,
  experienceState,
  fullNameState,
  jobTitleState,
  languagesState,
  phoneNumberState,
  skillsState,
  summaryState,
  templateState,
} from "../store/state";

export const Start = () => {
  
  const navigate = useNavigate();
  const resetName = useResetRecoilState(fullNameState);
  const resetJobTitle = useResetRecoilState(jobTitleState);
  const resetEmail = useResetRecoilState(emailState);
  const resetPhoneNumber = useResetRecoilState(phoneNumberState);
  const resetBio = useResetRecoilState(summaryState);
  const resetEducation = useResetRecoilState(educationState);
  const resetExperience = useResetRecoilState(experienceState);
  const resetLanguages = useResetRecoilState(languagesState);
  const resetTemplate = useResetRecoilState(templateState);
  const resetSkills = useResetRecoilState(skillsState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const continueToBackground = () => {
    navigate("background");
  };

  const continueToImportExisting = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const existCV = e.target.files?.[0];
    const maxSize = 25 * 1024 * 1024; // 25MB

    if (existCV?.size && existCV.size > maxSize) {
      toast.error("Selected image exceeds the maximum file size allowed.");
      return;
    }

    if (!existCV) {
      return;
    }

    navigate("generate", { state: { existCV } });
  };

  useEffect(() => {    
    return () => {
      resetName();
      resetEmail();
      resetPhoneNumber();
      resetBio();
      resetEducation();
      resetExperience();
      resetJobTitle();
      resetLanguages();
      resetSkills();
      resetTemplate();      
    };
  }, []);

  const openLink = (link: string) => {
    window?.open(link, '_blank');
  }

  return (
    <main className="flex-1 flex items-center pt-[100px] flex-col">
      <h1 className="font-bold text-3xl text-center height-fit">
        Let's Start Building Your Resume
      </h1>
      <section className={`${styles.startOptions} flex gap-[30px] mt-[30px] mb-[40px]`}>
        <div onClick={continueToBackground}>
          <img src={QuestionsIcon} alt="Your SVG" />
          <h2 className="font-medium text-lg">Start From Scratch</h2>
          <span className="font-light text-sm opacity-80">
            By a few questions
          </span>
        </div>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={continueToImportExisting}
        />
      </section>
      <h2 className="font-bold text-md text-center opacity-80">Building a resume it's not an easy job... <br /><span className="font-light text-sm text-black opacity-60">You might want to review these steps before</span></h2>
      <section className="flex flex-col gap-2 w-[470px] my-4">
        <div onClick={() => openLink(`https://www.indeed.com/career-advice/resumes-cover-letters/cv-buzzwords`)} className="cursor-pointer bg-white text-primary font-semibold py-2 px-3 rounded-lg flex justify-between items-center">
          <span className="text-sm">What Buzz Words You Must Use In Your Resume?</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <div onClick={() => openLink(`https://www.linkedin.com/signup/cold-join?source=guest_homepage-basic_nav-header-signin`)} className="cursor-pointer bg-white text-primary font-semibold py-2 px-3 rounded-lg flex justify-between items-center">
          <span className="text-sm">Create Your Linkedin Profile</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </div>
        <div onClick={() => openLink(`https://www.agbsearch.com/tips/top-10-tips-for-writing-job-winning-resume`)} className="cursor-pointer bg-white text-primary font-semibold py-2 px-3 rounded-lg flex justify-between items-center">
          <span className="text-sm">Tips For Creating a Job-Winning Resume</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
      </section>

    </main>
  );
};
