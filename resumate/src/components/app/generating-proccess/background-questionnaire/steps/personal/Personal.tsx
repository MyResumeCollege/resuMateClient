import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { TextArea } from "@/components/shared/inputs/textarea/TextArea";
import { useRecoilState } from "recoil";
import { fullNameState, summaryState } from "../../../store/state";
import { LinkedinIntegration } from "./linkedin-integration/LinkedinIntegration";

export const Personal = () => {
  const [fullName, setFullName] = useRecoilState(fullNameState);
  const [bio, setBio] = useRecoilState(summaryState);

  return (
    <section className="personal flex-1 flex flex-col pt-[70px] items-center">
      <h2 className="font-bold text-3xl text-center mb-5">
        Tell Us More <br />
        About You
      </h2>
      <main className="flex-1 px-10 flex flex-col gap-[15px] overflow-y-scroll">
        <LinkedinIntegration />
        <TextInput
          wrapperClassName="w-[400px]"
          label="Full Name"
          value={fullName}
          onChange={setFullName}
        />
        <TextArea
          wrapperClassName="w-[400px]"
          label="Describe yourself in a few words"
          value={bio}
          rows={5}
          onChange={setBio}
        />
      </main>
    </section>
  );
};
