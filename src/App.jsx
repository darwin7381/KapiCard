import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CompareProvider } from './context/CompareContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import BrowseCards from './pages/BrowseCards';
import Compare from './pages/Compare';
import CardDetail from './pages/CardDetail';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <HelmetProvider>
      <CompareProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cards" element={<BrowseCards />} />
              <Route path="cards/:id" element={<CardDetail />} />
              <Route path="compare" element={<Compare />} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/:id" element={<BlogPost />} />
            </Route>
          </Routes>
        </Router>
      </CompareProvider>
    </HelmetProvider>
  );
}

export default App;
