import React from 'react';

const Navigation = ({ activeView, setActiveView }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeView === 'dashboard'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-600 hover:text-amber-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('buys')}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeView === 'buys'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-600 hover:text-amber-600'
            }`}
          >
            Buys
          </button>
          <button
            onClick={() => setActiveView('loans')}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeView === 'loans'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-600 hover:text-amber-600'
            }`}
          >
            Loans
          </button>
          <button
            onClick={() => setActiveView('sales')}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeView === 'sales'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-600 hover:text-amber-600'
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActiveView('layaways')}
            className={`py-4 font-semibold border-b-2 transition-colors ${
              activeView === 'layaways'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-600 hover:text-amber-600'
            }`}
          >
            Layaways
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
