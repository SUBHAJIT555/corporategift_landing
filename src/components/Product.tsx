import { useState } from "react";
import { useNavigate } from "react-router";
import { products, categories, type Product as ProductType } from "../data";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-primary" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const handleAddToQuote = (product: ProductType) => {
    navigate("/quote", { state: { product } });
  };

  return (
    <div
      className="w-full px-3 sm:px-5 md:px-15 pb-6 sm:pb-10 md:pb-15"
      id="products"
    >
      {/* heading  */}
      <div>
        <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight text-text-primary mb-3 sm:mb-4 md:mb-6">
          Our Most Popular Products
        </h3>

        <div className="hidden lg:flex justify-start gap-3 mt-4 sm:mt-6 md:mt-8">
          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 text-sm whitespace-nowrap rounded-md border ${
                category === selectedCategory
                  ? "bg-primary text-white border-primary"
                  : "border-text-primary/30 hover:bg-primary hover:text-white hover:border-primary"
              } transition-all duration-300`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Category Filter */}
        <div className="lg:hidden mt-4 sm:mt-6 md:mt-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* items grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm  overflow-hidden  transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-2 sm:p-3 md:p-4">
                <h4 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                  {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1 sm:mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Add to Quote Button */}
                <button
                  onClick={() => handleAddToQuote(product)}
                  className="w-full mt-2 sm:mt-3 bg-primary text-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Add to Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
