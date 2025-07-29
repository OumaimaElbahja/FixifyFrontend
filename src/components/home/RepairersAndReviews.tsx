import React, { useState, useEffect } from "react";
// SVG path data inlined to avoid missing module error
const svgPaths = {
  p16715380: "M3588.78 140.874C3588.78 387.924 2541.6 755.508 1903.75 577.065C1208.92 532.722 0 990.708 0 743.657C0 496.607 479.287 204.996 1031.81 112.632C1526.43 29.946 3588.78 -106.176 3588.78 140.874Z",
};


const reviews = [
  {
    name: "Marie Laurent",
    rating: 5,
    comment:
      "Service excellent ! Mon iPhone a été réparé en 1h. Je recommande vivement Fixify pour sa rapidité et professionnalisme.",
  },
  {
    name: "Jean Dupont",
    rating: 5,
    comment:
      "Réparation de qualité à prix abordable. L'équipe est très compétente et le service client au top !",
  },
  {
    name: "Sophie Martin",
    rating: 4,
    comment:
      "Mon ordinateur portable fonctionne parfaitement après la réparation. Délai respecté et travail soigné.",
  },
];

export function RepairersAndReviews() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const prev = () => {
    setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const next = () => {
    setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  return (
    <div className="bg-[#ffffff] relative overflow-hidden">
      {/* Enhanced Shared SVG Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main SVG Background */}
        <div className="absolute flex h-[800px] lg:h-[1213.918px] items-center justify-center left-[-600px] lg:left-[-1150px] top-[150px] lg:top-[261.067px] w-[2000px] lg:w-[3663.636px] -translate-y-8 opacity-80">
          <div className="flex-none rotate-[353.56deg] skew-x-[0.413deg]">
            <div className="h-[600px] lg:h-[817.233px] relative w-[1800px] lg:w-[3588.78px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 3589 818"
              >
                <path
                  d={svgPaths.p16715380}
                  fill="url(#paint0_linear_7_715)"
                  fillOpacity="0.5"
                  id="Ellipse 125"
                  opacity="0.5"
                />
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_7_715"
                    x1="920.761"
                    x2="1115.31"
                    y1="525.239"
                    y2="-311.96"
                  >
                    <stop stopColor="#CDCDCD" />
                    <stop
                      offset="0.417652"
                      stopColor="#BAC1C9"
                    />
                    <stop
                      offset="0.721154"
                      stopColor="#94AAC2"
                    />
                    <stop offset="0.9998" stopColor="#84A6CF" />
                    <stop offset="0.9999" stopColor="#94AAC2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Additional decorative elements for mobile */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-orange-200/30 rounded-full blur-xl lg:hidden"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-blue-200/30 rounded-full blur-lg lg:hidden"></div>
      </div>

      {/* Repairers Section */}
      <div  id="repairer" className="relative py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                <div className="w-2 h-2 bg-[#195ea8] rounded-full"></div>
                <span className="text-[#195ea8] font-medium text-sm">
                  Nos Experts
                </span>
              </div>

              <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                Votre Appareil Entre de Bonnes Mains
              </h2>

              <div className="space-y-4">
                <p className="font-['Poppins'] text-[#000000] text-base sm:text-lg lg:text-xl leading-relaxed">
                  <span>Chez </span>
                  <span className="font-['Poppins'] font-medium text-[#2768ad]">
                    Fixify
                  </span>
                  <span>
                    , chaque réparation est effectuée par des
                    techniciens certifiés utilisant uniquement
                    des pièces d'origine.
                  </span>
                </p>
                <p className="text-gray-600 leading-relaxed font-[Poppins]">
                  Votre appareil est traité avec soin et livré
                  dans les meilleurs délais. Notre équipe
                  d'experts garantit un service de qualité
                  supérieure.
                </p>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px]">
                    Techniciens certifiés
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px]">
                    Pièces d'origine
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px]">
                    Livraison rapide
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="flex justify-center items-center w-full">
              {/* Main Repairer Image just below */}
              <div className="relative z-10">
                <img
                  src="/public/images/repairer.png"
                  alt="Technicien réparateur professionnel"
                  className="w-[280px] h-[220px] sm:w-[320px] sm:h-[260px] md:w-[360px] md:h-[280px] lg:w-[380px] lg:h-[300px] xl:w-[420px] xl:h-[340px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div  id="reviews" className="relative py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#E27E21] rounded-full"></div>
              <span className="text-[#E27E21] font-medium text-sm">
                Témoignages
              </span>
            </div>
            <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
              Avis Clients
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Découvrez ce que nos clients pensent de nos
              services
            </p>
          </div>

          {/* Reviews Carousel */}
          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Blurred Background */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] lg:h-[300px] rounded-[40px] lg:rounded-[80px] bg-gradient-to-r from-[#E27E21]/20 via-[#D9D9D9]/30 to-[#84A6CF]/20 blur-2xl opacity-60"></div>
            </div>

            {/* Reviews Container */}
            <div className="relative min-h-[400px] lg:min-h-[450px] flex items-center justify-center">
              {/* Mobile: Single Card View */}
              <div className="block lg:hidden w-full">
                <div className="flex justify-center">
                  <div className="w-[300px] sm:w-[350px] h-[320px] sm:h-[340px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center justify-between p-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3 pt-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E27E21]/40 to-[#195ea8]/40 shadow-lg border-2 border-white flex items-center justify-center">
                        <span className="text-[#1a3151] font-bold text-xl">
                          {
                            reviews[current].name.split(
                              " ",
                            )[0][0]
                          }
                        </span>
                      </div>
                      <div className="font-['Poppins'] font-semibold text-lg text-[#195ea8]">
                        {reviews[current].name}
                      </div>
                      <div className="flex gap-1 text-xl text-[#e17613]">
                        {"★".repeat(reviews[current].rating)}
                        {"☆".repeat(
                          5 - reviews[current].rating,
                        )}
                      </div>
                    </div>
                    {/* Review Text */}
                    <div className="flex-1 flex items-center text-center font-['Poppins'] text-[#1a3151] text-sm sm:text-base leading-relaxed px-2">
                      {reviews[current].comment}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Multi-Card View */}
              <div className="hidden lg:block w-full h-full">
                <div className="relative w-full h-full flex items-center justify-center">
                  {reviews.map((review, i) => {
                    const isActive = i === current;
                    const isPrev =
                      (current === 0 &&
                        i === reviews.length - 1) ||
                      i === current - 1;
                    const isNext =
                      (current === reviews.length - 1 &&
                        i === 0) ||
                      i === current + 1;

                    return (
                      <div
                        key={review.name}
                        className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${
                          isActive
                            ? "z-10 scale-100 opacity-100 left-1/2 -translate-x-1/2"
                            : isPrev
                              ? "left-[5%] scale-90 opacity-70 hover:opacity-90"
                              : isNext
                                ? "right-[5%] scale-90 opacity-70 hover:opacity-90"
                                : "opacity-0 pointer-events-none"
                        } h-[380px] w-[420px] xl:w-[480px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border border-white/20`}
                        onClick={() => {
                          if (!isActive) {
                            setCurrent(i);
                            setIsAutoPlay(false);
                            setTimeout(
                              () => setIsAutoPlay(true),
                              10000,
                            );
                          }
                        }}
                      >
                        <div className="flex flex-col items-center justify-between h-full p-8 -translate-x-8">
                          {/* Avatar Section */}
                          <div className="flex flex-col items-center gap-4 pt-2">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E27E21]/40 to-[#195ea8]/40 shadow-lg border-2 border-white flex items-center justify-center">
                              <span className="text-[#1a3151] font-bold text-xl">
                                {review.name.split(" ")[0][0]}
                              </span>
                            </div>
                            <div className="font-['Poppins'] font-semibold text-lg text-[#195ea8]">
                              {review.name}
                            </div>
                            <div className="flex gap-1 text-xl text-[#e17613]">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                          </div>
                          {/* Review Text */}
                          <div className="flex-1 flex items-center text-center font-['Poppins'] text-[#1a3151] text-base leading-relaxed px-4">
                            {review.comment}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              {/* Previous Button */}
              <button
                className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center bg-gradient-to-br from-[#E27E21] to-[#195ea8] rounded-full shadow-lg text-white hover:scale-110 transition-transform duration-200 disabled:opacity-50"
                aria-label="Previous review"
                onClick={prev}
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-3">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrent(i);
                      setIsAutoPlay(false);
                      setTimeout(
                        () => setIsAutoPlay(true),
                        10000,
                      );
                    }}
                    className={`h-3 rounded-full shadow transition-all duration-300 hover:scale-125 ${
                      i === current
                        ? "w-8 bg-gradient-to-r from-[#E27E21] to-[#195ea8] scale-105"
                        : "w-3 bg-[#D9D9D9] opacity-60 hover:opacity-80"
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center bg-gradient-to-bl from-[#E27E21] to-[#195ea8] rounded-full shadow-lg text-white hover:scale-110 transition-transform duration-200 disabled:opacity-50"
                aria-label="Next review"
                onClick={next}
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}