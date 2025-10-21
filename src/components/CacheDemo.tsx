import { useState } from "react";
import { useProductsByCategory } from "../hooks/useProducts";

const CacheDemo = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const { products, isLoading, isValidating, isFromCache, error } = useProductsByCategory(selectedCategoryId);

    const categories = [
        { id: 117, name: "Eco Friendly" },
        { id: 112, name: "Office and stationary" },
        { id: 113, name: "Technology and accessories" },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">SWR Caching Demo</h2>

            {/* Status Display */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Current Status:</h3>
                <div className="space-y-1 text-sm">
                    <div>Selected Category: {selectedCategoryId ? categories.find(c => c.id === selectedCategoryId)?.name : "None"}</div>
                    <div>Loading: {isLoading ? "✅" : "❌"}</div>
                    <div>Validating: {isValidating ? "✅" : "❌"}</div>
                    <div>From Cache: {isFromCache ? "✅" : "❌"}</div>
                    <div>Products Count: {products.length}</div>
                </div>
            </div>

            {/* Category Buttons */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Click categories to test caching:</h3>
                <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategoryId(category.id)}
                            className={`px-4 py-2 rounded-md border ${selectedCategoryId === category.id
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                    <button
                        onClick={() => setSelectedCategoryId(null)}
                        className="px-4 py-2 rounded-md border bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                    >
                        Clear Selection
                    </button>
                </div>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">How to test caching:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Click "Eco Friendly" - you'll see "Loading: ✅" (API call)</li>
                    <li>Click "Office and stationary" - you'll see "Loading: ✅" (API call)</li>
                    <li>Click "Eco Friendly" again - you'll see "From Cache: ✅" (NO API call!)</li>
                    <li>Data loads instantly from cache</li>
                </ol>
            </div>

            {/* Products Display */}
            {selectedCategoryId && (
                <div>
                    <h3 className="font-semibold mb-2">Products:</h3>
                    {error ? (
                        <div className="text-red-600">Error: {error.message}</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.slice(0, 8).map((product) => (
                                <div key={product.id} className="border rounded-lg p-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-24 object-cover rounded mb-2"
                                    />
                                    <h4 className="text-sm font-medium line-clamp-2" title={product.name}>
                                        {product.name}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CacheDemo;
