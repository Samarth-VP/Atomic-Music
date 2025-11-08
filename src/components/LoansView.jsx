import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const LoansView = ({ setActiveView }) => {
  const [loansData, setLoansData] = useState([]);
  const [stats, setStats] = useState({
    total_loans: 0,
    total_loan_amount: 0,
    avg_loan_amount: 0,
    active_loans: 0
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    recordsPerPage: 100,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data when page changes
  useEffect(() => {
    fetchLoansData(pagination.currentPage);
    fetchStats();
  }, []);

  const fetchLoansData = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getLoans(page, 100);
      setLoansData(response.data);
      setPagination(response.pagination);
      setLoading(false);
    } catch (err) {
      setError('Failed to load loan data');
      setLoading(false);
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await apiService.getLoanStats();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const handlePageChange = (newPage) => {
    fetchLoansData(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'D': { label: 'Default', class: 'bg-red-100 text-red-800' },
      'I': { label: 'In Progress', class: 'bg-blue-100 text-blue-800' },
      'C': { label: 'Closed', class: 'bg-gray-100 text-gray-800' },
    };
    
    const statusInfo = statusMap[status] || { label: status, class: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pagination.currentPage - 2);
    let endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setActiveView('dashboard')}
        className="text-amber-600 hover:text-amber-700 font-semibold"
      >
        ← Back to Dashboard
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan History</h2>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="text-sm text-purple-800 font-semibold mb-1">Total Loans</div>
            <div className="text-2xl font-bold text-purple-900">{stats.total_loans || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
            <div className="text-sm text-emerald-800 font-semibold mb-1">Total Loan Amount</div>
            <div className="text-2xl font-bold text-emerald-900">
              {formatCurrency(stats.total_loan_amount)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="text-sm text-blue-800 font-semibold mb-1">Active Loans</div>
            <div className="text-2xl font-bold text-blue-900">{stats.active_loans || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
            <div className="text-sm text-amber-800 font-semibold mb-1">Average Loan</div>
            <div className="text-2xl font-bold text-amber-900">
              {formatCurrency(stats.avg_loan_amount)}
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ticket #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Loan Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Model/Serial</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Loan Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Original Amt</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Repawned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                    Loading loan data...
                  </td>
                </tr>
              ) : loansData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                    No loan records found.
                  </td>
                </tr>
              ) : (
                loansData.map((loan, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{loan.TICKETNUM || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(loan.loan_date)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                      {loan.CUS_FNAME} {loan.CUS_LNAME}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {loan.item_description || 'N/A'}
                      {loan.item_description2 && ` - ${loan.item_description2}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {loan.MODELNUM || ''} {loan.SERIALNUM || ''}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                      {formatCurrency(loan.loan_amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatCurrency(loan.OrigPawnAmt)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(loan.STATUS)}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {loan.RePawned ? (
                        <span className="text-amber-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * pagination.recordsPerPage) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.recordsPerPage, pagination.totalRecords)} of{' '}
            {pagination.totalRecords} results
          </div>
          
          <div className="flex space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage || loading}
              className={`px-4 py-2 border rounded-lg ${
                pagination.hasPrevPage && !loading
                  ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>

            {/* First Page */}
            {pagination.currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  1
                </button>
                {pagination.currentPage > 4 && (
                  <span className="px-2 py-2 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg ${
                  pageNum === pagination.currentPage
                    ? 'bg-amber-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Last Page */}
            {pagination.currentPage < pagination.totalPages - 2 && (
              <>
                {pagination.currentPage < pagination.totalPages - 3 && (
                  <span className="px-2 py-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {pagination.totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage || loading}
              className={`px-4 py-2 border rounded-lg ${
                pagination.hasNextPage && !loading
                  ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansView;