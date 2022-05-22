import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IMovieResult,
  IMovieDetail,
  getSearchDetail,
  getSearchSimilar,
  ITvDetail,
  ITvResult,
} from "../../api";
import { makeImagePath } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { MediaType, mediaTypeAtom } from "../../atoms";
import { useRecoilState } from "recoil";

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
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 600;
  margin-right: 15px;
`;
const Icon = styled.li`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.lighter};
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;
const HomepageBtn = styled.li`
  margin-left: 20px;
  color: #27ae60;
`;
const InfoDetails = styled.ul`
  display: flex;
  margin-bottom: 20px;
  gap: 30px;
  font-weight: 400;
  li:first-child {
    color: #f1c40f;
    font-weight: 600;
  }
`;
const InfoBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;
const MainDetails = styled.div``;
const Adult = styled.li`
  color: red;
`;
const Overview = styled.p`
  font-size: 20px;
  line-height: 1.4;
  text-indent: 30px;
  margin-bottom: 20px;
  height: 200px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 3px;
    background-color: black;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
`;
const SubDetails = styled.ul`
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  span {
    color: #7f8c8d;
  }
`;

const Relateds = styled.div`
  width: 100%;
`;
const RelatedMovieTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #bdc3c7;
`;
const RelatedMovies = styled.ul`
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
  height: 370px;
  border-radius: 10px;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 3px;
    background-color: black;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
`;
const RelatedMovieBox = styled.li<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 250px;
  border-radius: 10px;
`;

function SearchTvDetailInfo({ itemId }: { itemId: number }) {
  const { data: tv, isLoading: tvLoading } = useQuery<ITvDetail>(
    ["tvDetail"],
    () => getSearchDetail(itemId + "", MediaType.tv)
  );

  const { data: similartvs, isLoading: similarTvLoading } = useQuery<ITvResult>(
    ["similarTvMovies"],
    () => getSearchSimilar(itemId + "", MediaType.tv)
  );
  const companiesNames = tv?.production_companies.map(
    (company) => company.name
  );
  const voiceNames = tv?.spoken_languages.map((lang) => lang.name);
  const genresNames = tv?.genres.map((genre) => genre.name);
  return (
    <Wrapper>
      {tv && (
        <>
          {tv.name.length < 35 ? (
            <TitleShort>{tv.name}</TitleShort>
          ) : (
            <TitleLong>{tv?.name}</TitleLong>
          )}
          <Icons>
            <PlayBtn>
              <FontAwesomeIcon icon={solid("play")} /> Play
            </PlayBtn>
            <Icon key="heart">
              <FontAwesomeIcon icon={regular("heart")} />
            </Icon>
            <Icon key="like">
              <FontAwesomeIcon icon={regular("thumbs-up")} />
            </Icon>
            <Icon key="dislike">
              <FontAwesomeIcon icon={regular("thumbs-down")} />
            </Icon>
            <HomepageBtn>
              <a href={tv.homepage}>
                <FontAwesomeIcon icon={solid("house-chimney")} /> Homepage
              </a>
            </HomepageBtn>
          </Icons>
          <InfoDetails>
            <li>
              <FontAwesomeIcon icon={solid("star")} />
              <span> </span>
              {tv.vote_average}
            </li>
            <li>{tv.number_of_episodes} episodes</li>
            <li>{tv.number_of_seasons} seasons</li>
            {tv.adult ? <Adult>Adult Only</Adult> : null}
          </InfoDetails>
          <InfoBox>
            <MainDetails>
              <Overview>{tv.overview}</Overview>
            </MainDetails>
            <SubDetails>
              {companiesNames?.length === 0 ? null : (
                <li>
                  <span>Production:</span> {companiesNames?.join(", ")}
                </li>
              )}
              {voiceNames?.length === 0 ? null : (
                <li>
                  <span>Supported voices:</span> {voiceNames?.join(", ")}
                </li>
              )}
              {tv.tagline && (
                <li>
                  <span>Intro:</span> {tv?.tagline}
                </li>
              )}
              <li>
                <span>Genres:</span> {genresNames?.join(", ")}
              </li>
            </SubDetails>
          </InfoBox>
          <Relateds>
            <RelatedMovieTitle>Related Movies</RelatedMovieTitle>
            <RelatedMovies>
              {similarTvLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {similartvs?.results.map((tv) => (
                    <RelatedMovieBox
                      key={tv.id}
                      bgphoto={makeImagePath(
                        tv.backdrop_path || tv.poster_path,
                        "w500"
                      )}
                      // onClick={() => onBoxClicked(tv.id)}
                    ></RelatedMovieBox>
                  ))}
                </>
              )}
            </RelatedMovies>
          </Relateds>
        </>
      )}
    </Wrapper>
  );
}

export default SearchTvDetailInfo;
