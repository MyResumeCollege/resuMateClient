import CrownImage from "@/assets/images/crown.png";
import { Link } from "react-router-dom";

type PremiumBadgeProps = {
    text?: string;
}

export const PremiumBadge = ({ text = 'Premium Only' }: PremiumBadgeProps) => {
    return <Link to='/pricing' target="_blank" replace>
        <div className="flex gap-2 items-center bg-dark rounded-md px-2 py-1">
            <img
                src={CrownImage}
                className="w-4 h-4"
                alt="Premium"
            />
            <span className="text-sm font-semibold text-white">{text}</span>
        </div>
    </Link>
}