import {
  Roboto_Serif,
  Montserrat,
  Pacifico,
  Balsamiq_Sans,
} from "next/font/google";

export const robotoserifFont = Roboto_Serif({
  weight: "500",
  subsets: ["latin"],
});
export const robotoserifItalicsFont = Roboto_Serif({
  weight: "500",
  subsets: ["latin"],
  style: "italic",
});

export const monserratFont = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const pacificoFont = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export const balsamiqsansFont = Balsamiq_Sans({
  weight: "400",
  subsets: ["latin"],
});
