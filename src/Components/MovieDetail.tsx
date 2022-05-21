import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";
import { SliderCategory } from "../atoms";
import MovieDetailInfo from "./MovieDetailInfo";

const Wrapper = styled.div``;
const Overlay = styled(motion.div)`
  z-index: 98;
  position: fixed;
  opacity: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const BigMovie = styled(motion.div)`
  z-index: 99;
  position: absolute;
  width: 45vw;
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 600px;
`;

interface IMovies {
  results: IMovie[];
  category: SliderCategory;
}
function MovieDetail({ results, category }: IMovies) {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const onOverlayClick = () => navigate("/");
  const { scrollY } = useViewportScroll();
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId + ""
    );
  return (
    <Wrapper>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              layoutId={
                bigMovieMatch.params.movieId
                  ? bigMovieMatch.params.movieId + category + ""
                  : ""
              }
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <MovieDetailInfo movieId={clickedMovie.id} />
                  {/* {clickedMovie.title.length < 35 ? (
                    <BigTitleShort>{clickedMovie.title}</BigTitleShort>
                  ) : (
                    <BigTitleLong>{clickedMovie.title}</BigTitleLong>
                  )}
                  <BigOverview>{clickedMovie.overview}</BigOverview> */}
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default MovieDetail;
