import './ParticipantsList.css';
import React from 'react';
import ListItem from '../ListItem/ListItem.jsx';
import PropTypes from 'prop-types';

/**
 * Manages display and interaction with the participants list.
 * Handles conditional rendering of controls based on selection states
 * and synchronizes visual feedback for list operations.
 */

function ParticipantsList({
  list,
  winners,
  countdown,
  shuffleList,
  setList,
  removeSelectedItems,
  moveUp,
  moveDown,
  removeItem,
  removeFrom,
  removeTo,
  replaceNum
}) {
  return (
    <div className="list-container">
      {/* List controls */}

      {/* Shuffle appears only when list can be reordered */}
      {list.length > 1 && !winners.some(i => list.includes(i)) &&
        <button id="shuffle-btn" className="list-btn" onClick={shuffleList}>
          Shuffle
        </button>
      }

      {/* Clear list allowed except during active winner selection */}
      {list.length > 0 && (!winners.some(i => list.includes(i)) || countdown === 0) &&
        <button className="list-btn" onClick={() => {setList([])}}>
          Clear List
        </button>
      }

      {/* Winner removal from the participants list only available after selection completes */}
      {winners.length > 0 && countdown === 0 && winners.some(i => list.includes(i)) &&
        <button id="remove-selected-btn" className="list-btn" onClick={removeSelectedItems}>
          Remove Selected
        </button>
      }
                    
      {/* Total participants display */}
      {list.length > 0 &&
        <span id="total-participants">
          {`Participants: ${list.length}`}
        </span>
      }

      {/* Participants list */}
      <ul className="participants-list">
        {list.map((item, index) =>
          <ListItem
            key={index}
            list={list}
            item={item}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
            removeItem={removeItem}
            isWinner={winners.includes(item) && countdown === 0}
            isInRange={removeFrom <= index + 1 && index + 1 <= removeTo}
            isReplacePosition={index + 1 === replaceNum}
          />
        )}
      </ul>
    </div>
  );
}

ParticipantsList.propTypes = {
  // Current list of participants
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Selected winners list
  winners: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Active countdown timer value
  countdown: PropTypes.number.isRequired,
  // Range boundaries for bulk removal
  removeFrom: PropTypes.number.isRequired,
  removeTo: PropTypes.number.isRequired,
  // Position for add/replace operations
  replaceNum: PropTypes.number.isRequired,
  // List manipulation functions
  shuffleList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
  removeSelectedItems: PropTypes.func.isRequired,
  moveUp: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
}

export default ParticipantsList;