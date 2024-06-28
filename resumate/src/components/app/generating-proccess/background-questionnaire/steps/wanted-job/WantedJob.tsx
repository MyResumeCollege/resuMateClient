import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { useRecoilState } from 'recoil';
import { jobTitleState } from "../../../store/state";

export const WantedJob = () => {
    const [jobTitle, setJobTitle] = useRecoilState(jobTitleState);

    return <section className="wanted-job flex-1 flex flex-col pt-[70px] items-center">
        <h2 className="font-bold text-3xl text-center mb-5">What is Your Desired<br />Job Title?</h2>
        <div className='mb-5'>
            <TextInput wrapperClassName='w-[400px]' label='Job Title' value={jobTitle} onChange={setJobTitle} placholder="Graphic Designer.." />
            <span className="opacity-60 text-[12px] text-center mt-[7px]">Please add level if you have (like "Senior")</span>
        </div>
    </section>
};