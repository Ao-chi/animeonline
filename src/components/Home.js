import axios from "axios";
import { useEffect, useState } from "react";

import { getPopularAnime, getTrendingAnime } from "../utils/data";
import PopularAnime from "./PopularAnimes";
import RecentAnime from "./RecentAnime/RecentAnime";
import TrendingAnime from "./TrendingAnime/TrendingAnime";

const Home = ({ instance }) => {
    // const baseURL = "https://api.consumet.org/";

    const [popularAnime, setPopularAnime] = useState([]);
    const [trendingAnime, setTrendingAnime] = useState([]);
    const [recentAnime, setRecentAnime] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularAni = async () => {
            try {
                const response = await getPopularAnime();
                setPopularAnime(response);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPopularAni();
    }, []);

    useEffect(() => {
        const fetchTrendAni = async () => {
            try {
                const response = await getTrendingAnime();
                setTrendingAnime(response);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTrendAni();
    }, []);

    useEffect(() => {
        const perPage = 20;
        const fetchRecentAni = async () => {
            try {
                // const response = await axios.get(
                //     `https://cors.consumet.stream/https://api.consumet.org/meta/anilist/recent-episodes?page=${currentPage}&perPage=${perPage}&provider=zoro`
                // );
                const response = await axios.get(
                    `https://api.consumet.org/meta/anilist/recent-episodes?`,
                    {
                        params: {
                            page: `${currentPage}`,
                            perPage: `${perPage}`,
                            provider: "zoro",
                        },
                    }
                );
                setRecentAnime(response.data.results);
                const sumPages = Math.ceil(response.data.totalResults / perPage);
                setTotalPages(sumPages);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRecentAni();
    }, [currentPage]);

    function handlePagination(currentPage) {
        setCurrentPage(currentPage);
    }

    return (
        <main className="home-main">
            <PopularAnime popularAnime={popularAnime} />
            <TrendingAnime loading={loading} trendingAnime={trendingAnime} />
            <RecentAnime
                loading={loading}
                recentAnime={recentAnime}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePagination={handlePagination}
            />
        </main>
    );
};

export default Home;
