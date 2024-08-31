import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInitialsSelector } from "../../../store/atoms/userAtom";

export const NavBar = () => {
  const userInitials = useRecoilValue(userInitialsSelector);

  return (
    <nav className="h-[65px] bg-white p-5 border border-gray-300 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <span className="font-bold text-2xl logo underlineded">
            ResuMate.
          </span>
        </Link>
      </div>
      <div className="relative flex items-center">
        <Link to="/profile">
          <div className="rounded-full h-[50px] w-[50px] cursor-pointer bg-primary flex items-center justify-center font-bold text-white">
            {userInitials}
          </div>
        </Link>
      </div>
    </nav>
  );
};
