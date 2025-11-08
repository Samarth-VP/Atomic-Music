import React from 'react';
import { Search, DollarSign, FileText, Clock, CreditCard } from 'lucide-react';

const Dashboard = ({ setActiveView }) => {
  return (
    <div className="space-y-6">
      {/* Quick Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="text-amber-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Quick Search</h2>
        </div>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Search by ticket number, customer, or item..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
          />
          <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Main Feature Cards - 4 Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Buys Card */}
        <div 
          onClick={() => setActiveView('buys')}
          className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
        >
          <DollarSign size={40} className="mb-3" />
          <h3 className="text-xl font-bold mb-2">Buys</h3>
          <p className="text-blue-100 mb-4">Purchase history from customers</p>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-blue-200">Total Purchases</div>
        </div>

        {/* Loans Card */}
        <div 
          onClick={() => setActiveView('loans')}
          className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
        >
          <CreditCard size={40} className="mb-3" />
          <h3 className="text-xl font-bold mb-2">Loans</h3>
          <p className="text-purple-100 mb-4">Pawn loan transactions</p>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-purple-200">Active Loans</div>
        </div>

        {/* Sales Card */}
        <div 
          onClick={() => setActiveView('sales')}
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
        >
          <FileText size={40} className="mb-3" />
          <h3 className="text-xl font-bold mb-2">Sales</h3>
          <p className="text-emerald-100 mb-4">Sales transactions</p>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-emerald-200">Total Sales</div>
        </div>

        {/* Layaways Card */}
        <div 
          onClick={() => setActiveView('layaways')}
          className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
        >
          <Clock size={40} className="mb-3" />
          <h3 className="text-xl font-bold mb-2">Layaways</h3>
          <p className="text-amber-100 mb-4">Layaway transactions</p>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-amber-200">Active Layaways</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="text-amber-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
            No recent activity
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
