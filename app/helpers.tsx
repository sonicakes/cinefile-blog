import { MdComputer, MdTv, MdHome, MdAirplanemodeActive } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { SiMubi, SiPlex, SiTubi } from "react-icons/si";
import { PiDiscDuotone } from "react-icons/pi";
import { TbPumpkinScary } from "react-icons/tb";

export const getIconByMedium = (medium?: string) => {
  switch (medium?.toLowerCase()) {
    case "youtube":
      return FaYoutube;
    case "plane":
      return MdAirplanemodeActive;
    case "mubi":
      return SiMubi;
    case "shudder":
      return TbPumpkinScary;
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

export const mapStrapiToPosts = (moviesJson: any) => {
  return moviesJson.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    rating: item.rating,
    year: item.year,
    date_reviewed: item.date_reviewed,
    date_watched: item.date_watched,
    meta_title: item.meta_title,
    body_blog: item.body_blog,
    excerpt: item.excerpt,
    director: item.director,
    would_recommend: item.would_recommend,
    would_rewatch: item.would_rewatch,
    review_provided: item.review_provided,
    letterboxd_uri: item.letterboxd_uri,
    image_description: item.image_description,
    img: item.img?.url || item.img?.formats?.medium?.url,
    rating_metric: item.rating_metric,
    quote: item.quote,
    run_time: item.run_time,
    availability: item.availability?.map((vl: any) => ({
      source: vl.source,
      location: vl.location,
    })) || [],
    genres: item.genres?.map((genre: any) => ({
      id: genre.id,
      name: genre.name,
    })) || [],
  }));
};


export const calculateReadingTime = (text: string = "") => {
  const wordsPerMinute = 200;
  const numberOfWords = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return { 
    text: `${minutes} min read`, 
    minutes 
  };
};
