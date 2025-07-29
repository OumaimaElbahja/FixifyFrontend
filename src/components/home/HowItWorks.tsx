import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: 1,
    title: "Décrivez votre problème",
    description:
      "Expliquez brièvement votre panne en suivant le formulaire de description",
    highlight: "Notre chatbot peut vous aider instantanément",
    image: "/public/images/how_it_works_1.png",
    position: "right",
  },
  {
    id: 2,
    title: "Comparez les réparateurs",
    description:
      "Choisissez parmi nos réparateurs certifiés selon vos critères de prix et de proximité.",
    image: "/public/images/how_it_works_3.png",
    position: "left",
  },
  {
    id: 3,
    title: "Réparez en confiance",
    description:
      "Réparez avec garantie et transparence. Suivez chaque étape en temps réel jusqu'à la livraison finale.",
    image: "/public/images/how_it_works_2.png",
    position: "right",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section has been scrolled through
      const sectionTop = rect.top;

      // Start progress when section enters viewport
      const startProgress = Math.max(
        0,
        viewportHeight - sectionTop,
      );
      // Complete progress when section fully exits viewport
      const maxProgress = sectionHeight + viewportHeight;

      // Calculate progress as a percentage (0 to 1)
      const progress = Math.min(
        Math.max(startProgress / maxProgress, 0),
        1,
      );
      setScrollProgress(progress);

      // Determine active step based on scroll progress
      let newActiveStep = 1;
      if (progress > 0.33) newActiveStep = 2;
      if (progress > 0.66) newActiveStep = 3;

      setActiveStep(newActiveStep);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Initial calculation
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    // Scroll to the appropriate position for this step
    if (sectionRef.current) {
      const section = sectionRef.current;
      const targetProgress = (stepId - 1) / 2; // 0, 0.5, 1 for steps 1, 2, 3
      const scrollTarget =
        section.offsetTop +
        section.offsetHeight * targetProgress -
        window.innerHeight / 2;

      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className=" bg-gradient-to-br from-gray-50 to-white min-h-[700px] py-20 overflow-hidden relative py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-3xl md:text-4xl lg:text-[36px] leading-[60px] mb-6">
            Comment ça marche?
          </h2>
          <div className="font-['Poppins'] font-normal text-[#000000] text-lg md:text-xl lg:text-[20px] leading-[60px] max-w-4xl mx-auto">
            <p className="px-[0px] py-[-6px] mx-[0px] my-[-24px]">
              <span>
                Un processus simple et transparent en 3 étapes
                pour réparer votre appareil rapidement{" "}
              </span>
              <span className="font-['Poppins'] font-bold text-[#195ea8]">
                ou résoudre les problèmes basiques grâce à notre
                assistant virtuel
              </span>
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0">
            {/* Background Line */}
            <div className="w-[4px] bg-[#E3EAF1] h-full relative">
              {/* Progress Line */}
              <div
                className="absolute top-0 left-0 w-full bg-[#84A6CF] transition-all duration-300 ease-out"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>

          {/* Scroll Progress Indicator - Mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <span className="font-['Poppins'] text-sm text-gray-500">
                Étape
              </span>
              <span className="font-['Poppins'] font-bold text-[#E67A17]">
                {activeStep}
              </span>
              <span className="font-['Poppins'] text-sm text-gray-500">
                sur 3
              </span>
              <div className="ml-4 w-16 h-2 bg-[#E3EAF1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#84A6CF] transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-32">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                {/* Step 1 - Right Content */}
                {step.id === 1 && (
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
                    {/* Content - Left side on desktop */}
                    <div
                      className={`lg:w-1/2 lg:pr-16 order-2 lg:order-1 text-center lg:text-right transition-all duration-500 ${
                        activeStep === step.id
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-60 transform translate-y-4"
                      }`}
                    >
                      <div className="lg:mr-8">
                        <h3 className="font-['Poppins'] font-bold text-[#000000] text-xl md:text-2xl lg:text-[18px] leading-[60px] mb-4 text-center">
                          {step.title}
                        </h3>
                        <div className="font-['Poppins'] text-[#000000] text-base lg:text-[18px] leading-[30px]">
                          <p className="text-center">
                            <span>{step.description}</span>
                            <br />
                            <span className="font-['Poppins'] font-bold text-[#2768ad]">
                              {step.highlight}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step Indicator - Center */}
                    <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 order-1 lg:order-2 z-10">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-110 ${
                          activeStep >= step.id
                            ? "bg-[#E67A17] shadow-lg scale-110"
                            : "bg-gray-300 scale-100"
                        }`}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <span className="font-['Poppins'] font-bold text-white text-2xl">
                          1
                        </span>
                      </div>
                    </div>

                    {/* Image - Right side on desktop */}
                    <div className="lg:w-1/2 lg:pl-16 order-3 flex justify-center lg:justify-start">
                      <div className="lg:ml-8">
                        <img
                          src={step.image}
                          alt={step.title}
                          className={`w-32 h-32 md:w-40 md:h-40 lg:w-[161px] lg:h-[161px] object-cover rounded-lg transition-all duration-500 ${
                            activeStep === step.id
                              ? "scale-105 shadow-lg opacity-100"
                              : "scale-100 opacity-60"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 - Left Content */}
                {step.id === 2 && (
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
                    {/* Image - Left side on desktop */}
                    <div className="lg:w-1/2 lg:pr-16 order-3 lg:order-1 flex justify-center lg:justify-end">
                      <div className="lg:mr-8">
                        <img
                          src={step.image}
                          alt={step.title}
                          className={`w-48 h-48 md:w-56 md:h-56 lg:w-[220px] lg:h-[220px] object-cover rounded-lg transition-all duration-500 ${
                            activeStep === step.id
                              ? "scale-105 shadow-lg opacity-100"
                              : "scale-100 opacity-60"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Step Indicator - Center */}
                    <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 order-1 lg:order-2 z-10">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-110 ${
                          activeStep >= step.id
                            ? "bg-[#E67A17] shadow-lg scale-110"
                            : "bg-gray-300 scale-100"
                        }`}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <span className="font-['Poppins'] font-bold text-white text-2xl">
                          2
                        </span>
                      </div>
                    </div>

                    {/* Content - Right side on desktop */}
                    <div
                      className={`lg:w-1/2 lg:pl-16 order-2 lg:order-3 text-center lg:text-left transition-all duration-500 ${
                        activeStep === step.id
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-60 transform translate-y-4"
                      }`}
                    >
                      <div className="lg:ml-8">
                        <h3 className="font-['Poppins'] font-bold text-[#000000] text-xl md:text-2xl lg:text-[18px] leading-[60px] mb-4 text-center">
                          {step.title}
                        </h3>
                        <div className="font-['Poppins'] text-[#000000] text-base lg:text-[18px] leading-[30px]">
                          <p className="text-center text-[18px]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 - Right Content */}
                {step.id === 3 && (
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
                    {/* Content - Left side on desktop */}
                    <div
                      className={`lg:w-1/2 lg:pr-16 order-2 lg:order-1 text-center lg:text-right transition-all duration-500 ${
                        activeStep === step.id
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-60 transform translate-y-4"
                      }`}
                    >
                      <div className="lg:mr-8">
                        <h3 className="font-['Poppins'] font-bold text-[#000000] text-xl md:text-2xl lg:text-[18px] leading-[60px] mb-4 text-center">
                          {step.title}
                        </h3>
                        <div className="font-['Poppins'] text-[#000000] text-base lg:text-[18px] leading-[30px]">
                          <p className="text-center text-[18px]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step Indicator - Center */}
                    <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 order-1 lg:order-2 z-10">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-110 ${
                          activeStep >= step.id
                            ? "bg-[#E67A17] shadow-lg scale-110"
                            : "bg-gray-300 scale-100"
                        }`}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <span className="font-['Poppins'] font-bold text-white text-2xl">
                          3
                        </span>
                      </div>
                    </div>

                    {/* Image - Right side on desktop */}
                    <div className="lg:w-1/2 lg:pl-16 order-3 flex justify-center lg:justify-start">
                      <div className="lg:ml-8">
                        <img
                          src={step.image}
                          alt={step.title}
                          className={`w-28 h-36 md:w-32 md:h-40 lg:w-[111px] lg:h-[142px] object-cover rounded-lg transition-all duration-500 ${
                            activeStep === step.id
                              ? "scale-105 shadow-lg opacity-100"
                              : "scale-100 opacity-60"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Timeline Indicators */}
          <div className="lg:hidden flex justify-center mt-12 space-x-4">
            {steps.map((step) => (
              <button
                key={step.id}
                title={`Aller à l'étape ${step.id}: ${step.title}`}
                aria-label={`Aller à l'étape ${step.id}: ${step.title}`}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeStep >= step.id
                    ? "bg-[#E67A17] scale-125"
                    : "bg-[#E3EAF1]"
                }`}
                onClick={() => handleStepClick(step.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}