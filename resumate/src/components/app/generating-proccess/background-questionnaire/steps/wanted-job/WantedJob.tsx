import { Input } from "@/components/shared/input/Input";
import { useState } from "react";

export const WantedJob = () => {
    const [jobTitle, setJobTitle] = useState('');

    return <section className="wanted-job flex-1 flex flex-col pt-[100px]">
        <h2 className="font-bold text-3xl text-center mb-5">Tell Us About the Job <br />You Are
            Looking For</h2>
        <Input value={jobTitle} onChange={setJobTitle} placholder="Graphic Designer.."/>
        <span className="opacity-60 text-[12px] text-center mt-[7px]">Please add level if you have (like "Senior")</span>
    </section>
};