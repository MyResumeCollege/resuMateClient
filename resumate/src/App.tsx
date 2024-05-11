import { useState } from "react";
import "./App.css";
import { generateResume } from "./services/openAIService";

function App() {
  const [name, setName] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [resume, setResume] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedResume = await generateResume(
        name,
        job,
        experience,
        description
      );
      setResume(generatedResume);
      setTimeout(() => {
        console.log(resume);
      }, 2000);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: "1rem",
      }}
    >
      <label />
      What is your name?
      <input
        type="text"
        style={{
          backgroundColor: "white",
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label />
      What job are you looking for?
      <input
        type="text"
        style={{
          backgroundColor: "white",
        }}
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
      <label />
      What is your experience?
      <textarea
        style={{
          height: "5rem",
          backgroundColor: "white",
        }}
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <label />
      Describe yourself in a few words.
      <textarea
        style={{
          height: "10rem",
          width: "20rem",
          backgroundColor: "white",
        }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Generate Resume</button>
    </form>
  );
}

export default App;
