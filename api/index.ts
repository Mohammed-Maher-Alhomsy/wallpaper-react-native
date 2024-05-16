import axios from "axios";

import { Images } from "@/types";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";

  if (!params) {
    return url;
  }

  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  return url;
};

export const apiCall = async (params) => {
  try {
    const { data } = await axios.get<Images>(formatUrl(params));
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
