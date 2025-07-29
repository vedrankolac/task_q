import { useEffect, useState } from 'react';
import type { Product } from './ProductDetailsPage';
import { fetchProducts } from './helpers';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';
import { Search, ShoppingBag } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to load products. Please check your connection and try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage />;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <ShoppingBag className="w-8 h-8 text-blue-600 mr-2" />
                        <h1 className="text-3xl font-bold text-gray-900">Digital Marketplace</h1>
                    </div>
                    <p className="text-gray-600">Discover premium digital products for developers</p>
                </div>

                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 text-sm">
                        Showing {filteredProducts.length} of {products.length} products
                        {searchTerm && ` for "${searchTerm}"`}
                    </p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your search terms</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
