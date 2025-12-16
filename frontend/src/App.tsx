import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Softwise';
import { ProjectDetails } from './components/project-details';

export default function App() {
  return (
    <div className='font-sans'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          
          <Route path="/work/:id" element={<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}