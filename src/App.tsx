import { BrowserRouter, Link, Route, Routes } from 'react-router';
import Garage from './views/Garage';
import Winners from './views/Winners';
import NotFound from './views/NotFound';
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Garage</Link>
        <Link to="/winners">Winners</Link>
      </nav>
      <Routes>
        <Route index path="/" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
