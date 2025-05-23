// Al inicio de tu archivo, agrega:
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

// Mock data - datos inventados realista
// Función para obtener datos de la API de CruiseBound
async function fetchCruiseBoundSailings() {
  const response = await fetch('https://sandbox.cruisebound-qa.com/sailings');
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  const data = await response.json();
  console.log('Estructura de datos de la API:', data);
  return data;
}

// Función para transformar los datos de la API CruiseBound al formato que necesitas
function transformCruiseBoundData(apiResponse) {
  console.log('Datos recibidos:', apiResponse);
  
  // La API podría devolver los datos en diferentes estructuras
  let sailingsArray;
  
  if (Array.isArray(apiResponse)) {
    sailingsArray = apiResponse;
  } else if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
    sailingsArray = apiResponse.data;
  } else if (apiResponse && apiResponse.sailings && Array.isArray(apiResponse.sailings)) {
    sailingsArray = apiResponse.sailings;
  } else if (apiResponse && apiResponse.results && Array.isArray(apiResponse.results)) {
    sailingsArray = apiResponse.results;
  } else {
    console.error('Estructura de datos no reconocida:', apiResponse);
    throw new Error('Estructura de datos de API no válida. Estructura recibida: ' + typeof apiResponse);
  }
  
  return sailingsArray.map((sailing, index) => ({
    id: sailing.id || index + 1,
    ship_name: sailing.ship?.name || 'Nombre no disponible',
    cruise_line: sailing.ship?.line?.name || 'Línea no disponible',
    duration: sailing.duration || 7,
    departure_date: sailing.departureDate || new Date().toISOString().split('T')[0],
    return_date: sailing.returnDate || new Date().toISOString().split('T')[0],
    departure_port: sailing.itinerary[0] || 'Puerto no especificado',
    arrival_port: sailing.arrival_port || sailing.departure_port || 'Puerto no especificado',
    price: sailing.price || 0,
    ship_image: sailing.ship?.image || 'https://images.unsplash.com/photo-1554254648-2d58a1bc3fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3J1Y2Vyb3N8ZW58MHx8MHx8fDA%3D',
    ports: sailing.ports || sailing.itinerary || [],
    // Datos adicionales que podrías necesitar
    cruise_name: sailing.name || '',
    ship_rating: sailing.ship?.rating || 0,
    ship_reviews: sailing.ship?.reviews || 0,
    cruise_line_logo: sailing.ship?.line?.logo || '',
    rating: sailing.ship?.rating || 5

  }));
}

// Función principal para obtener y usar los datos
async function getSailings() {
  const apiData = await fetchCruiseBoundSailings();
  const transformedData = transformCruiseBoundData(apiData);
  return transformedData;
}

// Ejemplo de uso
async function initializeCruiseData() {
  const sailings = await getSailings();
  console.log('Datos de cruceros cargados desde CruiseBound:', sailings);
  return sailings;
}

// Variable para almacenar los datos
let sailings = [];

// Cargar datos de la API
getSailings().then(apiSailings => {
  sailings = apiSailings;
  console.log('Datos cargados exitosamente:', sailings.length, 'cruceros encontrados');
}).catch(error => {
  console.error('Error al cargar datos de cruceros:', error);
});

// Exportar para usar en otros archivos
export { getSailings, initializeCruiseData, sailings };

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow">
            Discover Your Perfect Cruise
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore the world's most beautiful destinations with our carefully curated cruise experiences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200">500+</div>
              <div className="text-blue-100">Cruise Options</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200">200+</div>
              <div className="text-blue-100">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200">50+</div>
              <div className="text-blue-100">Cruise Lines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Price Info Section
