import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from './helpers';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';
import { ArrowLeft } from 'lucide-react';
import { StarRating } from './StarRating';
import { Cart } from './Cart';

export interface Product {
    id: number;
    name: string;
    price: number;
    shortDescription: string;
    longDescription: string;
    thumbnailUrl: string;
    category: string;
    reviews: Review[];
}

export interface Review {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItemNumber, setCartItemNumber] = useState<number>(0);

    const productId = id ? parseInt(id) : null;

    const loadProduct = async () => {
        if (!productId) {
            setError('Invalid product ID');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await fetchProduct(productId);
            if (!data) {
                setError('Product not found. It may have been removed or the ID is incorrect.');
            } else {
                setProduct(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load product details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProduct();
    }, [productId]);

    const handleBackClick = () => {
        navigate('/task_q/');
    };

    const addToCartBE = ({ productId }: { productId: string }) => {
        console.log('API call to BE done', productId);
    };

    const handleAddToCartClick = () => {
        if (id) {
            setCartItemNumber(cartItemNumber + 1);
            addToCartBE({ productId: id });
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage />;
    if (!product) return <ErrorMessage />;

    const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Cart cartItemNumber={cartItemNumber} />
                <button
                    onClick={handleBackClick}
                    className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Products
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        <div className="space-y-4">
                            <img
                                src={product.thumbnailUrl}
                                alt={product.name}
                                className="w-full h-64 lg:h-80 object-cover rounded-lg"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop';
                                }}
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-2">
                                    {product.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <p className="text-gray-600 text-lg">{product.shortDescription}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                                <div className="flex items-center space-x-2">
                                    <StarRating rating={Math.round(averageRating)} size="md" />
                                    <span className="text-lg text-gray-600">
                                        {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                            </div>

                            <button
                                onClick={handleAddToCartClick}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Customer Reviews ({product.reviews.length})
                        </h3>
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {review.userName.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                                                <div className="flex items-center space-x-2">
                                                    <StarRating rating={review.rating} />
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 ml-13">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
