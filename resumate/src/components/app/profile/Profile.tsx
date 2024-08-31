import { Button } from "@/components/shared/button/Button";
import { logout, resetTokens } from "@/services/authService";
import { isUserPremiumSelector, userInitialsSelector, userState } from "@/store/atoms/userAtom";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";

export const Profile = () => {
    const navigate = useNavigate();

    const userInitials = useRecoilValue(userInitialsSelector);
    const isPremium = useRecoilValue(isUserPremiumSelector);
    const { name, email } = useRecoilValue(userState);

    const resetUserState = useResetRecoilState(userState);
    const logoutMutation = useMutation(logout);

    const handleLogOut = async () => {
        try {
            await logoutMutation.mutateAsync();
            resetTokens();
            resetUserState();
            navigate("/", { replace: true });
        } catch (err) {
            toast.error("Failed to sign out");
        }
    };

    return <main className="flex flex-1 flex-col items-center pt-[120px]">
        <div className="rounded-full h-[150px] w-[150px] bg-primary flex items-center justify-center font-bold text-white text-5xl">
            {userInitials}
        </div>
        <div className="text-2xl font-bold mt-5">{name}</div>
        <div className="text-md font-light opacity-60">{email}</div>

        <div className="my-5 flex items-center gap-2">
            <span className="font-medium whitespace-pre bg-[#e1e1e1] text-[#4f4f4f] py-2 px-3 rounded-md">{isPremium ? 'Premium' : 'Basic'} Plan</span>
            <Link to='/pricing'>
                <Button variant='outlined' buttonClassName="inline" dense>Change Plan</Button>
            </Link>
        </div>

        <Button buttonClassName="!w-fit mt-5" onClick={handleLogOut}>Log Out</Button>
    </main>
}