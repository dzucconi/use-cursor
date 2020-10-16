import React, { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCursor } from "./useCursor";
import { render, act as action } from "@testing-library/react";

describe("useCursor", () => {
  it("initially returns `0`", () => {
    const { result } = renderHook(() => useCursor({ max: 10 }));

    expect(result.current.cursor).toBe(0);
    expect(result.current.index).toBe(0);
  });

  it("accepts an `initialCursor`", () => {
    const { result } = renderHook(() =>
      useCursor({ max: 10, initialCursor: 99 })
    );

    expect(result.current.cursor).toBe(99);
    expect(result.current.index).toBe(9);
  });

  it("increments the values by `1` when `handleNext` is invoked", () => {
    const { result } = renderHook(() => useCursor({ max: 10 }));

    expect(result.current.cursor).toBe(0);
    expect(result.current.index).toBe(0);

    act(() => result.current.handleNext());

    expect(result.current.cursor).toBe(1);
    expect(result.current.index).toBe(1);

    act(() => result.current.handleNext());

    expect(result.current.cursor).toBe(2);
    expect(result.current.index).toBe(2);
  });

  it("decrements the values by `1` when `handlePrev` is invoked", () => {
    const { result } = renderHook(() =>
      useCursor({ max: 10, initialCursor: 5 })
    );

    expect(result.current.cursor).toBe(5);
    expect(result.current.index).toBe(5);

    act(() => result.current.handlePrev());

    expect(result.current.cursor).toBe(4);
    expect(result.current.index).toBe(4);

    act(() => result.current.handlePrev());

    expect(result.current.cursor).toBe(3);
    expect(result.current.index).toBe(3);
  });

  it("rolls over to the beginning", () => {
    const { result } = renderHook(() =>
      useCursor({ max: 10, initialCursor: 9 })
    );

    expect(result.current.cursor).toBe(9);
    expect(result.current.index).toBe(9);

    act(() => result.current.handleNext());

    expect(result.current.cursor).toBe(10);
    expect(result.current.index).toBe(0);

    act(() => result.current.handleNext());

    expect(result.current.cursor).toBe(11);
    expect(result.current.index).toBe(1);
  });

  it("rolls under to the end", () => {
    const { result } = renderHook(() => useCursor({ max: 10 }));

    expect(result.current.cursor).toBe(0);
    expect(result.current.index).toBe(0);

    act(() => result.current.handlePrev());

    expect(result.current.cursor).toBe(-1);
    expect(result.current.index).toBe(9);

    act(() => result.current.handlePrev());

    expect(result.current.cursor).toBe(-2);
    expect(result.current.index).toBe(8);
  });

  it("updates the `cursor` if the `initialCursor` changes", () => {
    const Example = () => {
      const [nextCursor, setNextCursor] = useState(99);
      const { index, cursor } = useCursor({
        max: 10,
        initialCursor: nextCursor,
      });
      return (
        <>
          <button data-testid="button" onClick={() => setNextCursor(10)}>
            click
          </button>
          <div data-testid="index">{index}</div>
          <div data-testid="cursor">{cursor}</div>
        </>
      );
    };

    const { getByTestId } = render(<Example />);

    expect(getByTestId("index").textContent).toBe("9");
    expect(getByTestId("cursor").textContent).toBe("99");

    action(() => getByTestId("button").click());

    expect(getByTestId("index").textContent).toBe("0");
    expect(getByTestId("cursor").textContent).toBe("10");
  });
});
