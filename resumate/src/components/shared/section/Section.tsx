import React, {ReactNode} from 'react';
import { FaRedo } from 'react-icons/fa';

type SectionProps = {
  title: string;
  children: ReactNode;
  onRegenerate?: () => void;
}

const Section: React.FC<SectionProps> = ({ title, children, onRegenerate }) => {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2 flex items-center">
          {title}
          {onRegenerate && (
            <FaRedo className="generate-section ml-2 text-gray-500" onClick={onRegenerate} />
          )}
        </h2>
        {children}
      </div>
    )
}

export default Section;
