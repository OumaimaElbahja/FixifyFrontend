import { Button } from '../ui/ui/button';
import { Input } from '../ui/ui/input';
import { Badge } from '../ui/ui/badge';
import { Card, CardContent } from '../ui/ui/card';
import { useState, useEffect } from 'react';
// import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  compatibility: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Batterie Samsung Galaxy S21",
    price: "450 MAD",
    originalPrice: "500 MAD",
    image: "https://images.unsplash.com/photo-1609592542418-4ebd26e78ae7?w=400&h=300&fit=crop&crop=center",
    category: "Batteries",
    brand: "Samsung",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    isSale: true,
    discount: 10,
    compatibility: ["Galaxy S21", "Galaxy S21+"]
  },
  {
    id: 2,
    name: "Écran iPhone 13 Pro Max",
    price: "1200 MAD",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
    category: "Écrans",
    brand: "Apple",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isNew: true,
    compatibility: ["iPhone 13 Pro Max"]
  },
  {
    id: 3,
    name: "Batterie MacBook Air M1",
    price: "850 MAD",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center",
    category: "Batteries",
    brand: "Apple",
    rating: 4.7,
    reviews: 45,
    inStock: false,
    compatibility: ["MacBook Air M1 2020", "MacBook Air M1 2021"]
  },
  {
    id: 4,
    name: "Caméra arrière OnePlus 9",
    price: "320 MAD",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center",
    category: "Caméras",
    brand: "OnePlus",
    rating: 4.6,
    reviews: 73,
    inStock: true,
    compatibility: ["OnePlus 9", "OnePlus 9 Pro"]
  },
  {
    id: 5,
    name: "Clavier HP Pavilion 15",
    price: "180 MAD",
    originalPrice: "220 MAD",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&crop=center",
    category: "Accessoires",
    brand: "HP",
    rating: 4.4,
    reviews: 156,
    inStock: true,
    isSale: true,
    discount: 18,
    compatibility: ["HP Pavilion 15-eh", "HP Pavilion 15-cs"]
  },
  {
    id: 6,
    name: "Haut-parleur iPad Pro 11",
    price: "280 MAD",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center",
    category: "Audio",
    brand: "Apple",
    rating: 4.5,
    reviews: 34,
    inStock: true,
    compatibility: ["iPad Pro 11\" 2021", "iPad Pro 11\" 2022"]
  },
  {
    id: 7,
    name: "Port de charge Xiaomi Mi 11",
    price: "95 MAD",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&crop=center",
    category: "Connectiques",
    brand: "Xiaomi",
    rating: 4.3,
    reviews: 92,
    inStock: true,
    compatibility: ["Mi 11", "Mi 11 Pro"]
  },
  {
    id: 8,
    name: "Coque Protection Samsung S22",
    price: "65 MAD",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop&crop=center",
    category: "Accessoires",
    brand: "Samsung",
    rating: 4.1,
    reviews: 203,
    inStock: true,
    isNew: true,
    compatibility: ["Galaxy S22", "Galaxy S22+"]
  }
];

const categories = ["Tout", "Batteries", "Écrans", "Caméras", "Audio", "Connectiques", "Accessoires"];
const brands = ["Tout", "Apple", "Samsung", "OnePlus", "HP", "Xiaomi"];

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [selectedBrand, setSelectedBrand] = useState('Tout');
  const [sortBy, setSortBy] = useState('name');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on search and filters
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tout' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'Tout' || product.brand === selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedBrand, sortBy]);

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
    // Simulate adding to cart with a delay
    setTimeout(() => {
      setCart(prev => prev.filter(id => id !== productId));
    }, 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="marketplace" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-150"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#195ea8] rounded-full"></div>
            <span className="text-[#195ea8] font-medium text-sm">Marketplace</span>
          </div>
          
          <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            Pièces & Accessoires
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de pièces détachées et accessoires de qualité pour tous vos appareils
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-[#195ea8] focus:ring-[#195ea8]/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all ${
                    selectedCategory === category 
                      ? 'bg-[#195ea8] hover:bg-[#164a91] text-white' 
                      : 'text-gray-600 hover:text-[#195ea8] hover:border-[#195ea8]'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Brand Filter */}
            <select
              aria-label="Filtrer par marque"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#195ea8] text-sm"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              aria-label="Trier les produits"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#195ea8] text-sm"
            >
              <option value="name">Par nom</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'Tout' && ` dans ${selectedCategory}`}
            {selectedBrand !== 'Tout' && ` de ${selectedBrand}`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col ${
                !product.inStock ? 'opacity-75' : ''
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0 h-full flex flex-col">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white text-xs">Nouveau</Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-red-500 text-white text-xs">-{product.discount}%</Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="bg-gray-500 text-white text-xs">Rupture</Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                      title="Ajouter aux favoris"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info - Flex grow to fill space */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow space-y-3">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs text-gray-500">
                        {product.brand}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-gray-500">
                        {product.category}
                      </Badge>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-['Poppins'] font-medium text-gray-900 text-sm leading-5 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Compatibility */}
                    <div className="text-xs text-gray-500 min-h-[1rem]">
                      Compatible: {product.compatibility.slice(0, 2).join(', ')}
                      {product.compatibility.length > 2 && '...'}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="font-bold text-lg text-[#1a3151]">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button - Fixed at bottom */}
                  <div className="mt-4 flex-shrink-0">
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock || cart.includes(product.id)}
                      className={`w-full h-10 text-sm font-medium transition-all duration-300 ${
                        product.inStock
                          ? 'bg-[#195ea8] hover:bg-[#164a91] text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {!product.inStock ? 'Rupture de stock' :
                       cart.includes(product.id) ? 'Ajouté ✓' : 'Ajouter au panier'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Tout');
              setSelectedBrand('Tout');
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#195ea8] to-[#1a3151] rounded-3xl p-8 md:p-12 text-white">
          <h3 className="font-['Poppins'] font-bold text-2xl md:text-3xl mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Contactez-nous pour une pièce sur mesure ou explorez notre marketplace complet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#195ea8] hover:bg-gray-100 px-8 py-4 rounded-xl font-medium"
            >
              Demander un devis
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-[rgba(25,94,168,1)] hover:bg-white hover:text-[#195ea8] px-8 py-4 rounded-xl font-medium"
            >
              Visiter le Marketplace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}