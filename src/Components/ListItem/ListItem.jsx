import './ListItem.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Reusable list item component with movement controls and visual state indicators
function ListItem({
  list,
  item,
  index,
  moveUp,
  moveDown,
  removeItem,
  isWinner,
  isInRange,
  isReplacePosition
}) {

  return (
    <li
      className={`
        list-item
        ${isWinner ? 'selected' : ''}      // Highlight winning entries
        ${isInRange ? 'remove-range-highlight' : ''}      // Visual range selection for deletion
        ${isReplacePosition ? 'add-replace-highlight' : ''}      // Highlight position for add/replace operations
      `}
    >
      {/* List item text */}
      <span className="list-text">{item}</span>
      
      {/* List item controls */}
      <button
        onClick={() => moveUp(index)}
        disabled={index === 0} // Disable when at the top of participants list
      >
        <FontAwesomeIcon icon={faAngleUp} className="move-icon"/>
      </button>
      <button
        onClick={() => moveDown(index)}
        disabled={index === list.length - 1} // Disable when at the end of participants list
      >
        <FontAwesomeIcon icon={faAngleDown} className="move-icon"/>
      </button>
      <button
        onClick={() => removeItem(index)}
      >
        <FontAwesomeIcon icon={faTrash} className="remove-icon"/>
      </button>
    </li>
  );
}

ListItem.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired, // Participants list
  item: PropTypes.string.isRequired, // List item text
  index: PropTypes.number.isRequired,
  moveUp: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  isWinner: PropTypes.bool.isRequired, // Highlight when item is a winner
  isInRange: PropTypes.bool.isRequired, // Highlight when item is in a removal range selection
  isReplacePosition: PropTypes.bool.isRequired, // Mark position targeted by replace/add operations
}

export default ListItem;