mport { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useRandomProducts, useCategories, useProductsByCategory } from "../hooks/useProducts";
import { type ApiProduct } from "../services/productService";
import Loader from "./Loader";

const ProductWithSWR = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const navigate = useNavigate();

    // SWR hooks with caching
    const { products: randomProducts, isLoading: isLoadingRandom, error: randomError } = useRandomProducts();
    const { categories: apiCategories, isLoading: isLoadingCategories, error: categoryError } = useCategories();

    console.log("apiCategories", apiCategories);
    const {
        products: categoryProducts,
        isLoading: isLoadingCategory,
        isValidating: isValidatingCategory,
        isFromCache,
        error: categoryProductsError
    } = useProductsByCategory(selectedCategoryId);

    // Get available categories (API first, fallback to empty)
    const availableCategories = useMemo(() => {
        if (apiCategories && apiCategories.length > 0) {
            return ["All", ...apiCategories.map(cat => cat.name)];
        }
        return ["All"];
    }, [apiCategories]);

    // Get current products based on selection
    const currentProducts = useMemo(() => {
        if (selectedCategory === "All") {
            return randomProducts;
        }
        return categoryProducts;
    }, [selectedCategory, randomProducts, categoryProducts]);

    // Loading state
    const isLoading = selectedCategory === "All" ? isLoadingRandom : isLoadingCategory;

    // Error state
    const error = selectedCategory === "All" ? randomError : categoryProductsError;

    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategory(categoryName);
        if (categoryName === "All") {
            setSelectedCategoryId(null);
        } else if (apiCategories) {
            const category = apiCategories.find(cat => cat.name === categoryName);
            setSelectedCategoryId(category?.id ?? null);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-sm ${index < rating ? "text-primary" : "text-gray-300"
                    }`}
            >
                ★
            </span>
        ));
    };

    const handleAddToQuote = (product: ApiProduct) => {
        navigate("/quote", { state: { product } });
    };

    return (
        <div
            className="w-full px-3 sm:px-5 md:px-15 pb-6 sm:pb-10 md:pb-15"
            id="products"
        >
            {/* heading  */}
            <div>
                <h3 className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-tight text-text-primary mb-3 sm:mb-4 md:mb-6 underline decoration-[0.5px] underline-offset-8">
                    Popular Corporate Gifts We Offer
                    {selectedCategory !== "All" && (
                        <span className="text-sm font-normal text-gray-500 ml-2">
                            {isFromCache ? "📦 (Cached)" : isValidatingCategory ? "🔄 (Loading...)" : ""}
                        </span>
                    )}
                </h3>

                {/* Category buttons */}
                <div className="flex overflow-x-auto gap-3 mt-4 sm:mt-6 md:mt-8 scrollbar-none">
                    {isLoadingCategories ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            Loading categories...
                        </div>
                    ) : categoryError ? (
                        <div className="text-sm text-red-600">Failed to load categories</div>
                    ) : (
                        availableCategories.map((category: string) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={`flex-shrink-0 px-2.5 py-2 text-xs whitespace-nowrap rounded-md border ${category === selectedCategory
                                    ? "bg-primary text-white border-primary"
                                    : "border-text-primary/30 hover:bg-primary hover:text-white hover:border-primary"
                                    } transition-all duration-300`}
                            >
                                {category}
                            </button>
                        ))
                    )}
                </div>

                {/* Mobile Category Filter */}
                <div className="lg:hidden mt-4 sm:mt-6 md:mt-8">
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm"
                    >
                        {availableCategories.map((category: string) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* items grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="mt-6 text-center text-sm text-red-600">Failed to load products</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
                        {currentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300"
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
                                    <h4
                                        className="font-medium text-xs sm:text-sm md:text-base text-gray-900 mb-1 sm:mb-2 line-clamp-1"
                                        title={product.name}
                                    >
                                        {product.name}
                                    </h4>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-1 sm:mb-2">
                                        <div className="flex">{renderStars(product.rating ?? 5)}</div>
                                        <span className="text-xs text-gray-500">
                                            ({product.reviewCount ?? 0})
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
                )}
            </div>
        </div>
    );
};

export default ProductWithSWR;
