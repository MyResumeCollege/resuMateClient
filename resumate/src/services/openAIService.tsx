import { OpenAI } from "openai";

export const generateResume = async (
  name: string,
  job: string,
  description: string,
  goals: string
): Promise<string> => {
  const maxCharacterLimit = 1000;
  try {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // remove after moving to https
    });

    const resumeContent = `\n${name}${job}\n${description}\n${goals}`;

    const request: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming =
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
            generate a resume based solely on the provided information without adding additional details:
            [Name]: [Insert name here]
            [Job Title/Desired Position]: [Specify desired job title or position]
            
            [Professional Summary]:
            [Compose a concise summary highlighting the individual's professional background, skills, and accomplishments]
            
            [Work Experience]:
            [Detail the individual's work history, including job titles, companies, dates of employment, and responsibilities]
            
            [Education]:
            [Provide information on the individual's educational background, including degrees earned, institutions attended, and graduation dates]
            
            [Skills]:
            [List the individual's key skills and competencies relevant to the desired position]
            
            [Achievements]:
            [Highlight any notable achievements or recognitions earned during the individual's career]
            
            [Career Goals/Objectives]:
            [Describe the individual's career goals and objectives, outlining aspirations for future professional development]
            
            [Additional Information]:
            [Include any other pertinent details, such as certifications, awards, or memberships in professional organizations]
            
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
