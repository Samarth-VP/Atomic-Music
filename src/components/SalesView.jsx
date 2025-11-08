import React from 'react';

const SalesView = ({ setActiveView }) => {
  return (
    <div className="space-y-6">
      <button 
        onClick={() => setActiveView('dashboard')}
        className="text-amber-600 hover:text-amber-700 font-semibold"
      >
        ← Back to Dashboard
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales</h2>
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg mb-2">Sales view - Coming soon</p>
          <p className="text-sm">This section will display sales transaction history</p>
        </div>
      </div>
    </div>
  );
};

export default SalesView;
