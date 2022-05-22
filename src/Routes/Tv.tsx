import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvs, ITv, ITvResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../Components/tvs/Slider";
import TvDetail from "../Components/tvs/TvDetail";
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
  border: none;
  cursor: pointer;
`;

function Tv() {
  const { data: airingTvs, isLoading: airingLoading } = useQuery<ITvResult>(
    ["Tvs", SliderCategory.airing_today],
    () => getTvs(SliderCategory.airing_today)
  );
  const { data: onTheAirTvs, isLoading: onTheAirLoading } = useQuery<ITvResult>(
    ["Tvs", SliderCategory.on_the_air],
    () => getTvs(SliderCategory.on_the_air)
  );
  const { data: popularTvs, isLoading: popularLoading } = useQuery<ITvResult>(
    ["Tvs", SliderCategory.popular],
    () => getTvs(SliderCategory.popular)
  );
  const { data: topRatedTvs, isLoading: topRatedLoading } = useQuery<ITvResult>(
    ["Tvs", SliderCategory.top_rated],
    () => getTvs(SliderCategory.top_rated)
  );
  const [clicked, setClicked] = useRecoilState(clickedCategory);
  let Tvs;
  if (clicked === SliderCategory.airing_today) {
    Tvs = airingTvs;
  } else if (clicked === SliderCategory.on_the_air) {
    Tvs = onTheAirTvs;
  } else if (clicked === SliderCategory.popular) {
    Tvs = popularTvs;
  } else if (clicked === SliderCategory.top_rated) {
    Tvs = topRatedTvs;
  }
  const navigate = useNavigate();
  const onClicked = () => {
    setClicked(SliderCategory.airing_today);
    navigate(`/tv/${airingTvs?.results[0].id}`);
  };
  return (
    <Wrapper>
      {airingLoading && onTheAirLoading && popularLoading && topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(airingTvs?.results[0].backdrop_path || "")}
          >
            <Title>{airingTvs?.results[0].name}</Title>
            <Overview>{airingTvs?.results[0].overview}</Overview>
            <AnimatePresence>
              <BannerBtn
                layoutId={
                  airingTvs?.results[0].id + SliderCategory.airing_today + ""
                }
                onClick={onClicked}
              >
                <FontAwesomeIcon icon={solid("circle-info")} /> More Info
              </BannerBtn>
            </AnimatePresence>
          </Banner>

          <TvDetail category={clicked} results={Tvs?.results as ITv[]} />

          <Slider
            category={SliderCategory.airing_today}
            tvs={airingTvs as ITvResult}
          />
          <Slider
            category={SliderCategory.on_the_air}
            tvs={onTheAirTvs as ITvResult}
          />
          <Slider
            category={SliderCategory.popular}
            tvs={popularTvs as ITvResult}
          />
          <Slider
            category={SliderCategory.top_rated}
            tvs={topRatedTvs as ITvResult}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
