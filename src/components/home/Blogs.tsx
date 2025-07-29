import { Button } from "../ui/ui/button";
import { useState, useEffect } from "react";

const blogs = [
  {
    id: 1,
    title:
      "5 astuces pour prolonger la durée de vie de votre batterie",
    date: "15/07/2025",
    image: "/public/images/ordinateur.png",
    excerpt:
      "Découvrez nos conseils d'experts pour optimiser l'autonomie de vos appareils électroniques.",
  },
  {
    id: 2,
    title:
      "Maintenance préventive pour votre ordinateur portable",
    date: "08/07/2025",
    image: "/public/images/laptop.png",
    excerpt:
      "Guide complet pour maintenir votre laptop en parfait état de fonctionnement.",
  },
  {
    id: 3,
    title: "Comment protéger l'écran de votre smartphone",
    date: "12/07/2025",
    image: "/public/images/ecran.png",
    excerpt:
      "Les meilleures méthodes pour éviter les rayures et les fissures sur votre écran.",
  },
  {
    id: 4,
    title:
      "Guide complet pour nettoyer vos appareils électroniques",
    date: "05/07/2025",
    image: "/public/images/blogs1.png",
    excerpt:
      "Techniques professionnelles pour un nettoyage sûr et efficace de vos équipements.",
  },
  {
    id: 5,
    title: "Réparation vs Remplacement: Comment choisir?",
    date: "28/06/2025",
    image: "/public/images/pieces_detaches.png",
    excerpt:
      "Analyser les coûts et bénéfices pour prendre la meilleure décision économique.",
  },
  {
    id: 6,
    title: "Tendances technologiques 2025: Ce qui vous attend",
    date: "22/06/2025",
    image: "/public/images/tablette.png",
    excerpt:
      "Aperçu des innovations qui révolutionneront le monde de la réparation électronique.",
  },
];

export function Blogs() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle item
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev: number) => (prev - 1 + blogs.length) % blogs.length,
    );
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev: number) => (prev + 1) % blogs.length);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const getItemPosition = (index: number) => {
    const diff = index - currentIndex;
    const totalItems = blogs.length;

    // Normalize diff to be between -totalItems/2 and totalItems/2
    let normalizedDiff = diff;
    if (normalizedDiff > totalItems / 2) {
      normalizedDiff -= totalItems;
    } else if (normalizedDiff < -totalItems / 2) {
      normalizedDiff += totalItems;
    }

    return normalizedDiff;
  };

  const getItemStyle = (index: number) => {
    const position = getItemPosition(index);
    const isCenter = position === 0;
    const absPosition = Math.abs(position);

    // Calculate transforms based on position
    let scale, translateX, rotateY, zIndex, opacity;

    if (isCenter) {
      scale = 1;
      translateX = 0;
      rotateY = 0;
      zIndex = 10;
      opacity = 1;
    } else if (absPosition === 1) {
      scale = 0.85;
      translateX = position * 280;
      rotateY = position * -25;
      zIndex = 5;
      opacity = 0.8;
    } else if (absPosition === 2) {
      scale = 0.7;
      translateX = position * 380;
      rotateY = position * -35;
      zIndex = 2;
      opacity = 0.6;
    } else {
      scale = 0.6;
      translateX = position * 450;
      rotateY = position * -45;
      zIndex = 1;
      opacity = 0.3;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      transition:
        "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };
  };

  return (
    <section  id="blogs" className="py-16 md:py-24 bg-[#e8ecf1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#e67a17] font-medium text-lg mb-2">
            Restez à jour
          </div>
          <h2 className="font-['Poppins'] font-bold text-gray-900 mb-4 text-[36px] leading-tight">
            Nos Blogs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos derniers articles et conseils
            d'experts pour maintenir vos appareils en parfait
            état
          </p>
        </div>

        {/* Coverflow Container */}
        <div className="relative h-[480px] flex items-center justify-center">
          <div
            className="relative w-full h-full flex items-center justify-center blogs-perspective"
          >
            {blogs.map((blog, index) => {
              const style = getItemStyle(index);
              const isCenter = getItemPosition(index) === 0;

              return (
                <div
                  key={blog.id}
                  className="absolute cursor-pointer"
                  style={style}
                  onClick={() => handleDotClick(index)}
                >
                  <article
                    className={`group relative h-[400px] w-[300px] ${isCenter ? "hover:scale-105" : ""} transition-transform duration-300`}
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl bg-white">
                      {/* Background Image */}
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-[#e67a17] text-white text-xs rounded-full">
                            {blog.date}
                          </span>
                        </div>

                        <h3
                          className={`font-semibold mb-3 leading-tight ${isCenter ? "text-lg" : "text-base"}`}
                        >
                          {blog.title}
                        </h3>

                        {isCenter && (
                          <>
                            <p className="text-sm mb-4 opacity-90 line-clamp-2">
                              {blog.excerpt}
                            </p>

                            <Button
                              size="sm"
                              className="bg-[#e67a17] hover:bg-[#d66a0e] text-white"
                            >
                              Lire l'article
                            </Button>
                          </>
                        )}
                      </div>

                      {/* Center item indicator */}
                      {isCenter && (
                        <div className="absolute top-4 right-4 w-3 h-3 bg-[#e67a17] rounded-full animate-pulse" />
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200 group backdrop-blur"
            aria-label="Article précédent"
            title="Article précédent"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform"
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
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200 group backdrop-blur"
            aria-label="Article suivant"
            title="Article suivant"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform"
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

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {blogs.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#e67a17] scale-125"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              aria-label={`Aller à l'article ${index + 1}`}
              title={`Aller à l'article ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-[#e67a17] text-[#e67a17] hover:bg-[#e67a17] hover:text-white"
          >
            Voir tous les articles
          </Button>
        </div>
      </div>
    </section>
  );
}