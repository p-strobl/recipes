import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CalculatorContext = createContext(null);

export default function CalculatorStore({ children }) {
  const [rollCount, setRollCount] = useState("");
  const [sheetCount, setSheetCount] = useState("");
  const [layerCount, setLayerCount] = useState("");
  const [price, setPrice] = useState(0);

  const calculatorStore = {
    rollCountContext: [rollCount, setRollCount],
    sheetCountContext: [sheetCount, setSheetCount],
    layerCountContext: [layerCount, setLayerCount],
    priceContext: [price, setPrice],
  };

  return (
    <CalculatorContext.Provider value={calculatorStore}>
      {children}
    </CalculatorContext.Provider>
  );
}

CalculatorStore.displayName = "CalculatorStore";

CalculatorStore.defaultProps = {
  children: PropTypes.element,
};

CalculatorStore.propTypes = {
  children: PropTypes.element,
};