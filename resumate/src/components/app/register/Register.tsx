import { Button } from "@/components/shared/button/Button";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../store/atoms/userAtom";
import { registerUser } from "../../../services/authService";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await registerUser({ email, password, name });
      const { data: registerRes } = response;

      setUser(registerRes.user);
      console.log(`User ${registerRes.user.name} registered successfully`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <section className="flex flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg">
        <section className="flex flex-col gap-2 w-[400px]">
          <h1 className="text-4xl font-bold mb-[20px]">Register</h1>
          <TextInput value={name} onChange={setName} label="Name" />
          <TextInput value={email} onChange={setEmail} label="Email Address" />
          <TextInput
            value={password}
            onChange={setPassword}
            type="password"
            label="Password"
          />
          <Button onClick={handleRegister}>Register</Button>
          <div className="flex pt-2 text-sm items-center">
            <span>Already have an account?</span>
            <Link to={"/"} className="ml-2 text-[red]">
              Log In
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
};
