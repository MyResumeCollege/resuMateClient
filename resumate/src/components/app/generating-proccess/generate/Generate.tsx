import Lottie from "react-lottie";
import AiLoadingAnimation from '@/assets/lotties/ai-loading.json';
import { useRecoilValue } from "recoil";
import { bioState, educationState, fullNameState, jobTitleState } from "../store/state";
import { useEffect } from "react";

export const Generate = () => {
    const fullName = useRecoilValue(fullNameState);
    const bio = useRecoilValue(bioState);
    const eduction = useRecoilValue(educationState);
    const jobTitle = useRecoilValue(jobTitleState);

    const generateCV = async () => {
        // TODO: API call to generate, using the states above
    }

    useEffect(() => {
        generateCV();
    }, [])

    return <main className="flex-1 flex flex-col items-center justify-center">
        <Lottie
            isClickToPauseDisabled
            options={{ animationData: AiLoadingAnimation, loop: true }}
            style={{ height: 200, width: 200, filter: "drop-shadow(4px 4px 8px #bababa)", marginBottom: 20 }}
        />
        <h2 className="font-semibold text-xl mb-[3px]">Our AI engine is generating your CV</h2>
        <span className="opacity-60">did you know? 80% don't put images on their CVs</span>
    </main>
}