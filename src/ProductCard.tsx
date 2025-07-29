import { useNavigate } from 'react-router-dom';
import type { Product } from './ProductDetailsPage';
import { StarRating } from './StarRating';

export const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={handleClick}
        >
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                            'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop';
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center space-x-1">
                        <StarRating rating={Math.round(averageRating)} />
                        <span className="text-sm text-gray-500">({product.reviews.length})</span>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>
            </div>
        </div>
    );
};
