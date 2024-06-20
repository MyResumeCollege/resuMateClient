import Lottie from "react-lottie";
import AiLoadingAnimation from '@/assets/lotties/ai-loading.json';

export const Loading = () => {
    return <main className="flex-1 flex flex-col items-center justify-center">
        <Lottie
            isClickToPauseDisabled
            options={{ animationData: AiLoadingAnimation, loop: true }}
            style={{ height: 200, width: 200, filter: "drop-shadow(4px 4px 8px #bababa)", marginBottom: 20 }}
        />
        <h2 className="font-semibold text-xl mb-[3px]">Our AI engine is generating your CV</h2>
        <span className="opacity-60">did you know? 80% of resuMate don't put images on their CVs</span>
    </main>
}