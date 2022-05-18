import { atom } from "recoil";

export enum SliderCategory {
  "now_playing",
  "latest",
}

export const nowPlayingIndex = atom({
  key: "nowPlayingIndex",
  default: 0,
});
export const latestIndex = atom({
  key: "latestIndex",
  default: 0,
});
