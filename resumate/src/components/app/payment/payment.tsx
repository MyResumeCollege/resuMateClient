import { useState } from "react";
import { Button } from "@/components/shared/button/Button";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { setUserPremiumStatus } from "../../../services/premiumService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userIdSelector, userState } from "@/store/atoms/userAtom";

const Payment = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const userId = useRecoilValue(userIdSelector);

  const features = [
    { text: "Unlimited Resumes", isAvailable: true },
    { text: "Support in multiple languages", isAvailable: true },
    { text: "Cool Templates", isAvailable: true },
    { text: "Edit Existing Resumes", isAvailable: true },
  ];

  const [cvv, setCVV] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCVVChange = (value: string) => {
    const cvv = value.replace(/\D/g, "");
    if (cvv.length <= 3) {
      setCVV(cvv);
    }
  };
  const formatCardNumber = (number: string) => {
    return number
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (value: string) => {
    setCardNumber(formatCardNumber(value));
  };

  const handleNameChange = (value: string) => {
    const name = value.replace(/[^A-Za-z\s]/g, "");
    setName(name);
  };

  const handleDateChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 6) {
      let formattedValue = numericValue;
      if (numericValue.length > 2) {
        formattedValue = numericValue.slice(0, 2) + "/" + numericValue.slice(2);
      }
      setEndDate(formattedValue);
    }
  };

  const handlePayment = async (userId: string, isPremium: boolean) => {
    if (cardNumber.length !== 19 || endDate.length !== 7) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    if (userId) {
      try {
        await setUserPremiumStatus(userId, isPremium);
        setUser((prevUser) => ({
          ...prevUser,
          isPremium,
        }));
        toast.success(
          `Successfully updated to ${isPremium ? "Premium" : "Basic"} plan.`
        );
        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating user premium status:", error);
        toast.error("Failed to update plan. Please try again.");
      }
    } else {
      toast.error("User ID is not available. Please log in.");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-10">
      <div className="flex gap-10 bg-white p-10 rounded-lg shadow-lg">
        <section className="flex flex-col gap-2 w-[400px]">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Complete Payment
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your Credit or Debit Card details below
          </p>
          <div className="space-y-4">
            <TextInput
              value={name}
              onChange={handleNameChange}
              type="text"
              label="Full Name"
            />
            <TextInput
              value={cardNumber}
              onChange={handleCardNumberChange}
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  maxLength={7}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="MM/YYYY"
                />
              </div>
              <TextInput
                value={cvv}
                onChange={handleCVVChange}
                label="CVV"
                placeholder="XXX"
                maxLength={3}
              />
            </div>
          </div>
          <Button
            buttonClassName="font-bold mt-[20px]"
            onClick={() => handlePayment(userId, true)}
          >
            Pay Now
          </Button>
        </section>

        {/* Features Section */}
        <section className="pt-8 px-8 pb-4 flex flex-col items-center gap-6 flex-1 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold">Premium</h2>
          <div className="text-3xl font-semibold text-black text-center mb-4">
            $3.5{" "}
            <span className="text-sm font-regular text-dark">/ per month</span>
          </div>
          <ul className="list-none pl-4 space-y-3 text-left flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                {feature.isAvailable ? (
                  <FaCheckCircle className="text-primary text-xl" />
                ) : (
                  <FaTimes className="text-red-500 text-xl" />
                )}
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Payment;
