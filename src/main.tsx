import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from './App.tsx'
import './index.css'
import { Home } from './pages/Home.tsx';
import { MovieDetails } from './components/movie-details.tsx';
import { SearchMovie } from './components/search-movie.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/*" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="search" element={<SearchMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
