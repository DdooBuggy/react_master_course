import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvDetail, getTvSimilar, ITvResult, ITvDetail } from "../../api";
import { makeImagePath } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";

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
const RelatedTvTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #bdc3c7;
`;
const RelatedTvs = styled.ul`
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
const RelatedTvBox = styled.li<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 250px;
  border-radius: 10px;
`;

const Info = styled(motion.div)`
  background-image: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1)
  );
  border-radius: 10px;
  padding: 20px;
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
`;
const InfoTitleShort = styled.h4`
  text-align: center;
  font-size: 30px;
`;
const InfoTitleLong = styled.h4`
  text-align: center;
  font-size: 20px;
`;
const infoVar = {
  hover: {
    opacity: 1,
    transition: { duration: 0.2, type: "tween" },
  },
};

function TvDetailInfo({ tvId }: { tvId: number }) {
  const { data: tvDetail, isLoading } = useQuery<ITvDetail>(["tvDetail"], () =>
    getTvDetail(tvId + "")
  );
  const { data: similarTvs, isLoading: similarLoading } = useQuery<ITvResult>(
    ["similarTvs"],
    () => getTvSimilar(tvId + "")
  );
  const companiesNames = tvDetail?.production_companies.map(
    (company) => company.name
  );
  const voiceNames = tvDetail?.spoken_languages.map((lang) => lang.name);
  const genresNames = tvDetail?.genres.map((genre) => genre.name);
  return (
    <Wrapper>
      {tvDetail && (
        <>
          {tvDetail.name.length < 35 ? (
            <TitleShort>{tvDetail.name}</TitleShort>
          ) : (
            <TitleLong>{tvDetail.name}</TitleLong>
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
              <a href={tvDetail.homepage}>
                <FontAwesomeIcon icon={solid("house-chimney")} /> Homepage
              </a>
            </HomepageBtn>
          </Icons>
          <InfoDetails>
            <li>
              <FontAwesomeIcon icon={solid("star")} />
              <span> </span>
              {tvDetail.vote_average}
            </li>
            <li>{tvDetail.number_of_episodes} episodes</li>
            <li>{tvDetail.number_of_seasons} seasons</li>
          </InfoDetails>
          <InfoBox>
            <MainDetails>
              <Overview>{tvDetail.overview}</Overview>
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
              {tvDetail.tagline && (
                <li>
                  <span>Intro:</span> {tvDetail?.tagline}
                </li>
              )}
              <li>
                <span>Genres:</span> {genresNames?.join(", ")}
              </li>
            </SubDetails>
          </InfoBox>
          <Relateds>
            <RelatedTvTitle>Related Tvs</RelatedTvTitle>
            <RelatedTvs>
              {similarLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {similarTvs?.results.map((tv) => (
                    <RelatedTvBox
                      key={tv.id}
                      bgphoto={makeImagePath(
                        tv.backdrop_path || tv.poster_path,
                        "w500"
                      )}
                      // onClick={() => onBoxClicked(tv.id)}
                    >
                      <Info variants={infoVar} whileHover="hover">
                        {tv.name.length > 30 ? (
                          <InfoTitleLong>{tv.name}</InfoTitleLong>
                        ) : (
                          <InfoTitleShort>{tv.name}</InfoTitleShort>
                        )}
                      </Info>
                    </RelatedTvBox>
                  ))}
                </>
              )}
            </RelatedTvs>
          </Relateds>
        </>
      )}
    </Wrapper>
  );
}

export default TvDetailInfo;
