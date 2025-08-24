"use client";
import React, { useState, useEffect } from 'react';
import useMovieFetch, { Movie } from '../hooks/useFetchmovies';
import Footer from '../sharedcomponent/Footer';
import NavBar from '../sharedcomponent/NavBar';

const HomePage: React.FC = () => {
  const { latestMovies, latestSeries, searchResults, loading, error, searchMovies } = useMovieFetch();
  const [currentIndex, setCurrentIndex] = useState(0);
 const [favorites, setFavorites] = useState<Movie[]>([]);
useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }
}, []);
  const [showFavorites, setShowFavorites] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === Math.min(latestMovies.length, 5) - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [latestMovies]);

  const handleFavorite = async (movie: Movie) => {
    const updated = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie, action: favorites.some((fav) => fav.id === movie.id) ? 'remove' : 'add' }),
      });
    } catch (err) {
      console.error('Failed to update favorites:', err);
    }
  };

  const handleSearch = (query: string) => {
    searchMovies(query);
  };

  const sortedMovies = [...latestMovies].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  const sortedSeries = [...latestSeries].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

 
  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{new Date(item.release_date).getFullYear()}</p>
                    <button
                      onClick={() => handleFavorite(item)}
                      className={`mt-2 px-4 py-1 rounded ${
                        favorites.some((fav) => fav.id === item.id)
                          ? 'bg-yellow-500 text-black'
                          : 'border border-white text-white'
                      } hover:bg-yellow-600`}
                    >
                      {favorites.some((fav) => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-screen relative overflow-hidden">
              {latestMovies.slice(0, 5).map((movie, index) => (
                <div
                  key={movie.id}
                  className={`w-full h-full bg-cover bg-center absolute top-0 left-0 transition-opacity duration-1000 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                  }}
                >
                  <div className="bg-gradient-to-r from-black/80 to-black/30 h-full w-full flex flex-col justify-center px-10">
                    <div className="text-white mb-2 space-x-4">
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
                    <p className="text-white max-w-xl mb-6">{movie.overview}</p>
                    <div className="flex space-x-4">
                      <button className="bg-yellow-500 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-600">
                        Watch Now
                      </button>
                      <button
                        onClick={() => handleFavorite(movie)}
                        className={`border border-white px-6 py-2 font-semibold rounded hover:bg-white hover:text-black ${
                          favorites.some((fav) => fav.id === movie.id) ? 'bg-yellow-500 text-black' : 'text-white'
                        }`}
                      >
                        {favorites.some((fav) => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {latestMovies.slice(0, 5).map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                      idx === currentIndex ? 'bg-yellow-500' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="mb-6 bg-yellow-500 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-600"
              >
                {showFavorites ? 'Show Latest' : 'Show Favorites'}
              </button>

              {showFavorites ? (
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-white">Your Favorites</h2>
                  {favorites.length === 0 ? (
                    <p className="text-white">No favorites added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {favorites.map((item) => (
                        <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-white font-semibold">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{new Date(item.release_date).getFullYear()}</p>
                            <button
                              onClick={() => handleFavorite(item)}
                              className="mt-2 bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-600"
                            >
                              Remove from Favorites
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-4 text-white">Latest Movies</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {sortedMovies.map((movie) => (
                      <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-white font-semibold">{movie.title}</h3>
                          <p className="text-gray-400 text-sm">{new Date(movie.release_date).getFullYear()}</p>
                          <button
                            onClick={() => handleFavorite(movie)}
                            className={`mt-2 px-4 py-1 rounded ${
                              favorites.some((fav) => fav.id === movie.id)
                                ? 'bg-yellow-500 text-black'
                                : 'border border-white text-white'
                            } hover:bg-yellow-600`}
                          >
                            {favorites.some((fav) => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-white">Latest Series</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedSeries.map((series) => (
                      <div key={series.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                          alt={series.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-white font-semibold">{series.title}</h3>
                          <p className="text-gray-400 text-sm">{new Date(series.release_date).getFullYear()}</p>
                          <button
                            onClick={() => handleFavorite(series)}
                            className={`mt-2 px-4 py-1 rounded ${
                              favorites.some((fav) => fav.id === series.id)
                                ? 'bg-yellow-500 text-black'
                                : 'border border-white text-white'
                            } hover:bg-yellow-600`}
                          >
                            {favorites.some((fav) => fav.id === series.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};



export default HomePage;