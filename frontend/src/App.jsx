import react from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiStageForm from './components/MultiStageForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<MultiStageForm />} />
               
            </Routes>
        </Router>
    );
};

export default App;