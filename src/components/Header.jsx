import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-amber-900 to-red-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Atomic Music</h1>
              <p className="text-sm text-amber-200">Historical Data Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-amber-200">Welcome back</div>
              <div className="font-semibold">Store Manager</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
