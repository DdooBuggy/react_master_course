import { atom } from "recoil";

export enum SliderCategory {
  "now_playing" = "now_playing",
  "popular" = "popular",
}

export const nowPlayingIndex = atom({
  key: "nowPlayingIndex",
  default: 0,
});
export const latestIndex = atom({
  key: "latestIndex",
  default: 0,
});
