import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, IMovie } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import MovieDetail from "../Components/MovieDetail";
import { clickedCategory, SliderCategory } from "../atoms";
import { useRecoilValue } from "recoil";

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

function Home() {
  const { data: nowPlayingMovies, isLoading: nowLoading } =
    useQuery<IGetMoviesResult>(["movies", SliderCategory.now_playing], () =>
      getMovies(SliderCategory.now_playing)
    );
  const { data: popularMovies, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movies", SliderCategory.popular], () =>
      getMovies(SliderCategory.popular)
    );
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", SliderCategory.top_rated], () =>
      getMovies(SliderCategory.top_rated)
    );
  const { data: upcomingMovies, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", SliderCategory.upcoming], () =>
      getMovies(SliderCategory.upcoming)
    );
  const clicked = useRecoilValue(clickedCategory);
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
          </Banner>
          {/* sliders and movieDetails ---------------------------------------------- */}
          {clicked === SliderCategory.now_playing ? (
            <MovieDetail
              category={SliderCategory.now_playing}
              results={nowPlayingMovies?.results as IMovie[]}
            />
          ) : null}
          {clicked === SliderCategory.popular ? (
            <MovieDetail
              category={SliderCategory.popular}
              results={popularMovies?.results as IMovie[]}
            />
          ) : null}
          {clicked === SliderCategory.top_rated ? (
            <MovieDetail
              category={SliderCategory.top_rated}
              results={topRatedMovies?.results as IMovie[]}
            />
          ) : null}
          {clicked === SliderCategory.upcoming ? (
            <MovieDetail
              category={SliderCategory.upcoming}
              results={upcomingMovies?.results as IMovie[]}
            />
          ) : null}

          <Slider
            category={SliderCategory.now_playing}
            movies={nowPlayingMovies as IGetMoviesResult}
          />
          <Slider
            category={SliderCategory.popular}
            movies={popularMovies as IGetMoviesResult}
          />
          <Slider
            category={SliderCategory.top_rated}
            movies={topRatedMovies as IGetMoviesResult}
          />
          <Slider
            category={SliderCategory.upcoming}
            movies={upcomingMovies as IGetMoviesResult}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
