import axios from "axios";
import { youtube_parser } from "../utils/youtube-parser";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

const request = async (url : string) => {

    const youtubeID = youtube_parser(url);
    
    const options = {
        method: 'GET',
        url: API_URL,
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
        params: {
          id: youtubeID
        }
    };

    const response = await axios(options);
    
    return response.data.link;
};

export default request;