import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  logout as logoutRequest,
  resetTokens,
} from "../../../services/authService";
import { userInitialsSelector, userState } from "../../../store/atoms/userAtom";

export const NavBar = () => {
  const navigate = useNavigate();

  const logoutMutation = useMutation(logoutRequest);
  const resetUserState = useResetRecoilState(userState);
  const userInitials = useRecoilValue(userInitialsSelector);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="rounded-full h-[50px] w-[50px] cursor-pointer bg-primary flex items-center justify-center font-bold text-white"
          onClick={toggleDropdown}>
          {userInitials}
        </div>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-[60px] z-10 right-0 bg-white border border-gray-300 shadow-lg rounded-lg w-[180px] py-2"
          >
            <button
              onClick={handleLogOut}
              className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 rounded-lg"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
