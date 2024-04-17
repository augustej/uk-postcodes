import { renderHook, act } from "@testing-library/react";
import useShowDetailsClicked from "./useShowDetailsClicked";

describe("useShowDetailsClicked", () => {
  it("should initialize showDetailsClicked to false", () => {
    const { result } = renderHook(() => useShowDetailsClicked(null));
    expect(result.current).toBe(false);
  });

  it("should toggle showDetailsClicked when button is clicked", () => {
    const elementRef = { current: document.createElement("div") };
    const { result } = renderHook(() => useShowDetailsClicked(elementRef));

    act(() => {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      const button = document.createElement("button");
      button.classList.add("show-details-button");
      elementRef.current.appendChild(button);
      button.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
  });

  it("should not toggle showDetailsClicked when non-button element is clicked", () => {
    const elementRef = { current: document.createElement("div") };
    const { result } = renderHook(() => useShowDetailsClicked(elementRef));

    act(() => {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      const div = document.createElement("div");
      elementRef.current.appendChild(div);
      div.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });

  it("should remove event listener when unmounted", () => {
    const elementRef = { current: document.createElement("div") };
    const removeEventListener = jest.spyOn(
      elementRef.current,
      "removeEventListener"
    );

    const { unmount } = renderHook(() => useShowDetailsClicked(elementRef));

    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });
});
