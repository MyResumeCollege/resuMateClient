import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./SelectTemplate.css";

import template1Image from "@/assets/images/resume-template/template1.jpg";
import template2Image from "@/assets/images/resume-template/template2.jpg";
import template3Image from "@/assets/images/resume-template/template3.jpg";
import template4Image from "@/assets/images/resume-template/template4.jpg";
import template5Image from "@/assets/images/resume-template/template5.jpg";
import template6Image from "@/assets/images/resume-template/template6.jpg";
import template7Image from "@/assets/images/resume-template/template7.jpg";
import template8Image from "@/assets/images/resume-template/template8.jpg";
import template9Image from "@/assets/images/resume-template/template9.jpg";

export const SelectTemplate = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    { id: "template1", imageUrl: template1Image },
    { id: "template2", imageUrl: template2Image },
    { id: "template3", imageUrl: template3Image },
    { id: "template4", imageUrl: template4Image },
    { id: "template5", imageUrl: template5Image },
    { id: "template6", imageUrl: template6Image },
    { id: "template7", imageUrl: template7Image },
    { id: "template8", imageUrl: template8Image },
    { id: "template9", imageUrl: template9Image },
  ];

  const handleTemplateClick = (id: string) => {
    setSelectedTemplate(id);
  };

  const generateCV = () => {
    navigate("/build-cv/generate");
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

  return (
    <section className="flex-1 flex flex-col items-center pt-12">
      <h2 className="font-bold text-3xl text-center mb-5">
        Select Your Template
      </h2>
      <div className="text-center mb-5">
        <button
          className="text-blue-500 underline"
          onClick={() => generateCV()}
        >
          Skip this step
        </button>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-xl">
          <Slider {...settings}>
            {templates.map((item) => (
              <div
                key={item.id}
                className="flex justify-center items-center h-[330px]"
              >
                <div
                  className={`flex justify-center items-center h-[330px] p-1 ${
                    selectedTemplate === item.id
                      ? "border-blue-500"
                      : "border-gray-200"
                  } bg-white border rounded-sm shadow-md mx-1 cursor-pointer transition-all duration-300`}
                  onClick={() => handleTemplateClick(item.id)}
                >
                  <img
                    src={item.imageUrl}
                    className="w-11/12 h-11/12 rounded-md"
                    alt={`Template ${item.id}`}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
