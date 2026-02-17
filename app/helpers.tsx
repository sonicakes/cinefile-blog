import { MdComputer, MdTv, MdHome, MdAirplanemodeActive } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { SiMubi, SiPlex, SiTubi } from "react-icons/si";
import { PiDiscDuotone } from "react-icons/pi";

export const getIconByMedium = (medium: string) => {
  switch (medium.toLowerCase()) {
    case "youtube":
      return FaYoutube;
    case "plane":
      return MdAirplanemodeActive;
    case "mubi":
      return SiMubi;
    case "plex":
      return SiPlex;
    case "tubi":
      return SiTubi;
    case "dvd":
    case "library dvd":
    case "home dvd":
      return PiDiscDuotone;
    case "tv":
    case "television":
      return MdTv;
    case "pc":
    case "home collection":
    case "home movies":
    case "home":
      return MdHome;
    default:
      return MdComputer;
  }
};
