import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
    <div className="flex flex-col items-center justify-center min-h-64 text-center p-8">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Try Again
            </button>
        )}
    </div>
);
