import { BrowserRouter, Route, Routes } from 'react-router';
import Garage from './views/Garage';
import Winners from './views/Winners';
import NotFound from './views/NotFound';
import Header from './components/Header';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mx-auto p-6">
        <Routes>
          <Route index path="/" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
