import axios from "axios";

const baseURL = "https://api.consumet.org/";
const corsProxy = "https://cors.consumet.stream/";

export async function getPopularAnime() {
    try {
        const response = await axios.get(`${corsProxy}${baseURL}meta/anilist/popular`);
        return response.data.results;
    } catch (error) {}
}

export async function getTrendingAnime() {
    try {
        const response = await axios.get(`${corsProxy}${baseURL}meta/anilist/trending?`, {
            params: {
                page: 1,
                perPage: 10,
            },
        });
        return response.data.results;
    } catch (error) {}
}

export async function getRecentRelease(currentpage) {
    const perPage = 20;
    try {
        const apiUrl = `${corsProxy}${baseURL}meta/anilist/recent-episodes?page=${currentpage}&perPage=${perPage}&provider=zoro}`;

        const response = await axios.get(apiUrl);

        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
