import { Button } from "@/components/shared/button/Button";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import "./pricingCard.css";

interface Feature {
  text: string;
  isAvailable: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  pricePeriod: string;
  features: Feature[];
  isPremium: boolean;
  onSelect: () => void;
  badge?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  pricePeriod,
  features,
  isPremium,
  badge,
  onSelect
}) => {
  const badgeHeight = 50;
  const height = badge ? 500 : 500 - badgeHeight;

  return (
    <section
      className={`flex flex-col bg-white rounded-lg w-[350px] shadow-lg ${isPremium ? "glow" : ""
        }`}
      style={{ height }}
    >
      {badge && <div className="bg-primary text-white rounded-t-lg font-bold flex items-center justify-center"
        style={{ height: badgeHeight }}>
        {badge}
      </div>}
      <section className="pt-8 px-8 pb-4 flex flex-col items-center gap-6 flex-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-3xl font-semibold text-black text-center mb-4">
          {price} <span className="text-sm font-regular text-dark">/ {pricePeriod}</span>
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
          <Button onClick={onSelect}>Get Started</Button>
        </div>
      </section>
    </section>
  );
};

export default PricingCard;