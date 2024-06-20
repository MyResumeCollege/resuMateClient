import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate();

    const generateCV = () => {
        navigate('/generate');
    }

    return <main>
        <button onClick={generateCV}>Generate CV</button>
    </main>
}