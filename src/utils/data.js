import axios from "axios";
import { BASE_URL } from "../constants";

// const baseURL = "https://api.consumet.org/";
// const baseURL = "http://localhost:3001/api.animeonline";
// const corsProxy = "https://cors.consumet.stream/";

export async function getPopularAnime() {
    try {
        const response = await axios.get(`${BASE_URL}/popular`);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

export async function getTrendingAnime() {
    try {
        const response = await axios.get(`${BASE_URL}/trending?`, {
            params: {
                page: 1,
                perPage: 10,
            },
        });
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentRelease(currentpage) {
    const perPage = 20;
    try {
        const apiUrl = `${BASE_URL}meta/anilist/recent-episodes?page=${currentpage}&perPage=${perPage}&provider=gogoanime}`;

        const response = await axios.get(apiUrl);

        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
