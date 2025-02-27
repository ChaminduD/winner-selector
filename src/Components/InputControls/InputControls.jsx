import './InputControls.css';
import React from 'react';
import NumberInput from '../NumberInput/NumberInput.jsx';
import PropTypes from 'prop-types';

/** InputControls component handles all user interactions for:
 * Adding/replacing items in the list
 * Removing item ranges
 * Setting countdown timer
 * Choosing number of winners
 * Displaying errors and control buttons
 */

function InputControls({
  list,
  winners,
  replaceNum,
  setReplaceNumber,
  setError,
  newItem,
  setNewItem,
  addNewItem,
  replaceItem,
  removeFrom,
  setRemoveFrom,
  removeTo,
  setRemoveTo,
  removeItemsRange,
  countdown,
  setCountdown,
  winnerCount,
  setWinnerCount,
  error,
  selectWinners,
  reset
}) {
  return (
    // Add, Replace, Range Remove, Countdown & Number of Winners interface
    <div className="input-container">
      {/* Main interface only shown when no winners have been selected yet */}
      {winners.length === 0 &&
        <>
          {/* Add & Replace */}
          <div className="add-replace-container">
            {/* Number input for position */}
            <NumberInput
              value={replaceNum}
              setValue={setReplaceNumber}
              min={0}
              max={list.length}
              placeholder="#"
              setError={setError}
            />
            {/* Text input for new item */}
            <input
              type="text"
              value={newItem}
              placeholder="Type here..."
              onChange={(event) => {
                setNewItem(event.target.value);
                setError("");
              }}
            />
            {/* Action buttons */}
            <button id="add-btn" onClick={addNewItem}>Add</button>
            <button id="replace-btn" onClick={replaceItem}>Replace</button>
          </div>
                    
          {/* Range Remove, Countdown & Number of Winners */}
          <div className="remove-and-counter-container">
            {/* Range Remove */}
            <div className="remove-range-container">
              {/* Number input for range start */}
              <NumberInput
                id="range-from-input"
                label="Range From"
                value={removeFrom}
                setValue={setRemoveFrom}
                min={0}
                max={list.length - 1}
                placeholder="#"
                setError={setError}
              />
              {/* Number input for range end */}
              <NumberInput
                id="range-to-input"
                label="To"
                value={removeTo}
                setValue={setRemoveTo}
                min={0}
                max={list.length}
                placeholder="#"
                setError={setError}
              />
              {/* Action button */}
              <button id="remove-btn" onClick={removeItemsRange}>Remove</button>
            </div>

            {/* Countdown & Number of Winners */}
            <div className="winner-counter-container">
              {/* Number input for countdown */}
              <NumberInput
                id="countdown-input"
                label="Countdown Time"
                value={countdown}
                setValue={setCountdown}
                min={0}
                max={60}
                placeholder="Sec"
                setError={setError}
              />
              {/* Number input for number of winners */}
              <NumberInput
                id="winner-count-input"
                label="Winners"
                value={winnerCount}
                setValue={setWinnerCount}
                min={0}
                max={list.length || 1}
                placeholder="#"
                setError={setError}
              />
            </div>
          </div>
        </>
      }

      {/* Error display - shows validation messages from user actions */}
      {error && <span id="error-message">{error}</span>}

      {/* Control buttons */}
      <div className="selector-container">
        {winners.length === 0 && 
          <button id="select-btn" onClick={selectWinners}>Select</button>
        }
                        
        <button id="reset-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

InputControls.propTypes = {
  // Array of participants strings
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Array of selected winner strings
  winners: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Index position for item replacement
  replaceNum: PropTypes.number.isRequired,
  // Range boundaries for bulk removal
  removeFrom: PropTypes.number.isRequired,
  removeTo: PropTypes.number.isRequired,
  // Countdown duration in seconds
  countdown: PropTypes.number.isRequired,
  // Number of winners to select
  winnerCount: PropTypes.number.isRequired,
  // Current new item input value
  newItem: PropTypes.string.isRequired,
  // Validation error message
  error: PropTypes.string.isRequired,
  // State setters (self-explanatory by name)
  setReplaceNumber: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setNewItem: PropTypes.func.isRequired,
  setRemoveFrom: PropTypes.func.isRequired,
  setRemoveTo: PropTypes.func.isRequired,
  setCountdown: PropTypes.func.isRequired,
  setWinnerCount: PropTypes.func.isRequired,
  // Action handlers
  addNewItem: PropTypes.func.isRequired,
  replaceItem: PropTypes.func.isRequired,
  removeItemsRange: PropTypes.func.isRequired,
  selectWinners: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default InputControls;