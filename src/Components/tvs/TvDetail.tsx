import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ITv } from "../../api";
import { makeImagePath } from "../../utils";
import { SliderCategory } from "../../atoms";
import TvDetailInfo from "./TvDetailInfo";

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
const BigTv = styled(motion.div)`
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

interface ITvs {
  results: ITv[];
  category: SliderCategory;
}
function TvDetail({ results, category }: ITvs) {
  const navigate = useNavigate();
  const bigTvMatch = useMatch("/tv/:tvId");
  const onOverlayClick = () => navigate("/tv");
  const { scrollY } = useViewportScroll();
  const clickedTv =
    bigTvMatch?.params.tvId &&
    results.find((tv) => tv.id + "" === bigTvMatch.params.tvId + "");
  return (
    <Wrapper>
      <AnimatePresence>
        {bigTvMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigTv
              layoutId={
                bigTvMatch.params.tvId
                  ? bigTvMatch.params.tvId + category + ""
                  : ""
              }
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedTv && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedTv.backdrop_path || clickedTv.poster_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <TvDetailInfo tvId={clickedTv.id} />
                </>
              )}
            </BigTv>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default TvDetail;
