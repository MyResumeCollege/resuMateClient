import { useState } from "react";

import { WantedJob } from "./steps/wanted-job/WantedJob";
import { Stepper } from "./stepper/Stepper";

export const BackgroundQuestionnaire = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        <WantedJob />,
        <WantedJob />,
        <WantedJob />,
        <WantedJob />,
        <WantedJob />,
    ]

    return <main className="flex-1 flex flex-col items-center pt-[100px]">
        <Stepper stepsCount={steps.length} currentStep={currentStep} />
        <section className="current-step flex-1 flex">
            {steps[currentStep]}
        </section>
        <button onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}>Continue</button>
        <button onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}>Back</button>
    </main>
};