import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";
import { SliderCategory } from "../atoms";

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
  width: 40vw;
  height: 80vh;
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
  height: 400px;
`;

const BigTitleShort = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;
const BigTitleLong = styled(BigTitleShort)`
  font-size: 35px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
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
              key="MovieDetailOverlay"
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              key="MovieDetailBigMovie"
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
                    key="MovieDetailBigCover"
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  {clickedMovie.title.length < 35 ? (
                    <BigTitleShort key="MovieDetailBigTitle">
                      {clickedMovie.title}
                    </BigTitleShort>
                  ) : (
                    <BigTitleLong key="MovieDetailBigTitle">
                      {clickedMovie.title}
                    </BigTitleLong>
                  )}
                  <BigOverview key="MovieDetailBigOverview">
                    {clickedMovie.overview}
                  </BigOverview>
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
