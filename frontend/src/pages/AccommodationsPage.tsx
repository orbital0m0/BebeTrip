import { useState, useEffect } from 'react';
import { accommodationService } from '../services/accommodationService';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import AccommodationCard from '../components/AccommodationCard';
import FilterSidebar from '../components/FilterSidebar';
import Button from '../components/ui/Button';
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
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">영유아 숙소 찾기</h1>
          <p className="text-lg text-primary-100">
            아이와 함께하는 안전하고 편안한 여행을 위한 숙소
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-screen-xl mx-auto px-6 -mt-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    검색 결과
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    총 {pagination.total}개의 숙소
                  </p>
                </div>

                {/* Filter Button - Mobile */}
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <FiFilter className="mr-2" />
                  필터
                </Button>
              </div>

              {/* Sort */}
              <div>
                <select
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-white cursor-pointer"
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setFilters({ ...filters, sortBy, sortOrder });
                  }}
                >
                  <option value="created_at-desc" className="py-3">최신순</option>
                  <option value="average_rating-desc" className="py-3">평점 높은순</option>
                  <option value="min_price-asc" className="py-3">가격 낮은순</option>
                  <option value="min_price-desc" className="py-3">가격 높은순</option>
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
                  <div className="flex justify-center mt-12">
                    <nav className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                      >
                        이전
                      </Button>

                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === pagination.totalPages ||
                            Math.abs(page - pagination.page) <= 2
                        )
                        .map((page, index, array) => (
                          <div key={page} className="flex items-center gap-2">
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2 text-gray-400">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                pagination.page === page
                                  ? 'bg-primary-500 text-white shadow-md'
                                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-500'
                              }`}
                            >
                              {page}
                            </button>
                          </div>
                        ))}

                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                      >
                        다음
                      </Button>
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
