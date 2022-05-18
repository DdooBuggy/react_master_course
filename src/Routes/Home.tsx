import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import MovieDetail from "../Components/MovieDetail";
import { useRecoilState } from "recoil";
import { nowPlayingIndex, SliderCategory } from "../atoms";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
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
  const { data: nowPlayingMovies, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getMovies("now_playing")
  );
  const [nowIndex, setNowIndex] = useRecoilState(nowPlayingIndex);
  const { data: latestMovies, isLoading: latestLoading } =
    useQuery<IGetMoviesResult>(["movies", "latest"], () => getMovies("latest"));
  return (
    <Wrapper>
      {isLoading ? (
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
          {nowPlayingMovies ? <MovieDetail movies={nowPlayingMovies} /> : null}
          {nowPlayingMovies ? (
            <Slider
              category={SliderCategory.now_playing}
              movies={nowPlayingMovies}
            />
          ) : null}
          {/* {latestMovies ? <Slider movies={latestMovies} /> : null} */}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
