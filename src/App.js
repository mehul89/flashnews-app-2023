import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#110f16";
    } else {
      document.body.style.backgroundColor = "aliceblue";
    }
  }, [darkMode, currentPage]); // Add currentPage as a dependency

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Router>
        <Navbar
          handleDarkModeToggle={handleDarkModeToggle}
          darkMode={darkMode}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="general"
                category="general"
                darkMode={darkMode}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="business"
                category="business"
                darkMode={darkMode}
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="entertainment"
                category="entertainment"
                darkMode={darkMode}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="health"
                category="health"
                darkMode={darkMode}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="science"
                category="science"
                darkMode={darkMode}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="sports"
                category="sports"
                darkMode={darkMode}
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                country="us"
                key="technology"
                category="technology"
                darkMode={darkMode}
              />  
            }
          />
        </Routes>
      </Router>
      <Footer darkMode={darkMode} />
    </>
  );
}

export default App;
