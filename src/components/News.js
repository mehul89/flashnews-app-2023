import React, { useState, useEffect, useRef } from "react";
import Newsitem from "./Newsitem";
import "../cardstyle.css";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

const News = ({
  country = "us",
  category = "general",
  pageSize = 5,
  darkMode,
  setCurrentPage,
  currentPage, // Add currentPage here
}) => {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const newsContainerRef = useRef(null);

  useEffect(() => {
    document.title = `${category.toUpperCase()} - Flash news`;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, pageSize, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, pageSize, setCurrentPage]);

  const fetchData = async () => {
    try {
      const url = `https://flashnews-api.vercel.app/api/news?country=${country}&category=${category}&pageSize=${pageSize}&currentPage=${currentPage}`;

      // Fetch data from the backend
      const response = await fetch(url);
      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalPages(Math.ceil(parsedData.totalResults / pageSize));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      // Scroll the news container into view when the Next button is clicked
      newsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      // Scroll the news container into view when the Previous button is clicked
      newsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loading && <BarLoader color="#0076bd" height={5} speedMultiplier={0.4} width={5000} />}
      <div ref={newsContainerRef} className="container py-5"> {/* Add the ref */}
        <h1
          className={`text-center heading ${darkMode ? "text-white" : "text-black"}`}
          style={{ margin: "50px" }}
          id="pageHeaderTitle"
        >
          Flash news - top {category} Headlines
        </h1>
        {!loading &&
          articles &&
          articles.map((element) => (
            <div key={element.url}>
              <Newsitem
                title={element.title}
                description={element.description}
                publishedAt={element.publishedAt}
                imgurl={element.urlToImage}
                url={element.url}
                darkMode={darkMode}
              />
            </div>
          ))}

        <div className="d-flex justify-content-between py-5">
          <button className="btn btn-primary" disabled={currentPage === 1} onClick={handlePreviousPage}>
            &laquo; Previous
          </button>
          <button className="btn btn-primary" disabled={currentPage === totalPages} onClick={handleNextPage}>
            Next &raquo;
          </button>
        </div>
      </div>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
  darkMode: PropTypes.bool,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired, // Add currentPage PropTypes
};

export default News;
