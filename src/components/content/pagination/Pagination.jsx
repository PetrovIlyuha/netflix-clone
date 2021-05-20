import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getMoviesByType,
  searchMovie,
  setPage,
  triggerScrollToGrid
} from '../../../redux/moviesSlice';
import './Pagination.scss';

const Pagination = ({ topPagination, isSearchMode }) => {
  const dispatch = useDispatch();
  const {
    page,
    movies,
    currentlyShowing,
    totalPages,
    searchWord
  } = useSelector((state) => state.movies);

  const totalPagesPagination =
    movies[currentlyShowing] !== undefined
      ? totalPages
      : movies[currentlyShowing]
      ? Math.ceil(movies[currentlyShowing].results.length / 10)
      : 0;
  const changePage = (type) => {
    switch (type) {
      case 'prev':
        if (page >= 1) {
          dispatch(setPage(page - 1));
          if (!topPagination) {
            dispatch(triggerScrollToGrid());
          }
          if (isSearchMode) {
            dispatch(searchMovie(searchWord));
          } else {
            dispatch(getMoviesByType({ type: currentlyShowing }));
          }
        }
        break;
      case 'next':
        if (page < totalPages) {
          dispatch(setPage(page + 1));
          if (!topPagination) {
            dispatch(triggerScrollToGrid());
          }
          if (isSearchMode) {
            dispatch(searchMovie(searchWord));
          } else {
            dispatch(getMoviesByType({ type: currentlyShowing }));
          }
        }
        break;
    }
  };
  return (
    <React.Fragment>
      <button
        className={page === 1 ? 'paginate-button disable' : 'paginate-button'}
        onClick={() => changePage('prev')}
      >
        Previous
      </button>
      <span className="pageCount">
        {page} / {totalPagesPagination}
      </span>
      <button
        className={
          page === totalPagesPagination
            ? 'paginate-button disable'
            : 'paginate-button'
        }
        onClick={() => changePage('next')}
      >
        Next
      </button>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  topPagination: PropTypes.bool,
  isSearchMode: PropTypes.bool
};

export default Pagination;
