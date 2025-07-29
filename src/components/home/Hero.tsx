import { Button } from "../ui/ui/button";
import { useState } from "react";

export function Hero() {
  const [isRepairHovered, setIsRepairHovered] = useState(false);
  const [isPartnerHovered, setIsPartnerHovered] =
    useState(false);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0">
        {/* Background image using img tag */}
        <img 
          src="/public/images/hero_1.png" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-[90%] object-cover object-center"
        />
        <div className="absolute inset-0 w-full h-[90%] bg-[rgba(11,62,116,0.65)]" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left content - Text and buttons */}
        <div className="flex-1 flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-20 xl:px-24 pt-20 lg:pt-0">
          <div className="max-w-xl lg:max-w-none text-center lg:text-left">
            {/* Main heading */}
            <h1 className="font-['Inter'] font-bold text-white mb-6 lg:mb-8">
              {/* Mobile and tablet heading */}
              <span className="block lg:hidden text-3xl sm:text-4xl md:text-5xl leading-tight">
                Réparez votre{" "}
                <span className="text-white">appareil</span> en
                toute confiance
              </span>

              {/* Desktop heading - exact Figma styling */}
              <span className="hidden lg:block text-[48px] xl:text-[60px] leading-[56px] xl:leading-[72px]">
                Réparez votre
                <br />
                <span className="text-white">appareil</span>
                <br />
                en toute confiance
              </span>
            </h1>

            {/* Description */}
            <p className="font-['Inter'] text-white mb-8 lg:mb-10">
              <span className="block lg:hidden text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Trouvez un réparateur certifié ou commandez vos
                pièces en quelques clics
              </span>
              <span className="hidden lg:block text-[18px] xl:text-[20px] leading-[28px] xl:leading-[30px] max-w-[500px]">
                Trouvez un réparateur certifié ou commandez vos
                pièces en quelques clics
              </span>
            </p>

            {/* Enhanced Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
              {/* Primary Button - Repair Request */}
              <Button
                className="group relative bg-gradient-to-r from-[#e67a17] to-[#d66a0e] hover:from-[#d66a0e] hover:to-[#c55a08] text-white font-['Inter'] font-semibold transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-[16px] lg:rounded-[20px] order-1 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px] lg:min-w-[240px] overflow-hidden"
                onMouseEnter={() => setIsRepairHovered(true)}
                onMouseLeave={() => setIsRepairHovered(false)}
              >
                {/* Button background shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2">
                  <svg
                    className={`w-5 h-5 transition-all duration-300 ${isRepairHovered ? "scale-110 rotate-12" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span className="transition-all duration-300 group-hover:tracking-wide text-[16px]">
                    Demander une réparation
                  </span>
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${isRepairHovered ? "translate-x-1" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Button>

              {/* Secondary Button - Become Partner */}
              <Button
                variant="outline"
                className="group relative border-2 border-white text-white hover:bg-white hover:text-[#195ea8] font-['Inter'] font-semibold bg-transparent transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-[16px] lg:rounded-[20px] order-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px] lg:min-w-[240px] backdrop-blur-sm hover:backdrop-blur-0 overflow-hidden"
                onMouseEnter={() => setIsPartnerHovered(true)}
                onMouseLeave={() => setIsPartnerHovered(false)}
              >
                {/* Button background slide effect */}
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2">
                  <svg
                    className={`w-5 h-5 transition-all duration-300 ${isPartnerHovered ? "scale-110 rotate-12" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="transition-all duration-300 group-hover:tracking-wide text-[20px]">
                    Devenir réparateur
                  </span>
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${isPartnerHovered ? "translate-x-1" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Button>
            </div>

            {/* Additional Trust Indicators */}
            <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Réparateurs certifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Pièces authentiques</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Garantie incluse</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right content - Phone image */}
        <div className="flex-1 flex items-center justify-center relative lg:items-start lg:justify-end lg:pr-20 xl:pr-24">
          {/* Mobile/Tablet phone image */}
          <div className="block lg:hidden absolute bottom-0 right-0 w-48 sm:w-56 md:w-64 h-60 sm:h-70 md:h-80 opacity-30 lg:opacity-100">
            <img 
              src="/public/images/hero_2.png" 
              alt="Phone Repair" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Desktop phone image - exact Figma positioning */}
          <div className="hidden lg:block absolute top-[120px] right-0 xl:right-[100px] w-[400px] xl:w-[500px] h-[400px] xl:h-[600px] translate-y-8">
            <img 
              src="/public/images/hero_2.png" 
              alt="Phone Repair" 
              className="w-full h-[95%] object-cover object-center"
            />
      </div>
      {/* Decorative elements for mobile */}
          </div>
          </div>
    </section>
  );
}