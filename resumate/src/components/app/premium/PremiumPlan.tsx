import "./premiumPlan.css";
import PricingCard from "./pricingCard/pricingCard";

export const PremiumPlan = () => {
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

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-6xl font-bold mb-12 text-center">Pricing Plan</h1>
      <h2 className="text-center text-lg mb-12 max-w-2xl">
        As a premium user, you will be able to do so much more!
      </h2>
      <section className="flex flex-wrap justify-center gap-8">
        <PricingCard
          title="Basic"
          price="FREE"
          features={basicFeatures}
          isPremium={false}
        />
        <PricingCard
          title="Premium"
          price="$0.5 PER MONTH"
          features={premiumFeatures}
          isPremium={true}
        />
      </section>
    </main>
  );
};
