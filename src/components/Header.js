import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import iconBrand from "../assets/images/Logoicon.svg";
import Search from "./Searchform";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSeacrhOpen, setisSearchOpen] = useState(false);

    const handleNavClick = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleSearch = () => {
        setisSearchOpen(!isSeacrhOpen);
    };

    useEffect(() => {
        const header = document.querySelector(".header");
        const searchForm = document.querySelector("#searchAni");

        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsScrolled(true);
                header.classList.add("sticky");
                searchForm.classList.remove("active");
            } else if (window.scrollY <= 0) {
                setIsScrolled(false);
                header.classList.remove("sticky");
                searchForm.classList.add("active");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled || isSeacrhOpen ? "sticky " : ""}`}>
            <div className="container">
                <button
                    className={`hamburger${isNavOpen ? " active" : ""}`}
                    id="hamburgerMenu"
                    type="button"
                    aria-label="hamburger menu"
                    aria-expanded="false"
                    onClick={handleNavClick}
                >
                    <div className="hamburger__lines"></div>
                    <div className="hamburger__lines"></div>
                    <div className="hamburger__lines"></div>
                </button>
                <div className="header__brand">
                    <Link to="/">
                        <img
                            className="header__icon"
                            src={iconBrand}
                            alt="logo"
                            aria-label="animeonline-logo"
                        />
                    </Link>
                </div>

                <nav
                    className={`nav ${isNavOpen ? "show" : ""}`}
                    id="navMobile"
                    aria-hidden={`${isNavOpen ? "false" : "true"}`}
                >
                    <ul className="nav-list">
                        <li className="nav-list__items">
                            <NavLink to="/" className="nav-list__links">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-list__items">
                            <a className="nav-list__links" href="#">
                                Popular
                            </a>
                        </li>
                    </ul>
                </nav>
                <Search className={isSeacrhOpen ? " show" : ""} />
                <div className="mobile-search">
                    <button
                        className={`search_btn mobile-search__btn ${isSeacrhOpen ? "open" : ""}`}
                        id="mobileSearch"
                        type="button"
                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon icon={faSearch} className=""></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
