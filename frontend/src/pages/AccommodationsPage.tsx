import { useState, useEffect } from 'react';
import { accommodationService } from '../services/accommodationService';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import AccommodationCard from '../components/AccommodationCard';
import FilterSidebar from '../components/FilterSidebar';
import { FiFilter } from 'react-icons/fi';
import type { Accommodation } from '../types';

const AccommodationsPage = () => {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<any>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadAccommodations();
  }, [filters, pagination.page]);

  const loadAccommodations = async () => {
    setLoading(true);
    try {
      const result = await accommodationService.getAccommodations({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });

      setAccommodations(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Failed to load accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchFilters: any) => {
    setFilters(searchFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">영유아 숙소 찾기</h1>
          <p className="text-primary-100">
            아이와 함께하는 안전하고 편안한 여행을 위한 숙소
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    검색 결과
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    총 {pagination.total}개의 숙소
                  </p>
                </div>

                {/* Filter Button - Mobile */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2"
                >
                  <FiFilter />
                  <span>필터</span>
                </button>
              </div>

              {/* Sort */}
              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setFilters({ ...filters, sortBy, sortOrder });
                  }}
                >
                  <option value="created_at-desc">최신순</option>
                  <option value="average_rating-desc">평점 높은순</option>
                  <option value="min_price-asc">가격 낮은순</option>
                  <option value="min_price-desc">가격 높은순</option>
                </select>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : accommodations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            ) : (
              <>
                {/* Accommodation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accommodations.map((accommodation) => (
                    <AccommodationCard
                      key={accommodation.id}
                      accommodation={accommodation}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        이전
                      </button>

                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === pagination.totalPages ||
                            Math.abs(page - pagination.page) <= 2
                        )
                        .map((page, index, array) => (
                          <div key={page} className="flex items-center">
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2 text-gray-400">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 rounded-lg ${
                                pagination.page === page
                                  ? 'bg-primary-600 text-white'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          </div>
                        ))}

                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        다음
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default AccommodationsPage;
