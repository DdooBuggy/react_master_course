import { atom } from "recoil";

export enum SliderCategory {
  "now_playing" = "now_playing",
  "popular" = "popular",
  "top_rated" = "top_rated",
  "upcoming" = "upcoming",
  "airing_today" = "airing_today",
  "on_the_air" = "on_the_air",
}

export const clickedCategory = atom<SliderCategory>({
  key: "clickedCategory",
  default: SliderCategory.now_playing,
});
