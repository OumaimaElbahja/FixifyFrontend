import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/ui/button";
import { Badge } from "../ui/ui/badge";


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const cartRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Batterie Samsung Galaxy S21",
      price: 450,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1609592542418-4ebd26e78ae7?w=80&h=80&fit=crop&crop=center",
      category: "Batteries",
    },
    {
      id: 2,
      name: "Écran iPhone 13 Pro Max",
      price: 1200,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=80&fit=crop&crop=center",
      category: "Écrans",
    },
    {
      id: 3,
      name: "Coque Protection Samsung S22",
      price: 65,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=80&h=80&fit=crop&crop=center",
      category: "Accessoires",
    },
  ]);

  // Calculate totals
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Handle quantity changes
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => item.id !== id),
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  // Handle outside clicks for cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        {
          id: "home",
          element: document.getElementById("home"),
        },
        {
          id: "services",
          element: document.getElementById("services"),
        },
        {
          id: "how-it-works",
          element: document.getElementById("how-it-works"),
        },
        {
          id: "avis",
          element: document.getElementById("avis"),
        },
        {
          id: "marketplace",
          element: document.getElementById("marketplace"),
        },
        {
          id: "blogs",
          element: document.getElementById("blogs"),
        },
        {
          id: "contact",
          element: document.getElementById("contact"),
        },
      ].filter((section) => section.element);

      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement)
            .offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links configuration - ordered to match sections in App.tsx
  const navLinks = [
    { href: "#home", label: "Accueil", id: "home" },
    {
      href: "#services",
      label: "Nos services",
      id: "services",
    },
    {
      href: "#how-it-works",
      label: "Comment ça marche ?",
      id: "how-it-works",
    },
    { href: "#avis", label: "Avis", id: "avis" },
    {
      href: "#marketplace",
      label: "Marketplace",
      id: "marketplace",
    },
    { href: "#blogs", label: "Blogs", id: "blogs" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // Get link classes based on active state
  const getLinkClasses = (linkId: string) => {
    const isActive = activeSection === linkId;
    return `${
      isActive
        ? "text-[#e67a17] font-medium"
        : "text-gray-700 hover:text-[#e67a17]"
    } transition-all duration-200 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white/40 ${
      isActive ? "bg-white/30" : ""
    }`;
  };

  // Handle smooth scrolling for navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      // Get target element by ID
      const targetElement = document.getElementById(
        href.slice(1),
      );

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Glass effect container */}
      <div className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]">
        <div className="w-full">
          <div className="flex flex-row items-center justify-center w-full">
            <div className="box-border flex flex-row gap-2 lg:gap-4 items-center justify-between px-4 md:px-5 py-4 w-full max-w-7xl">
              {/* Logo Section */}
              <div className="flex items-center shrink-0">
                <div className="h-10 relative w-auto flex items-center">
                  {/* Use direct <img src="/public/images/logo_fixify.png" /> for the logo */}
                  <img
                    src="/public/images/logo_fixify.png"
                    alt="Logo Fixify"
                    className="w-[28px] h-[28px] object-cover shrink-0"
                  />
                  <div className="ml-2 font-['Racing_Sans_One'] text-[#0b3e74] text-[20px] sm:text-[28px] leading-[36px] whitespace-nowrap drop-shadow-sm">
                    Fixify
                  </div>
                </div>
              </div>

              {/* Desktop Navigation - Hidden on smaller screens */}
              <div className="hidden xl:flex items-center gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={getLinkClasses(link.id)}
                    onClick={(e) =>
                      handleNavClick(e, link.href)
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Shopping Cart */}
                <div className="relative">
                  <button
                    ref={cartButtonRef}
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative p-2 lg:p-3 text-gray-700 hover:text-[#e67a17] transition-all duration-200 rounded-full hover:bg-white/40 backdrop-blur-sm group"
                  >
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
                      />
                    </svg>
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-[#e67a17] text-white text-xs min-w-[20px] h-5 flex items-center justify-center p-0 border-2 border-white animate-pulse">
                        {totalItems > 99 ? "99+" : totalItems}
                      </Badge>
                    )}
                  </button>

                  {/* Cart Dropdown */}
                  {isCartOpen && (
                    <div
                      ref={cartRef}
                      className="absolute right-0 top-full mt-2 w-[320px] sm:w-[380px] lg:w-[420px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 max-h-[80vh] overflow-hidden"
                    >
                      {/* Cart Header */}
                      <div className="p-4 lg:p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-['Poppins'] font-semibold text-lg lg:text-xl text-[#1a3151]">
                            Panier ({totalItems})
                          </h3>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Fermer le panier"
                            title="Fermer le panier"
                          >
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="max-h-[300px] lg:max-h-[400px] overflow-y-auto custom-scrollbar">
                        {cartItems.length === 0 ? (
                          <div className="p-6 lg:p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
                                />
                              </svg>
                            </div>
                            <p className="text-gray-500 mb-4">
                              Votre panier est vide
                            </p>
                            <Button
                              onClick={() => {
                                setIsCartOpen(false);
                                document
                                  .getElementById("marketplace")
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                              }}
                              className="bg-[#195ea8] hover:bg-[#164a91] text-white"
                            >
                              Découvrir nos produits
                            </Button>
                          </div>
                        ) : (
                          <div className="p-4 lg:p-6 space-y-4">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors"
                              >
                                {/* Product Image */}
                                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-['Poppins'] font-medium text-sm lg:text-base text-[#1a3151] line-clamp-2 mb-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mb-2">
                                    {item.category}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-[#195ea8] text-sm lg:text-base">
                                      {item.price} MAD
                                    </span>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                          )
                                        }
                                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                                        title="Diminuer la quantité"
                                        aria-label="Diminuer la quantité"
                                      >
                                        <svg
                                          className="w-3 h-3 lg:w-4 lg:h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 12H4"
                                          />
                                        </svg>
                                      </button>
                                      <span className="w-6 lg:w-8 text-center font-medium text-sm lg:text-base">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                          )
                                        }
                                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                                        title="Augmenter la quantité"
                                        aria-label="Augmenter la quantité"
                                      >
                                        <svg
                                          className="w-3 h-3 lg:w-4 lg:h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Cart Footer */}
                      {cartItems.length > 0 && (
                        <div className="p-4 lg:p-6 border-t border-gray-100 bg-white/80">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-['Poppins'] font-semibold text-lg text-[#1a3151]">
                              Total:
                            </span>
                            <span className="font-['Poppins'] font-bold text-xl text-[#195ea8]">
                              {totalPrice.toLocaleString()} MAD
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setIsCartOpen(false)
                              }
                              className="flex-1 border-[#195ea8] text-[#195ea8] hover:bg-[#195ea8]/10"
                            >
                              Continuer les achats
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-[#195ea8] hover:bg-[#164a91] text-white"
                            >
                              Commander
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex items-center gap-3 shrink-0">
                  <button className="relative backdrop-blur-sm bg-white/60 h-10 w-[100px] xl:w-[114px] rounded-full border border-white/30 hover:bg-white/80 transition-all duration-200 shadow-[0_4px_16px_0_rgba(31,38,135,0.08)] hover:shadow-[0_8px_24px_0_rgba(31,38,135,0.12)]">
                    <span className="font-['Poppins'] text-[14px] xl:text-[16px] text-gray-700 leading-normal font-medium">
                      Connexion
                    </span>
                  </button>

                  <button className="relative bg-gradient-to-r from-[#e67a17] to-[#d66a0e] h-10 w-[140px] xl:w-[185px] rounded-full hover:from-[#d66a0e] hover:to-[#c55a08] transition-all duration-200 shadow-[0_4px_16px_0_rgba(230,122,23,0.3)] hover:shadow-[0_8px_24px_0_rgba(230,122,23,0.4)] backdrop-blur-sm">
                    <span className="font-['Poppins'] text-[14px] xl:text-[16px] text-white leading-normal font-medium">
                      Créer un compte
                    </span>
                  </button>
                </div>

                {/* Mobile menu button */}
                <button
                  className="xl:hidden p-2 text-gray-700 hover:text-[#e67a17] transition-all duration-200 rounded-full hover:bg-white/40 backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  title={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="xl:hidden backdrop-blur-md bg-white/85 border-t border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2 font-['Poppins'] text-[16px]">
                  {navLinks.map((link) => (
                    <a
                      key={`mobile-${link.id}`}
                      href={link.href}
                      className={`${
                        activeSection === link.id
                          ? "text-[#e67a17] font-medium bg-white/50"
                          : "text-gray-700 hover:text-[#e67a17]"
                      } transition-all duration-200 py-3 px-4 rounded-xl hover:bg-white/50 backdrop-blur-sm`}
                      onClick={(e) => {
                        setIsMenuOpen(false);
                        handleNavClick(e, link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                  <button className="w-full backdrop-blur-sm bg-white/60 h-10 rounded-full border border-white/30 hover:bg-white/80 transition-all duration-200 shadow-[0_4px_16px_0_rgba(31,38,135,0.08)]">
                    <span className="font-['Poppins'] text-[16px] text-gray-700 leading-normal font-medium">
                      Connexion
                    </span>
                  </button>

                  <button className="w-full bg-gradient-to-r from-[#e67a17] to-[#d66a0e] h-10 rounded-full hover:from-[#d66a0e] hover:to-[#c55a08] transition-all duration-200 shadow-[0_4px_16px_0_rgba(230,122,23,0.3)]">
                    <span className="font-['Poppins'] text-[16px] text-white leading-normal font-medium">
                      Créer un compte
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}