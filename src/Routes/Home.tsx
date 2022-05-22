import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IMovie, IMovieResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../Components/movies/Slider";
import MovieDetail from "../Components/movies/MovieDetail";
import { clickedCategory, SliderCategory } from "../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Wrapper = styled.div`
  background-color: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
const BannerBtn = styled(motion.button)`
  width: 200px;
  height: 70px;
  font-size: 27px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  cursor: pointer;
  border: none;
`;

function Home() {
  const { data: nowPlayingMovies, isLoading: nowLoading } =
    useQuery<IMovieResult>(["movies", SliderCategory.now_playing], () =>
      getMovies(SliderCategory.now_playing)
    );
  const { data: popularMovies, isLoading: popularLoading } =
    useQuery<IMovieResult>(["movies", SliderCategory.popular], () =>
      getMovies(SliderCategory.popular)
    );
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    useQuery<IMovieResult>(["movies", SliderCategory.top_rated], () =>
      getMovies(SliderCategory.top_rated)
    );
  const { data: upcomingMovies, isLoading: upcomingLoading } =
    useQuery<IMovieResult>(["movies", SliderCategory.upcoming], () =>
      getMovies(SliderCategory.upcoming)
    );
  const [clicked, setClicked] = useRecoilState(clickedCategory);
  let movies;
  if (clicked === SliderCategory.now_playing) {
    movies = nowPlayingMovies;
  } else if (clicked === SliderCategory.popular) {
    movies = popularMovies;
  } else if (clicked === SliderCategory.top_rated) {
    movies = topRatedMovies;
  } else if (clicked === SliderCategory.upcoming) {
    movies = upcomingMovies;
  }
  const navigate = useNavigate();
  const onClicked = () => {
    setClicked(SliderCategory.now_playing);
    navigate(`/movies/${nowPlayingMovies?.results[0].id}`);
  };
  return (
    <Wrapper>
      {nowLoading && popularLoading && topRatedLoading && upcomingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingMovies?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingMovies?.results[0].title}</Title>
            <Overview>{nowPlayingMovies?.results[0].overview}</Overview>
            <AnimatePresence>
              <BannerBtn
                layoutId={
                  nowPlayingMovies?.results[0].id +
                  SliderCategory.now_playing +
                  ""
                }
                onClick={onClicked}
              >
                <FontAwesomeIcon icon={solid("circle-info")} /> More Info
              </BannerBtn>
            </AnimatePresence>
          </Banner>

          <MovieDetail
            category={clicked}
            results={movies?.results as IMovie[]}
          />

          <Slider
            category={SliderCategory.now_playing}
            movies={nowPlayingMovies as IMovieResult}
          />
          <Slider
            category={SliderCategory.popular}
            movies={popularMovies as IMovieResult}
          />
          <Slider
            category={SliderCategory.top_rated}
            movies={topRatedMovies as IMovieResult}
          />
          <Slider
            category={SliderCategory.upcoming}
            movies={upcomingMovies as IMovieResult}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
