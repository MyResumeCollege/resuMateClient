import { InputProps } from "../input-props";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const TextInput = ({
  value,
  disabled = false,
  autoFocus = false,
  label,
  wrapperClassName,
  onChange,
  type = "text",
  placeholder,
  icon,
  inputClassName,
}: InputProps) => {
  return (
    <div className={`space-y-3 ${wrapperClassName}`}>
      <div className="relative flex flex-col gap-[5px]">
        {label && (
          <label className="text-sm flex items-center">
            {label}
            {(type === "password" && inputClassName === "password-register") && (
              <div className="relative ml-2 group">
                <AiOutlineQuestionCircle className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max p-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Password must be at least 6 characters long
                </span>
              </div>
            )}
          </label>
        )}
        <input
          autoFocus={autoFocus}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`peer py-3 px-4 ${
            icon ? "ps-11" : ""
          } focus:outline outline-2 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${inputClassName}`}
          placeholder={placeholder}
        />
        {icon && (
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
