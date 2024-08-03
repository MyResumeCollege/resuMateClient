import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { fetchTemplates, Template } from "@/services/templateService";
import "./SelectTemplate.css";
import crownImage from "@/assets/images/crown.png";
import { useRecoilValue } from "recoil";
import { userIdSelector, isUserPremiumSelector } from "@/store/atoms/userAtom";

export const SelectTemplate = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdSelector);
  const isPremiumUser = useRecoilValue(isUserPremiumSelector);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const templatesData = await fetchTemplates();
        setTemplates(templatesData);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Failed to fetch templates.");
      } finally {
        setLoading(false);
      }
    };

    getTemplates();
  }, [userId]);

  const handleTemplateClick = (id: string) => {
    if (isPremiumUser || !templates.find((t) => t._id === id)?.isPremium) {
      setSelectedTemplate(id);
    }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                key={item._id}
                className="flex justify-center items-center h-[330px] relative"
              >
                {item.isPremium && (
                  <img
                    src={crownImage}
                    className="absolute left-2 w-12 h-12"
                    alt="Premium"
                  />
                )}
                <div
                  className={`flex justify-center items-center h-[330px] p-1 ${
                    selectedTemplate === item._id
                      ? "border-primary border-4"
                      : "border-gray-200"
                  } bg-white border rounded-sm shadow-md mx-1 cursor-pointer transition-all duration-300 ${
                    item.isPremium && !isPremiumUser
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleTemplateClick(item._id)}
                >
                  <img
                    src={item.imageUrl}
                    className="w-11/12 h-11/12 rounded-md"
                    alt={`Template ${item._id}`}
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
