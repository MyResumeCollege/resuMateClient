import { Input } from "@/components/shared/input/Input";
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate();

    const generateCV = () => {
        navigate('/generate');
    }

    return <main>
        <Input value="amit"/>
        <button onClick={generateCV}>Generate CV</button>
    </main>
}