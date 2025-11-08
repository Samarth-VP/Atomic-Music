import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import BuysView from './components/BuysView';
import LoansView from './components/LoansView';
import SalesView from './components/SalesView';
import LayawaysView from './components/LayawaysView';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto px-6 py-8">
        {activeView === 'dashboard' && <Dashboard setActiveView={setActiveView} />}
        {activeView === 'buys' && <BuysView setActiveView={setActiveView} />}
        {activeView === 'loans' && <LoansView setActiveView={setActiveView} />}
        {activeView === 'sales' && <SalesView setActiveView={setActiveView} />}
        {activeView === 'layaways' && <LayawaysView setActiveView={setActiveView} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
