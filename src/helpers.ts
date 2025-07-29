import type { Product } from './ProductDetailsPage';

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products: Product[] = await response.json();
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        throw new Error('Failed to load products');
    }
};

export const fetchProduct = async (id: number): Promise<Product | null> => {
    try {
        const products = await fetchProducts();
        const product = products.find((p) => p.id === id);
        return product || null;
    } catch (error) {
        console.error('Error loading product:', error);
        throw new Error('Failed to load product');
    }
};
