import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllMovieVideos, getMovieDetails } from '../../../redux/moviesSlice';
import { IMAGE_URL } from '../../../services/apiService/movies.service';
import Rating from '../rating/Rating';
import './MovieDetails.scss';

const MovieDetails = () => {
  const { id } = useParams();
  const { movieDetails, allMovieTrailers } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getAllMovieVideos(id));
  }, [id]);
  return (
    movieDetails && (
      <div className="movie-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 0.2 }
          }}
        >
          <img
            className="movie-bg"
            src={`${IMAGE_URL}${movieDetails.backdrop_path}`}
            alt="movie details page background"
          />
        </motion.div>
        <div className="movie-overlay"></div>
        <div className="movie-details">
          <motion.div
            initial={{ x: '100vw', opacity: 0.8 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.4, delay: 0.9 }
            }}
            className="movie-image"
          >
            <img
              src={`${IMAGE_URL}${movieDetails.poster_path}`}
              alt="movie detailed poster"
            />
          </motion.div>
          <div className="movie-body">
            <div className="movie-overview">
              <motion.div
                initial={{ opacity: 0, y: -80 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, delay: 1.2 }
                }}
                className="title"
              >
                {movieDetails.title}
              </motion.div>
              <div className="movie-genres">
                <ul className="genres">
                  {movieDetails.genres.map((genre, index) => (
                    <motion.li
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: (index + 1) / 4 + 1.2
                      }}
                      key={genre.id}
                    >
                      {genre.name}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="rating">
                <Rating rating={movieDetails.vote_average} />
              </div>
            </div>
          </div>
        </div>
        <div className="movie-trailers">
          {allMovieTrailers.length > 0 &&
            allMovieTrailers.map((trailer, index) => {
              return (
                <iframe
                  key={index}
                  autoPlay={true}
                  src={`https://www.youtube.com/embed/${trailer.items[0].id}`}
                  frameBorder="0"
                />
              );
            })}
        </div>
        {movieDetails && JSON.stringify(movieDetails)}
      </div>
    )
  );
};

export default MovieDetails;
