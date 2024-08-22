import { Button } from "@/components/shared/button/Button";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../store/atoms/userAtom";
import { registerUser } from "../../../services/authService";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      if (!email || !password || !name) {
        toast.error("Please fill in all fields");
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Invalid email address");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      const response = await registerUser({ email, password, name });
      const { data: registerRes } = response;

      setUser(registerRes.user);
      navigate("/pricing");
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === 400 &&
        err.response.data === "user already exist"
      ) {
        toast.error("User already exists");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <section className="flex flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg">
        <section className="flex flex-col gap-2 w-[400px]">
          <h1 className="text-4xl font-bold mb-[20px]">Register</h1>
          <TextInput value={name} onChange={setName} label="Name"/>
          <TextInput value={email} onChange={setEmail} label="Email Address" />
            <TextInput
             inputClassName="password-register"
              value={password}
              onChange={setPassword}
              type="password"
              label="Password"
            />
          <div className="flex pt-4 text-sm items-center">
            <Button onClick={handleRegister}>Register</Button>
          </div>
          <div className="flex pt-2 text-sm items-center">
            <span>Already have an account?</span>
            <Link to={"/"} className="ml-2 text-primary font-medium">
              Log In
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
};
