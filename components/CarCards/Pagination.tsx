import './Pagination.css';
import { set_pagination_data } from '../../Redux_store/slices/carCardGridSlice';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../Redux_store/store';
import { useFindCarApi } from '../API/fetch_car';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const dispatch=useDispatch()
  const {findCarApiCall}=useFindCarApi()
  
  const page_data=useSelector((state:RootState)=>state.carCardGrid.paginationData)
  const filters=useSelector((state:RootState)=>state.carFilter)
  const new_page_data=[...page_data]
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      new_page_data[0]=page
      findCarApiCall(page,filters.pickupLocation,filters.dropoffLocation,filters.pickupDate,filters.dropoffDate,filters.carCategory,filters.gearbox,filters.engineType,filters.minPrice,filters.maxPrice)
      dispatch(set_pagination_data([...new_page_data]))
    }
  };

  

  return (
    <div className="pagination-container">
      {/* ← Arrow */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="arrow-button"
        >
          ←
        </button>
      )}

      {/* Previous Page Button */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="page-button"
        >
          {currentPage - 1}
        </button>
      )}

      {/* Current Page Button */}
      <button
        onClick={() => handlePageChange(currentPage)}
        className="page-button active-page"
      >
        {currentPage}
      </button>

      {/* Next Page Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="page-button"
        >
          {currentPage + 1}
        </button>
      )}

      {/* → Arrow */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="arrow-button"
        >
          →
        </button>
      )}
    </div>
  );
};

export default Pagination;
