import './WinnersDisplay.css';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays winner selection results and countdown animation.
 * Manages final winner presentation and cleanup after selection.
 */

function WinnersDisplay({ winners, countdown, clearSelectedList, originalWinnerIndexList}) {
  
  return (
    <div className="winners-container">
      {/* Active countdown display - shown during selection */}
      {winners.length > 0 && countdown > 0 && <span id="countdown-timer">{countdown}</span>}

      {/* Final winner presentation - appears after countdown completes */}
      {winners.length > 0 && countdown === 0 &&
        <>
          <p id="greeting">Congratulations!</p>

          {/* Winner list management */}
          <button className="list-btn" onClick={clearSelectedList}>Clear List</button>

          {/* Selected winners list */}
          <ol className="winners-list">
              {winners.map((winner, windex) =>
                <li className="winners-list-item" key={windex}>
                  {winner}

                  {/* Display winner's original index number of participants list */}
                  <span className="winners-original-index">{originalWinnerIndexList[windex]}</span>
                </li>
              )}
          </ol>
        </>
      }
    </div>
  );
}

WinnersDisplay.propTypes = {
  // Array of selected winner names
  winners: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Current countdown value (0 = selection complete)
  countdown: PropTypes.number.isRequired,
  // Clears winners from parent component state
  clearSelectedList: PropTypes.func.isRequired,
  // Winner's original index number of participants list
  originalWinnerIndexList: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default WinnersDisplay;