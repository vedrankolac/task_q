import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ErrorMessage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Something went wrong</h2>
            <Link
                to="/task_q/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
            </Link>
        </div>
    </div>
);
