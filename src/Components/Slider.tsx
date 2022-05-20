import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { clickedCategory, SliderCategory } from "../atoms";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  position: relative;
  top: -100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-bottom: 100px;
`;
const SliderTitle = styled.h3`
  font-size: 30px;
  font-weight: 600;
  position: absolute;
  top: -50px;
  left: 60px;
`;
const Arrow = styled(motion.div)`
  z-index: 97;
  height: 190px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: absolute;
`;
const arrowVar = {
  initial: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: { duration: 0.3 },
  },
};
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 0 60px;
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
const rowVar = {
  hidden: (forward: boolean) => ({
    x: forward ? window.innerWidth - 10 : -window.innerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (forward: boolean) => ({
    x: forward ? -window.innerWidth + 10 : window.innerWidth - 10,
  }),
};
const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
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

const offset = 6;

interface IMovies {
  movies: IGetMoviesResult;
  category: SliderCategory;
}

function Slider({ movies, category }: IMovies) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [forward, setForward] = useState(true);
  const setClicked = useSetRecoilState(clickedCategory);
  const increaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setForward(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setForward(false);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setClicked(category);
  };

  let title = "";
  if (category === SliderCategory.now_playing) {
    title = "Now Playing";
  } else if (category === SliderCategory.popular) {
    title = "Popular";
  } else if (category === SliderCategory.top_rated) {
    title = "Top Rated";
  } else if (category === SliderCategory.upcoming) {
    title = "Upcoming";
  }
  const boxTransformOrigin = (mapIndex: number) => {
    let number = 0.5;
    if (mapIndex === 0) {
      number = 0;
    } else if (mapIndex === 5) {
      number = 1;
    }
    return { originX: number };
  };
  return (
    <Wrapper>
      <SliderTitle>{title}</SliderTitle>
      <AnimatePresence
        custom={forward}
        initial={false}
        onExitComplete={toggleLeaving}
      >
        <Arrow
          key="SliderArrow"
          variants={arrowVar}
          initial="initial"
          whileHover="hover"
          onClick={decreaseIndex}
          style={{ left: 10 }}
        >
          {"<"}
        </Arrow>
        <Row
          custom={forward}
          variants={rowVar}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movies?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie, mapIndex) => (
              <Box
                layoutId={movie.id + category + ""}
                variants={boxVar}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                key={movie.id}
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
                onClick={() => onBoxClicked(movie.id)}
                style={boxTransformOrigin(mapIndex)}
              >
                <Info variants={infoVar}>
                  {movie.title.length > 35 ? (
                    <InfoTitleLong>{movie.title}</InfoTitleLong>
                  ) : (
                    <InfoTitleShort>{movie.title}</InfoTitleShort>
                  )}
                </Info>
              </Box>
            ))}
        </Row>
        <Arrow
          key="SliderArrow2"
          variants={arrowVar}
          initial="initial"
          whileHover="hover"
          onClick={increaseIndex}
          style={{ right: 10 }}
        >
          {">"}
        </Arrow>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Slider;
