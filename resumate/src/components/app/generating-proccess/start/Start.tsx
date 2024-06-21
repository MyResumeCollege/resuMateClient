import { useNavigate } from "react-router-dom";
import styles from "./Start.module.css";
import AddFileIcon from "@/assets/icons/add_file.svg";
import QuestionsIcon from "@/assets/icons/questions.svg";
import { useRef } from "react";
import toast from "react-hot-toast";

export const Start = () => {
  const navigate = useNavigate();
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

  const handleUpdatePdfChange = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="flex-1 flex items-center pt-[200px] flex-col">
      <h1 className="font-bold text-3xl text-center height-fit mb-[6px]">
        Let's start building your CV
      </h1>
      <h3 className="font-light text-xl mb-[50px]">
        how you would like to start?
      </h3>
      <section className={`${styles.startOptions} flex gap-[30px]`}>
        <div onClick={continueToBackground}>
          <img src={QuestionsIcon} alt="Your SVG" />
          <h2 className="font-medium text-lg">Start from scratch</h2>
          <span className="font-light text-sm opacity-80">
            by a few questions
          </span>
        </div>
        <div onClick={handleUpdatePdfChange}>
          <img src={AddFileIcon} alt="Your SVG" />
          <h2 className="font-medium text-lg">Import existing CV</h2>
          <span className="font-light text-sm opacity-80">
            upload CV in PDF format
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
    </main>
  );
};
