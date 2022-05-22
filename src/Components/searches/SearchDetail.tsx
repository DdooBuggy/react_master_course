import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ISearch } from "../../api";
import { keywordAtom, MediaType, mediaTypeAtom } from "../../atoms";
import { makeImagePath } from "../../utils";
import SearchMovieDetailInfo from "./SearchMovieDetailInfo";
import SearchTvDetailInfo from "./SearchTvDetailInfo";

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
const BigItem = styled(motion.div)`
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

interface ISearches {
  results: ISearch[];
}
function SearchDetail({ results }: ISearches) {
  const mediaType = useRecoilValue(mediaTypeAtom);
  const keyword = useRecoilValue(keywordAtom);
  const navigate = useNavigate();
  const bigMatch = useMatch("/search/contents/:searchId");
  const onOverlayClick = () => {
    navigate(`/search?keyword=${keyword}`);
  };
  const { scrollY } = useViewportScroll();
  const clickedItem =
    bigMatch?.params.searchId &&
    results.find((item) => item.id + "" === bigMatch.params.searchId + "");
  return (
    <Wrapper>
      <AnimatePresence>
        {bigMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigItem
              layoutId={
                bigMatch.params.searchId ? bigMatch.params.searchId + "" : ""
              }
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedItem && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedItem.backdrop_path || clickedItem.poster_path,
                        "w500"
                      )})`,
                    }}
                  />
                  {mediaType === MediaType.tv ? (
                    <SearchTvDetailInfo itemId={clickedItem.id} />
                  ) : null}
                  {mediaType === MediaType.movie ? (
                    <SearchMovieDetailInfo itemId={clickedItem.id} />
                  ) : null}
                </>
              )}
            </BigItem>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default SearchDetail;
