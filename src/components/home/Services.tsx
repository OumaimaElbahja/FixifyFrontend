import { useState, useEffect, useRef } from "react";
// import { EnhancedServiceCard } from "./EnhancedServiceCard";

const svgPaths = {
  pc73a480: "M225.268 172.334C306.85 344.403 188.986 355 121.747 355C54.5079 355 0 283.024 0 194.238C0 105.451 16.6722 0 83.9111 0C151.15 0 174.392 65.0311 225.268 172.334Z",
}

interface ServiceCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hasOverlay?: boolean;
  overlayColor?: string;
  hasPlayButton?: boolean;
  category: string;
}

const servicesData: ServiceCard[] = [
  {
    id: 1,
    title: "Réparation",
    subtitle: "Smartphone",
    description:
      "Écran cassé, batterie défaillante, problème de charge",
    image: "/public/images/blogs1.png",
    hasOverlay: false,
    category: "Mobile",
  },
  {
    id: 2,
    title: "Réparation",
    subtitle: "Tablette",
    description:
      "Réparation d'écran, batterie, connectique et plus",
    image: "/public/images/tablette.png",
    hasOverlay: true,
    overlayColor: "rgba(19,52,88,0.6)",
    category: "Tablette",
  },
  {
    id: 3,
    title: "Réparation",
    subtitle: "Laptop",
    description:
      "Clavier, écran, carte mère, diagnostic complet",
    image: "/public/images/laptop.png",
    hasOverlay: false,
    category: "Ordinateur",
  },
  {
    id: 4,
    title: "Réparation",
    subtitle: "Smartwatch",
    description: "Écran, batterie, bracelet, étanchéité",
    image: "/public/images/smartwatch.png",
    hasOverlay: true,
    overlayColor: "rgba(16,50,84,0.9)",
    hasPlayButton: true,
    category: "Accessoire",
  },
];

export function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || isTransitioning) return;

    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide, isTransitioning]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % servicesData.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) =>
        (prev - 1 + servicesData.length) % servicesData.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    handleNextSlide();
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    handlePrevSlide();
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlay(true);
    }, 500);
  };

  // Touch handlers
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
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const getVisibleServices = () => {
    const services = [];

    // For desktop: show current + next 2 services
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % servicesData.length;
      services.push({
        ...servicesData[index],
        position: i,
        realIndex: index,
        isActive: i === 0,
      });
    }

    return services;
  };

  return (
    <section
      id="services"
      className="relative bg-gradient-to-br from-gray-50 to-white min-h-[700px] py-20 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary Background SVG */}
        <div className="absolute h-[400px] left-[-60px] top-[100px] w-[280px] opacity-60">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 253 355"
          >
            <path
              d={svgPaths.pc73a480}
              fill="#E67A17"
              fillOpacity="0.3"
              id="Ellipse 120"
            />
          </svg>
        </div>

        {/* Secondary decorative elements */}
        <div className="absolute h-[200px] right-[-40px] top-[200px] w-[150px] opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl"></div>
        </div>

        <div className="absolute h-[120px] left-[60%] top-[50px] w-[120px] opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-lg"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#E67A17] rounded-full"></div>
            <span className="text-[#E67A17] font-medium text-sm">
              Nos Solutions
            </span>
          </div>

          <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            Nos Services
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des réparations expertes pour tous vos appareils
            électroniques
          </p>
        </div>

        {/* Enhanced Carousel Container */}
        <div
          ref={carouselRef}
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop View - Enhanced Multi-Card Layout */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center gap-6 xl:gap-8 min-h-[420px]">
              {getVisibleServices().map(
                (service) => (
                  <div
                    key={`${service.id}-${service.position}`}
                    className={`transition-all duration-500 ease-out cursor-pointer ${
                      service.isActive
                        ? "scale-105 z-20"
                        : "scale-95 opacity-75 hover:scale-100 hover:opacity-90"
                    }`}
                    onClick={() => goToSlide(service.realIndex)}
                  >
                    <EnhancedServiceCard
                      service={service}
                      isActive={service.isActive}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Tablet View - Two Cards */}
          <div className="hidden md:block lg:hidden">
            <div className="flex items-center justify-center gap-6 min-h-[420px]">
              {getVisibleServices()
                .slice(0, 2)
                .map((service, displayIndex) => (
                  <div
                    key={`${service.id}-${service.position}`}
                    className={`transition-all duration-500 ease-out cursor-pointer ${
                      displayIndex === 0
                        ? "scale-105 z-20"
                        : "scale-95 opacity-75"
                    }`}
                    onClick={() => goToSlide(service.realIndex)}
                  >
                    <EnhancedServiceCard
                      service={service}
                      isActive={displayIndex === 0}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Mobile View - Single Card with Enhanced Swipe */}
          <div className="block md:hidden">
            <div className="flex justify-center min-h-[420px]">
              <div className="transition-all duration-500 ease-out">
                <EnhancedServiceCard
                  service={servicesData[currentSlide]}
                  isActive={true}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-30 group disabled:opacity-50"
            aria-label="Service précédent"
          >
            <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-[#E67A17] group-hover:scale-110">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 group-hover:text-white transition-colors"
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
            </div>
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-30 group disabled:opacity-50"
            aria-label="Service suivant"
          >
            <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-[#E67A17] group-hover:scale-110">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 group-hover:text-white transition-colors"
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
          </button>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex justify-center mt-12 gap-3">
          {servicesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 rounded-full hover:scale-125 disabled:opacity-50 ${
                index === currentSlide
                  ? "w-8 h-3 bg-[#E67A17]"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Aller au service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Service Card Component
function EnhancedServiceCard({
  service,
  isActive,
}: {
  service: ServiceCard & {
    position?: number;
    realIndex?: number;
    isActive?: boolean;
  };
  isActive?: boolean;
}) {
  return (
    <div className="group relative">
      {/* Main Card Container with Enhanced Styling */}
      <div
        className={`relative w-[280px] sm:w-[320px] lg:w-[340px] h-[380px] lg:h-[400px] transition-all duration-500 ${
          isActive
            ? "transform hover:scale-105"
            : "hover:scale-105"
        }`}
      >
        {/* Card Background with Enhanced Shadow */}
        <div className="relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <img
            src={service.image}
            alt={`${service.title} ${service.subtitle}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />

          {/* Service-specific Overlays */}
          {service.hasOverlay && (
            <div
              className="absolute inset-0 rounded-3xl transition-opacity duration-300 group-hover:opacity-80"
              style={{ backgroundColor: service.overlayColor }}
            />
          )}

          {/* Smartwatch specific overlays */}
          {service.id === 4 && <></>}

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/20">
              {service.category}
            </span>
          </div>

          {/* Enhanced Content Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            {/* Service Title */}
            <div className="mb-3">
              <h3 className="font-['Poppins'] font-bold text-white text-xl lg:text-2xl leading-tight">
                {service.title}
              </h3>
              <p className="font-['Poppins'] font-medium text-white/90 text-lg lg:text-xl">
                {service.subtitle}
              </p>
            </div>

            {/* Service Description */}
            <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              {service.description}
            </p>

            {/* Action Button */}
            <button className="inline-flex items-center gap-2 bg-[#E67A17] hover:bg-[#d66a0e] text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 hover:scale-105">
              <span>En savoir plus</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-3xl ring-2 ring-[#E67A17]/50 ring-offset-2 ring-offset-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}