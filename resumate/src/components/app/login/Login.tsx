import { Button } from "@/components/shared/button/Button";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput"
import { useState } from "react"
import { Link } from "react-router-dom";
import Lock from '@/assets/images/lock.webp';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <main className="flex-1 flex flex-col items-center justify-center">
        <section className="flex flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg">
            <div className="bg-bg rounded-md flex-1 px-8 flex items-center">
                <img src={Lock} className="w-[250px]" />
            </div>
            <section className="flex flex-col gap-2 w-[400px]">
                <h1 className="text-4xl font-bold mb-[20px]">Login</h1>
                <TextInput value={email} onChange={setEmail} label="Email Address" />
                <TextInput value={password} onChange={setPassword} type='password' label="Password" />
                <div className="flex pt-2 text-sm items-center">
                    <div className="flex items-center gap-2">
                        <input type='checkbox' />
                        <span>Remember me</span>
                    </div>
                    <Link to={'/forgot-password'} className="ml-auto text-[red]">Forgot Password?</Link>
                </div>
                <Button>Log In</Button>
            </section>

        </section>
    </main>
}