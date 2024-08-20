import { PremiumBadge } from "@/components/shared/premium-badge/PremiumBadge";
import { Template, templates } from "@/services/templateService";
import { isUserPremiumSelector } from "@/store/atoms/userAtom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useRecoilState, useRecoilValue } from "recoil";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { templateState } from "../../../store/state";
import "./SelectTemplate.css";

export const SelectTemplate = () => {
  const isPremiumUser = useRecoilValue(isUserPremiumSelector);

  const [selectedTemplate, setTemplate] = useRecoilState(templateState);

  const handleTemplateClick = (id: number) => {
    const template = templates.find(tmp => tmp._id === id);

    if (template && (isPremiumUser || !template?.isPremium)) {
      setTemplate(template._id);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const PremiumTemplateWrapper = (children: JSX.Element) => {
    return <Link to='/pricing' target="_blank" replace>
      {children}
    </Link>
  }

  const templateRenderer = (template: Template) => {
    return <div
      key={template._id}
      className="flex justify-center items-center h-[330px] relative"
    >
      {template.isPremium && !isPremiumUser && (
        <div className="absolute left-4 top-2 z-10 shadow">
          <PremiumBadge text="Premium Template" />
        </div>
      )}
      <div
        className={`flex justify-center items-center h-[330px] p-1 ${selectedTemplate === template._id
          ? "border-primary border-4"
          : "border-gray-200"
          } bg-white border rounded-sm shadow-md mx-1 cursor-pointer transition-all duration-300 ${template.isPremium && !isPremiumUser
            ? "opacity-50"
            : ""
          }`}
        onClick={() => handleTemplateClick(template._id)}
      >
        <img
          src={template.imageUrl}
          className="w-11/12 h-11/12 rounded-md"
          alt={`Template ${template._id}`}
        />
      </div>
    </div>
  }

  return (
    <section className="flex-1 flex flex-col items-center pt-12">
      <h2 className="font-bold text-3xl text-center mb-5">
        Select Your Template
      </h2>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-xl">
          <Slider {...settings}>
            {templates.map((item) => (item.isPremium && !isPremiumUser ? PremiumTemplateWrapper(templateRenderer(item)) : templateRenderer(item)))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
