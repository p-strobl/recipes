import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Class from "classnames";
import uuidv4 from "uuid/v4";

import "./WheelInput.scss";
import { ArrowButton } from "./ArrowButton";
import { WheelElements } from "./WheelElements";

export const WheelInput = ({ ownState, calculatorIndex, setGlobalCalculatorState }) => {
  const [wheelValue, setWheelValue] = useState(Object.values(ownState)[0].value);
  const wheelContext = Object.keys(ownState)[0];
  const wheelRange = Object.values(ownState)[0].range;
  const inputWheelRef = useRef(null);
  let wheel = null;
  let observer = null;

  function focusDefaultValue() {
    if (typeof wheelValue === "undefined") return;

    wheel[wheelValue].focus();
  }

  function removeActiveClassFromAllWheels(entry) {
    if (typeof entry === "undefined") return;

    const wheelElements = entry.parentNode.querySelectorAll(".Wheel__Number");
    wheelElements.forEach((element) => {
      element.classList.remove("Wheel__Number--Active");
    });
  }

  function addActiveClassToWheel(entry) {
    if (typeof entry === "undefined") return;

    entry.classList.add("Wheel__Number--Active");
  }

  function handleWheelIntersection(entry) {
    if (typeof entry === "undefined") return;

    removeActiveClassFromAllWheels(entry);

    setWheelValue(parseInt(entry.textContent, 10));
    setGlobalCalculatorState({ wheelValue, wheelContext, calculatorIndex });

    addActiveClassToWheel(entry);
  }

  function observerIsIntersecting(entries) {
    if (typeof entries === "undefined") return;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      handleWheelIntersection(entry.target);
    });
  }

  function initIntersectionObserver() {
    observer = new IntersectionObserver(observerIsIntersecting, {
      root: inputWheelRef.current,
      threshold: [0.9],
    });

    wheel.forEach((element) => {
      if (typeof element === "undefined") return;

      observer.observe(element);
    });
  }

  function clearInputWheelObserver() {
    wheel.forEach((element) => {
      if (typeof element === "undefined") return;

      observer.unobserve(element);
    });
  }

  useEffect(() => {
    wheel = inputWheelRef.current.querySelectorAll(".Wheel__Number");

    initIntersectionObserver();
    focusDefaultValue();

    return () => {
      clearInputWheelObserver();
    };
  }, [wheelValue]);

  return (
    <div className={Class("WheelContainer")} key={uuidv4()} ref={inputWheelRef}>
      <ArrowButton direction="Prev" wheel={inputWheelRef} />
      <WheelElements wheelContext={wheelContext} range={wheelRange} />
      <ArrowButton direction="Next" wheel={inputWheelRef} />
    </div>
  );
};

WheelInput.defaultProps = {
  ownState: {},
  calculatorIndex: 0,
  setGlobalCalculatorState: () => {},
};

WheelInput.propTypes = {
  ownState: PropTypes.PropTypes.objectOf(PropTypes.object),
  calculatorIndex: PropTypes.number,
  setGlobalCalculatorState: PropTypes.func,
};