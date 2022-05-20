import { atom } from "recoil";

export enum SliderCategory {
  "now_playing" = "now_playing",
  "popular" = "popular",
  "top_rated" = "top_rated",
  "upcoming" = "upcoming",
}

export const clickedCategory = atom<SliderCategory>({
  key: "clickedCategory",
  default: SliderCategory.now_playing,
});
