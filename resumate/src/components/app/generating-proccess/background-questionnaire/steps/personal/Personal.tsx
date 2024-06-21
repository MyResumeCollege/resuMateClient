import { useRecoilState } from "recoil";
import { bioState, educationState, fullNameState } from "../../../store/state";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { TextArea } from "@/components/shared/inputs/textarea/TextArea";

export const Personal = () => {
    const [fullName, setFullName] = useRecoilState(fullNameState);
    const [bio, setBio] = useRecoilState(bioState);
    const [education,setEducation] = useRecoilState(educationState);

    return <section className="personal flex-1 flex flex-col pt-[100px] items-center">
        <h2 className="font-bold text-3xl text-center mb-5">Tell Us More <br />About You</h2>
        <div className='mb-5'>
            <TextInput
                wrapperClassName='w-[400px]'
                label="Full Name"
                value={fullName}
                onChange={setFullName}
            />
        </div>
        <div className='mb-5'>
            <TextArea
                wrapperClassName='w-[400px]'
                label="Describe yourself in a few words"
                value={bio}
                rows={5}
                onChange={setBio}
            />
        </div>
        <div className='mb-5'>
            <TextArea
                wrapperClassName='w-[400px]'
                label="What is your education?"
                value={education}
                rows={5}
                onChange={setEducation}
            />
        </div>
    </section>
};