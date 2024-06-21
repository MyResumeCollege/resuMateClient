import { useState } from "react";

import { Button } from "@/components/shared/button/Button";
import { useNavigate } from "react-router-dom";
import { Stepper } from "./stepper/Stepper";
import { Personal } from "./steps/personal/Personal";
import { WantedJob } from "./steps/wanted-job/WantedJob";

export const BackgroundQuestionnaire = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        <WantedJob />,
        <Personal />
    ];

    const generateCV = () => {
        navigate('/build-cv/generate');
    }

    const next = () => {
        // finished last step
        if (currentStep + 1 === steps.length) {
            generateCV();
        } else {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
        }
    }

    const back = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    return <main className="flex-1 flex flex-col items-center pt-[50px]">
        <Stepper stepsCount={steps.length} currentStep={currentStep} />
        <section className="current-step flex-1 flex w-[600px]">
            {steps[currentStep]}
        </section>
        <section className="controls flex gap-[20px] pb-[50px] pt-[50px]">
            {currentStep !== 0 && <Button text="Back" variant='secondary' onClick={back} />}
            <Button text="Continue" onClick={next} />
        </section>
    </main>
};