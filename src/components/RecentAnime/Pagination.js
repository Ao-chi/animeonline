import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ totalPages, currentPage, handlePagination }) => {
    const displayPages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
    const endPage = Math.min(totalPages, startPage + displayPages - 1);

    const handlePageClick = (currentPage) => {
        handlePagination(currentPage);
    };

    const renderPaginationLinks = () => {
        const links = [];

        if (currentPage > 1) {
            links.push(
                <li key="previous" className="pagination__links">
                    <a href="#!" onClick={() => handlePageClick(currentPage - 1)}>
                        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                    </a>
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            links.push(
                <li key={i} className={`pagination__links ${i === currentPage ? "active" : ""}`}>
                    <a href="#!" onClick={() => handlePageClick(i)}>
                        {i}
                    </a>
                </li>
            );
        }

        if (currentPage < totalPages) {
            links.push(
                <li key="next" className="pagination__links">
                    <a href="#!" onClick={() => handlePageClick(currentPage + 1)}>
                        <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                    </a>
                </li>
            );
        }

        return links;
    };

    return <ul className="pagination">{renderPaginationLinks()}</ul>;
};

export default Pagination;
