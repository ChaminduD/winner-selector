import './NumberInput.css';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown} from  '@fortawesome/free-solid-svg-icons';

// Reusable number input component with increment/decrement controls
// Handles validation, error states, and minimum value enforcement
function NumberInput({
    id,
    label,
    value,
    setValue,
    min,
    placeholder,
    setError,
    isExceeds
}){
    // Increment value while respecting minimum
    function handleIncrement(){
        setValue(prevValue => {
            const newValue = Math.max(min, prevValue + 1);
            setError(""); // Clear any existing errors
            return newValue;
        });
    }

    // Decrement value while respecting minimum
    function handleDecrement(){
        setValue(prevValue => {
            const newValue = Math.max(min, prevValue - 1);
            setError(""); // Clear any existing errors
            return newValue;
        });
    }

    return(
        <div className="number-input-container">
            {/* Optional label */}
            {label && <label htmlFor={id}>{label}</label>}
            
            {/* Main input field */}
            <input
                id={id}
                type="number"
                value={value || ""} // Show empty string for 0 values
                min={min}
                placeholder={placeholder}
                onChange={(event) => {
                    // Parse input and enforce minimum value
                    const value = Math.max(min, parseInt(event.target.value) || min);
                    setValue(value);
                    setError("");
                }}
            />

            {/* Increment/decrement controls */}
            <div className="arrow-container">
                <button
                    className="increment"
                    onClick={handleIncrement}
                    disabled={isExceeds}
                >
                    <FontAwesomeIcon icon={faAngleUp} className="arrow-icon"/>
                </button>
                <button
                    className="decrement"
                    onClick={handleDecrement}
                    disabled={value <= min} // Disable when at minimum
                >
                    <FontAwesomeIcon icon={faAngleDown} className="arrow-icon"/>
                </button>
            </div>
        </div>
    );
}

NumberInput.propTypes = {
    id: PropTypes.string, // Optional ID for label association
    label: PropTypes.string, // Optional display label
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    placeholder: PropTypes.string, // Input hint text
    setError: PropTypes.func.isRequired,
    isExceeds: PropTypes.bool // Optional boolean prop for increment control
}

NumberInput.defaultProps = {
    isExceeds: false // Default increment button not disabled
};

export default NumberInput;