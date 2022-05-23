import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ISearch, ISearchResult, NO_IMG_URL } from "../api";
import { isSearch, keywordAtom, MediaType, mediaTypeAtom } from "../atoms";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";
import SearchDetail from "../Components/searches/SearchDetail";

const Wrapper = styled.div`
  width: 100vw;
  padding: 150px 60px 0 60px;
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 80px;
`;
const Items = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  height: 100vh;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 10px;
  cursor: pointer;
`;
const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: { duration: 0.3, delay: 0.5, type: "tween" },
  },
};
const Info = styled(motion.div)`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  border-radius: 10px;
  padding: 20px;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
`;
const InfoTitleShort = styled.h4`
  text-align: center;
  font-size: 20px;
`;
const InfoTitleLong = styled.h4`
  text-align: center;
  font-size: 15px;
`;
const infoVar = {
  hover: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.7, type: "tween" },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [backKeyword, setKeyword] = useRecoilState(keywordAtom);
  useEffect(() => {
    if (keyword) {
      setKeyword(keyword);
    }
  }, [keyword]);
  const [searches, setSearches] = useState<ISearchResult>();
  const searchResults = searches?.results.filter(
    (search) => search.media_type !== MediaType.person
  );
  const [mediaType, setMediaType] = useRecoilState(mediaTypeAtom);
  const onIsSearch = useRecoilValue(isSearch);
  const navigate = useNavigate();
  useEffect(() => {
    const API_KEY = "4d9d00b720becb4f431355610730fd73";
    const BASE_PATH = "https://api.themoviedb.org/3";
    fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`)
      .then((res) => res.json())
      .then((json) => setSearches(json));
  }, [onIsSearch]);
  const onBoxClicked = (id: number, media: string) => {
    if (media === MediaType.movie) {
      setMediaType(MediaType.movie);
    } else if (media === MediaType.tv) {
      setMediaType(MediaType.tv);
    }
    navigate(`/search/contents/${id}`);
  };
  const boxTransformOrigin = (mapIndex: number) => {
    let number = 0.5;
    if (mapIndex % 5 === 0) {
      number = 0;
    } else if (mapIndex % 5 === 4) {
      number = 1;
    }
    return { originX: number };
  };
  return (
    <Wrapper>
      {searchResults ? (
        <>
          <Title>Search for: {backKeyword}</Title>
          <Items>
            {searchResults?.map((item, mapIndex) => (
              <Box
                layoutId={item.id + ""}
                variants={boxVar}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                key={item.id}
                bgphoto={
                  item.backdrop_path || item.poster_path
                    ? makeImagePath(
                        item.backdrop_path || item.poster_path,
                        "w500"
                      )
                    : NO_IMG_URL
                }
                onClick={() => onBoxClicked(item.id, item.media_type)}
                style={boxTransformOrigin(mapIndex)}
              >
                <Info variants={infoVar}>
                  {item.media_type === MediaType.movie ? (
                    <InfoTitleShort>{item.title}</InfoTitleShort>
                  ) : null}
                  {item.media_type === MediaType.tv ? (
                    <InfoTitleShort>{item.name}</InfoTitleShort>
                  ) : null}
                  {/* {item.title.length > 35 ? (
                    <InfoTitleLong>{item.title}</InfoTitleLong>
                  ) : (
                    <InfoTitleShort>{item.title}</InfoTitleShort>
                  )} */}
                </Info>
              </Box>
            ))}
          </Items>

          <SearchDetail results={searchResults as ISearch[]} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
}

export default Search;
