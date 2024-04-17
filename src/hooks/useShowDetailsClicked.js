import { useState, useEffect } from "react";

function useShowDetailsClicked() {
  const [showDetailsClicked, setShowDetailsClicked] = useState(false);

  useEffect(() => {
    const buttonClickHandler = (event) => {
      const target = event.target;
      if (target.classList.contains("show-details-button")) {
        setShowDetailsClicked((prevState) => !prevState);
      }
    };

    const searchHistory = document.querySelector(".search-history");
    if (!searchHistory) return;

    searchHistory.addEventListener("click", buttonClickHandler);

    return () => {
      searchHistory.removeEventListener("click", buttonClickHandler);
    };
  }, []);

  return showDetailsClicked;
}

export default useShowDetailsClicked;
