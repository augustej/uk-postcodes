import { useState, useEffect } from "react";

function useShowDetailsClicked(elementRef) {
  const [showDetailsClicked, setShowDetailsClicked] = useState(false);

  useEffect(() => {
    const buttonClickHandler = (event) => {
      if (event.target.classList.contains("show-details-button")) {
        setShowDetailsClicked((prevState) => !prevState);
      }
    };

    if (!elementRef || !elementRef.current) return;

    const element = elementRef.current;
    element.addEventListener("click", buttonClickHandler);

    return () => {
      element.removeEventListener("click", buttonClickHandler);
    };
  }, [elementRef]);

  return showDetailsClicked;
}

export default useShowDetailsClicked;
