import { OpenAI } from "openai";

export const generateResume = async (
  name: string,
  job: string,
  education: string,
  description: string,
  goals: string
): Promise<string> => {
  const maxCharacterLimit = 1000;
  try {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // remove after moving to https
    });

    const resumeContent = `\n${name}${job}\n${education}\n${description}\n${goals}`;

    const request: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming =
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
            Generate a resume based solely on the provided information. Do not include sections or headers for which no information is provided. Format the resume as follows:

            [Name], [Job Title/Desired Position]
            
            About me:
            Compose a concise summary highlighting the individual's professional background, skills, and accomplishments.
            
            Work Experience:
            Detail the individual's work history, including job titles, companies, dates of employment, and responsibilities.
            
            Education:
            Provide information on the individual's educational background, including degrees earned, institutions attended, and graduation dates.
            
            Skills:
            List the individual's key skills and competencies relevant to the desired position.
            
            Achievements:
            Highlight any notable achievements or recognitions earned during the individual's career.
            
            Career Goals/Objectives:
            Describe the individual's career goals and objectives, outlining aspirations for future professional development.
                        
            Remember to skip any sections entirely if no information is provided. Do not include headers or placeholders like "No information provided." Only include the sections with provided information.

            For example:
            John Doe, Software Developer

            About me:
            A dedicated and skilled software developer with experience in various domains. Possesses expertise in backend development, frontend development, and game development. Proficient in languages such as Scala, JavaScript, and C#. Known for adaptability, problem-solving skills, and a passion for learning new technologies.

            Work Experience:

            Software Developer, Company X

            Responsibilities: Developed backend services using Scala, implemented test-driven development practices, and contributed to the design of scalable and efficient software solutions.
            Frontend Developer, Company Y (dont mention if not exist)

            Responsibilities: Designed and implemented user interfaces using React, collaborated with backend teams to integrate frontend with backend services, and optimized frontend performance for improved user experience.
            Game Developer, Studio Z

            Responsibilities: Created 3D and 2D games using Unity, implemented game mechanics, optimized game performance, and collaborated with artists and designers to deliver engaging gaming experiences.
            Skills:

            Backend Development: Scala, TDD, serverless architecture
            Frontend Development: React, JavaScript
            Game Development: Unity 3D, Unity 2D
            Programming Languages: JavaScript, Scala, C#
            Problem-solving
            Adaptability
            Career Goals/Objectives:
            Committed to continuous learning and growth in the field of software development. Aspires to contribute to innovative projects and advance professionally in the industry.
            `,
          },
          {
            role: "assistant",
            content: resumeContent,
          },
        ],
        temperature: 1,
        max_tokens: maxCharacterLimit,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

    const response = await openai.chat.completions.create(request);
    const resume = response.choices[0]?.message?.content || "";

    return resume;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error;
  }
};
