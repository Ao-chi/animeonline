import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header";
import Home from "./components/Home";
import Animeinfopage from "./pages/AnimeInfopage/Animeinfopage";
import SearchResults from "./pages/SearchResultspage/SearchResults";
import WatchPage from "./pages/WatchPage/WatchPage";

function App() {
    const instance = axios.create({
        baseURL: "https://api.consumet.org/meta/anilist/",
    });

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home instance={instance} />}></Route>
                    <Route
                        path="/info/:animeId"
                        element={<Animeinfopage instance={instance} />}
                    ></Route>
                    <Route
                        path="/search/:searchQuery"
                        element={<SearchResults instance={instance} />}
                    ></Route>
                    <Route
                        path="/watch/:animeId"
                        element={<WatchPage instance={instance} />}
                    ></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
