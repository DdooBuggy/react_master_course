import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovieDetail,
  getMovieSimilar,
  IGetMoviesResult,
  IMovieDetail,
} from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  position: relative;
  top: -250px;
  background-image: linear-gradient(
    to top,
    ${(props) => props.theme.black.veryDark},
    ${(props) => props.theme.black.veryDark} 90%,
    transparent 100%
  );
  height: 100%;
  padding: 0 20px;
  color: ${(props) => props.theme.white.darker};
`;
const TitleShort = styled.h3`
  font-size: 46px;
  margin-bottom: 30px;
`;
const TitleLong = styled(TitleShort)`
  font-size: 35px;
`;
const Icons = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  gap: 10px;
`;
const PlayBtn = styled.li`
  background-color: ${(props) => props.theme.white.darker};
  color: black;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Icon = styled.li``;
const HomepageBtn = styled.li``;
const InfoDetails = styled.ul`
  display: flex;
  margin-bottom: 20px;
  gap: 50px;
  font-weight: 400;
  li:first-child {
    color: green;
    font-weight: 600;
  }
`;
const InfoBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;
const MainDetails = styled.div``;
const Adult = styled.li``;
const Overview = styled.p`
  font-size: 20px;
  line-height: 1.4;
`;
const SubDetails = styled.ul`
  font-size: 15px;
  line-height: 1.5;
  li {
    margin-bottom: 30px;
  }
  span {
    color: #7f8c8d;
  }
`;

const Similars = styled.div`
  width: 100%;
`;
const SimilarMovieTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #bdc3c7;
`;
const SimilarMovies = styled.ul`
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
  height: 400px;
  border-radius: 10px;
`;
const MovieBox = styled.li<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  border-radius: 10px;
`;

function MovieDetailInfo({ movieId }: { movieId: number }) {
  const { data, isLoading } = useQuery<IMovieDetail>(["movieDetail"], () =>
    getMovieDetail(movieId + "")
  );
  const { data: similarMovies, isLoading: similarLoading } =
    useQuery<IGetMoviesResult>(["similarMovies"], () =>
      getMovieSimilar(movieId + "")
    );
  const companiesNames = data?.production_companies.map(
    (company) => company.name
  );
  const voiceNames = data?.spoken_languages.map((lang) => lang.name);
  const genresNames = data?.genres.map((genre) => genre.name);
  return (
    <Wrapper>
      {data && (
        <>
          {data.title.length < 35 ? (
            <TitleShort>{data.title}</TitleShort>
          ) : (
            <TitleLong>{data.title}</TitleLong>
          )}
          <Icons>
            <PlayBtn>
              {/* play icon */}
              Play
            </PlayBtn>
            <Icon key="heart">heart</Icon>
            <Icon key="like">like</Icon>
            <Icon key="dislike">dislike</Icon>
            <HomepageBtn>
              <a href={data.homepage}>Homepage &rarr;</a>
            </HomepageBtn>
          </Icons>
          <InfoDetails>
            <li>Rating: {data.vote_average}</li>
            <li>{data.runtime} min</li>
            <li>{data.release_date}</li>
            {data.adult ? <Adult>Adult Only</Adult> : null}
          </InfoDetails>
          <InfoBox>
            <MainDetails>
              <Overview>{data.overview}</Overview>
            </MainDetails>
            <SubDetails>
              {/* company, language, voices */}
              <li>
                <span>Production:</span> {companiesNames?.join(", ")}
              </li>
              <li>
                <span>Supported voices:</span> {voiceNames?.join(", ")}
              </li>
              {data.tagline && (
                <li>
                  <span>Intro:</span> {data?.tagline}
                </li>
              )}
              <li>
                <span>Genres:</span> {genresNames?.join(", ")}
              </li>
            </SubDetails>
          </InfoBox>
          <Similars>
            <SimilarMovieTitle>Related Movies</SimilarMovieTitle>
            <SimilarMovies>
              {similarLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {similarMovies?.results.map((movie) => (
                    <MovieBox
                      key={movie.id}
                      bgphoto={makeImagePath(
                        movie.backdrop_path || movie.poster_path,
                        "w500"
                      )}
                      // onClick={() => onBoxClicked(movie.id)}
                    ></MovieBox>
                  ))}
                </>
              )}
            </SimilarMovies>
          </Similars>
        </>
      )}
    </Wrapper>
  );
}

export default MovieDetailInfo;
