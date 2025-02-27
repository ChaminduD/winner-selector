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
    max,
    placeholder,
    setError
}){
    // Increment value while respecting minimum
    function handleIncrement(){
        setValue(prevValue => Math.min(max, prevValue + 1));
        setError("");
    }

    // Decrement value while respecting minimum
    function handleDecrement(){
        setValue(prevValue => Math.max(min, prevValue - 1));
        setError("");
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
                max={max}
                placeholder={placeholder}
                onChange={(event) => {
                    // Parse input and enforce minimum and maximum values
                    const value = Math.max(min, parseInt(event.target.value) || min);
                    // Check input number with maximum value
                    if(max <= value){
                        setValue(max);
                    }else{
                        setValue(value);
                    }
                    
                    setError("");
                }}
            />

            {/* Increment/decrement controls */}
            <div className="arrow-container">
                <button
                    className="increment"
                    onClick={handleIncrement}
                    disabled={value >= max} // Disable when at maximum
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
    max: PropTypes.number.isRequired,
    placeholder: PropTypes.string, // Input hint text
    setError: PropTypes.func.isRequired
}

export default NumberInput;