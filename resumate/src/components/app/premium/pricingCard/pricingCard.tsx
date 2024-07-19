import { Button } from "@/components/shared/button/Button";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import "../premiumPlan.css";

interface Feature {
  text: string;
  isAvailable: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: Feature[];
  isPremium: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isPremium,
}) => {
  return (
    <section
      className={`flex flex-col items-center gap-6 bg-white p-8 rounded-lg w-[350px] h-[500px] shadow-lg ${
        isPremium ? "glow" : ""
      }`}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <div className="text-2xl font-semibold text-primary text-center mb-4">
        {price}
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
      <div className="w-full flex justify-center mt-auto mb-4">
        <Button>Buy Now</Button>
      </div>
    </section>
  );
};

export default PricingCard;