import { Button } from "@/components/shared/button/Button";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();

    const generateCV = () => {
        navigate('/build-cv');
    }

    return <main>
        <Button text="Build CV" onClick={generateCV}/>
    </main>
}