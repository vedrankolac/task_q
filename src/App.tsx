import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { NotFound } from './NotFound';
import { ProductDetailsPage } from './ProductDetailsPage';
import { ProductListPage } from './ProductListPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/task_q/" element={<ProductListPage />} />
                <Route path="/task_q/product/:id" element={<ProductDetailsPage />} />
                <Route path="/task_q/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
