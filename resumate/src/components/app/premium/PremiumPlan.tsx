import PricingCard from "./pricingCard/pricingCard";
import { setUserPremiumStatus } from "../../../services/premiumService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PremiumPlan = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  const basicFeatures = [
    { text: "3 Resumes", isAvailable: true },
    { text: "Support in multiple languages", isAvailable: false },
    { text: "Cool Templates", isAvailable: false },
  ];

  const premiumFeatures = [
    { text: "Unlimited Resumes", isAvailable: true },
    { text: "Support in multiple languages", isAvailable: true },
    { text: "Cool Templates", isAvailable: true },
    { text: "Edit Existing Resumes", isAvailable: true },
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");    
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handlePlanSelect = async (isPremium: boolean) => {
    if (userId) {
      try {
        await setUserPremiumStatus(isPremium, userId);
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
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Choose Your Plan</h1>
      <h2 className="text-center text-lg mb-12 max-w-2xl">
        As a premium user, you will be able to do so much more!
      </h2>
      <section className="flex flex-wrap justify-center items-end gap-8">
        <PricingCard
          title="Basic"
          price="FREE"
          pricePeriod="forever"
          features={basicFeatures}
          isPremium={false}
          onSelect={() => handlePlanSelect(false)}
        />
        <PricingCard
          title="Premium"
          price="$0.5"
          pricePeriod="per month"
          badge="Recommended"
          features={premiumFeatures}
          isPremium={true}
          onSelect={() => handlePlanSelect(true)}
        />
      </section>
    </main>
  );
};
