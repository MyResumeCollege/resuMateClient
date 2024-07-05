import { Button } from "@/components/shared/button/Button";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import Lock from "@/assets/images/lock.webp";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../store/atoms/userAtom";
import { saveTokens, googleSignIn } from "../../../services/authService";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await googleSignIn(credentialResponse);
      const { data: loginGoogleRes } = response;

      saveTokens({
        accessToken: loginGoogleRes.accessToken,
        refreshToken: loginGoogleRes.refreshToken,
      });
      setUser(loginGoogleRes.user);
      console.log(`user ${loginGoogleRes.user.name} login via google`);
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log("failed google log in");
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <section className="flex flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg">
        <div className="bg-bg rounded-md flex-1 px-8 flex items-center">
          <img src={Lock} className="w-[250px]" />
        </div>
        <section className="flex flex-col gap-2 w-[400px]">
          <h1 className="text-4xl font-bold mb-[20px]">Login</h1>
          <TextInput value={email} onChange={setEmail} label="Email Address" />
          <TextInput
            value={password}
            onChange={setPassword}
            type="password"
            label="Password"
          />
          <div className="flex pt-2 text-sm items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <Link to={"/forgot-password"} className="ml-auto text-[red]">
              Forgot Password?
            </Link>
          </div>
          <Button>Log In</Button>
          <GoogleLogin
            width={400}
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginFailure}
          />
        </section>
      </section>
    </main>
  );
};