const PriceInfoSection = () => {
  return (
    <div className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cruise Pricing & Booking Information
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our prices include accommodation, meals, entertainment, and access to ship amenities. 
            Find the perfect cruise for your budget and travel dates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="price-card">
            <div className="text-blue-600 text-2xl font-bold mb-2">6-Day</div>
            <div className="text-gray-700 mb-2">Caribbean Cruises</div>
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="text-xl font-bold text-blue-600">$149</div>
          </div>
          <div className="price-card">
            <div className="text-blue-600 text-2xl font-bold mb-2">10-Day</div>
            <div className="text-gray-700 mb-2">Mediterranean</div>
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="text-xl font-bold text-blue-600">$449</div>
          </div>
          <div className="price-card">
            <div className="text-blue-600 text-2xl font-bold mb-2">14-Day</div>
            <div className="text-gray-700 mb-2">Alaska Adventure</div>
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="text-xl font-bold text-blue-600">$1,179</div>
          </div>
          <div className="price-card">
            <div className="text-blue-600 text-2xl font-bold mb-2">21-Day</div>
            <div className="text-gray-700 mb-2">World Cruise</div>
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="text-xl font-bold text-blue-600">$4499</div>
          </div>
        </div>
        
        <div className="mt-10 bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included in Your Cruise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-700">All meals and snacks</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Entertainment shows</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Pool and fitness access</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Kids clubs and activities</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-700">24/7 room service</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Port taxes and fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced SearchResultCard Component
const SearchResultCard = ({ sailing }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDurationText = (duration) => {
    return `${duration} ${duration === 1 ? 'Night' : 'Nights'}`;
  };

  return (
    <div className="cruise-card">
      <div className="md:flex">
        {/* CONTENIDO PRIMERO - A LA IZQUIERDA */}
        <div className="md:w-2/3 p-8">
          <div className="flex flex-col md:flex-row md:justify-between h-full">
            {/* Left Content */}
            <div className="flex-1 mb-6 md:mb-0 md:pr-6">
              <div className="flex items-center mb-3">
                <h3 className="text-2xl font-bold text-gray-900 mr-3">
                  {sailing.ship_name}
                </h3>
                <div className="flex text-yellow-400">
                   ★ {sailing.rating}, {sailing.ship_reviews} reviews
                </div>
              </div>
              
              <p className="text-blue-600 font-semibold text-lg mb-4">
                {sailing.cruise_line}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="info-item">
                  <div className="info-icon">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-semibold text-gray-900">{formatDate(sailing.departure_date)}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-semibold text-gray-900">{sailing.departure_port}</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Itinerary */}
              {sailing.ports && sailing.ports.length > 0 && (
                <div className="ports-container">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Visiting Ports:</p>
                  <div className="flex flex-wrap gap-2">
                    {sailing.ports.slice(0, 4).map((port, index) => (
                      <span key={index} className="port-tag">
                        {port}
                      </span>
                    ))}
                    {sailing.ports.length > 4 && (
                      <span className="port-tag-more">
                        +{sailing.ports.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Right Content - Price */}
            <div className="md:text-right">
              <div className="price-container">
                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-blue-600 mb-1">
                  ${sailing.price?.toLocaleString() || 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mb-4">per person</p>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-green-600 font-medium">✓ All meals included</p>
                  <p className="text-xs text-green-600 font-medium">✓ Entertainment shows</p>
                  <p className="text-xs text-green-600 font-medium">✓ Pool & fitness access</p>
                </div>
                
                <button className="btn-primary-full">
                  View Details & Book
                </button>
                <button className="btn-secondary-full">
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* IMAGEN AL FINAL - A LA DERECHA */}
        <div className="md:w-1/3 relative">
          <img 
            src={sailing.ship_image || "/api/placeholder/400/300"} 
            alt={sailing.ship_name}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="duration-badge">
            {getDurationText(sailing.duration)}
          </div>
          {sailing.price && sailing.price < 800 && (
            <div className="deal-badge">
              Great Deal!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="text-sm text-gray-700 mb-4 sm:mb-0">
        Showing page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-number ${
              currentPage === page ? 'active' : ''
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function SearchResults() {
  const [sailings, setSailings] = useState([]);
  const [filteredSailings, setFilteredSailings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const ITEMS_PER_PAGE = 10;

 useEffect(() => {
  const loadApiData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getSailings();
      setSailings(data);
      setFilteredSailings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error cargando datos de la API:', err);
      setError(`Error al cargar cruceros: ${err.message}`);
      setLoading(false);
    }
  };

  loadApiData();
}, []);
  // Sort function
  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newOrder);
    
    const sorted = Array.isArray(filteredSailings) ? [...filteredSailings].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      if (field === 'departure_date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (newOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }) : [];
    
    setFilteredSailings(sorted);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil((filteredSailings?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSailings = Array.isArray(filteredSailings) ? filteredSailings.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-gray-700 text-lg">Loading amazing cruise deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-6">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Cruisebound - Find Your Perfect Cruise Adventure</title>
        <meta name="description" content="Discover amazing cruise deals with all-inclusive packages. Book your dream vacation with the world's best cruise lines." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Header */}
        <header className="header-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600 mr-2">🚢</div>
                <h1 className="text-3xl font-bold text-gray-900">Cruisebound</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="nav-link">Cruises</a>
                <a href="#" className="nav-link">Destinations</a>
                <a href="#" className="nav-link">Deals</a>
                <button className="btn-primary">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <HeroSection />

        {/* Price Info Section */}
        <PriceInfoSection />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Results Header */}
          <div className="mb-8">
            <div className="results-header">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="mb-4 lg:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Available Cruises
                  </h2>
                  <p className="text-gray-600">
                    {filteredSailings?.length || 0} cruise{(filteredSailings?.length || 0) !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                {/* Enhanced Sort Controls */}
                <div className="flex flex-wrap gap-3">
                  <div className="text-sm text-gray-600 mr-2 flex items-center">Sort by:</div>
                  <button
                    onClick={() => handleSort('price')}
                    className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                  >
                    Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSort('departure_date')}
                    className={`sort-btn ${sortBy === 'departure_date' ? 'active' : ''}`}
                  >
                    Date {sortBy === 'departure_date' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSort('duration')}
                    className={`sort-btn ${sortBy === 'duration' ? 'active' : ''}`}
                  >
                    Duration {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-8">
            {currentSailings.map((sailing, index) => (
              <SearchResultCard key={`${sailing.id || index}`} sailing={sailing} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* No Results */}
          {(!filteredSailings || filteredSailings.length === 0) && (
            <div className="no-results">
              <div className="text-6xl mb-4">🏝️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No cruises found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search criteria or check back later for new deals.</p>
            </div>
          )}
        </main>

        {/* Enhanced Footer */}
        <footer className="footer-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-2">🚢</div>
                  <h3 className="text-xl font-bold">Cruisebound</h3>
                </div>
                <p className="text-gray-400">Your gateway to unforgettable cruise experiences around the world.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="footer-link">Find Cruises</a></li>
                  <li><a href="#" className="footer-link">Destinations</a></li>
                  <li><a href="#" className="footer-link">Deals</a></li>
                  <li><a href="#" className="footer-link">About Us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="footer-link">Contact Us</a></li>
                  <li><a href="#" className="footer-link">FAQ</a></li>
                  <li><a href="#" className="footer-link">Booking Help</a></li>
                  <li><a href="#" className="footer-link">Travel Insurance</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="footer-link">Facebook</a>
                  <a href="#" className="footer-link">Twitter</a>
                  <a href="#" className="footer-link">Instagram</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Cruisebound. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}