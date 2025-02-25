import './WinnerSelector.css';
import React, { useState, useEffect } from 'react';
import Confetti from '../Confetti/Confetti.jsx';
import InputControls from '../InputControls/InputControls.jsx';
import WinnersDisplay from '../WinnersDisplay/WinnersDisplay.jsx';
import ParticipantsList from '../ParticipantsList/ParticipantsList.jsx';

function WinnerSelector(){
    const [list, setList] = useState([]); // Main list of participants
    const [newItem, setNewItem] = useState(""); // Input for new items(participants)
    const [winnerCount, setWinnerCount] = useState(1); // Number of winners to select
    const [winners, setWinners] = useState([]); // Selected list of winners
    const [error, setError] = useState(""); // Store error message
    const [removeFrom, setRemoveFrom] = useState(0); // Input for start number of the range remove
    const [removeTo, setRemoveTo] = useState(0); // Input for end number of the range remove
    const [replaceNum, setReplaceNumber] = useState(0); // Input for replace position number
    const [selected, setSelected] = useState(false); // Store if selected the winners
    const [countdown, setCountdown] = useState(10); // Input for countdown timer
    const [prevCountdown, setPrevCountdown] = useState(0); // Store countdown when the user select winners
    const [prevWinnerCount, setPrevWinnerCount] = useState(0); // Store number of winners the user entered
    const [originalWinnerIndexList, setOriginalWinnerIndexList] = useState([]); // Original position numbers of winners

    // Countdown timer effect
    useEffect(() => {
        if(!selected || countdown === 0) return;

        // Set up interval to decrement countdown every second
        const intervalId = setInterval(() => setCountdown(c => c - 1), 1000);

        // Cleanup interval on unmount or dependency change
        return () => clearInterval(intervalId);
    }, [selected, countdown]);

    // Function: Add new item to list
    function addNewItem(){
        if(!newItem.trim()){ // Check empty input
            setError("Please type something to add!");
        }else if(list.includes(newItem)){ // Check for duplicates
            setError("It is already added!");
        }else if(replaceNum === 0){ // Add to end if no position specified
            setList(l => [...l, newItem]);
            setNewItem("");
            setError("");
        }else if(replaceNum < 1){ // Check position number 
            setError("Add number must be at least 1 or keep it blank!");
        }else if(replaceNum > list.length + 1){ 
            setError(`Add number must be between 1 and ${list.length + 1}`);
        }else{
            // Add item at specified position
            const newList = [...list];
            newList.splice(replaceNum - 1, 0, newItem)
            setList(newList);
            // Reset inputs
            setNewItem("");
            setReplaceNumber(0);
            setError("");
        }
    }

    // Function: Remove an item
    function removeItem(index){
        setList(list.filter((_, i) => i !== index)); // Filter all items except this item
    }

    // Function: Select all the winners
    function selectWinners(){
        if(list.length === 0){ // Check if no participants
            setError("List is empty!");
        }else if(winnerCount === 0){ // Check if no number of winners entered
            setError("Please enter the number of winners you want!");
        }else if(winnerCount > list.length || winnerCount < 1){ // Check number of winners valid
            setError(`Number of winners must be between 1 and ${list.length}`);
        }else if(list.length === 1){ // Check if only a participant
            setError("Please add more participants!");
        }else if(winnerCount === list.length){ 
            setError("Not everyone can be a winner!");
        }else if(countdown <= 0){
            setError("Please enter valid countdown seconds!");
        }else{
            const duplicateList = [...list];
            for(let i = duplicateList.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [duplicateList[i], duplicateList[j]] = [duplicateList[j], duplicateList[i]]; // Shuffle duplicate list by swapping current index with random index
            }
            setWinners(duplicateList.slice(0, winnerCount)); // Select number of winners
            setSelected(true);
            setPrevCountdown(countdown);
            setPrevWinnerCount(winnerCount);
            // Reset inputs
            setNewItem("");
            setRemoveFrom(0);
            setRemoveTo(0);
            setReplaceNumber(0);
            setError("");

            // Finds original position in main list for each winner
            const newIndexes = duplicateList.slice(0, winnerCount).map(winner => 
                list.indexOf(winner) + 1
            );
            setOriginalWinnerIndexList(newIndexes);
        }
    }

    // Function: Reset all
    function reset(){
        setList([]);
        setNewItem("");
        setWinnerCount(1);
        setWinners([]);
        setError("");
        setRemoveFrom(0);
        setRemoveTo(0);
        setReplaceNumber(0);
        setSelected(false);
        setCountdown(10);
        setPrevCountdown(0);
        setPrevWinnerCount(0);
        setOriginalWinnerIndexList([]);
    }

    // Function: Remove range of items
    function removeItemsRange(){
        if(list.length === 0){ // Check if no participants
            setError("List is empty!");
        }else if(removeFrom === 0 || removeTo === 0){ // Check empty range inputs
            setError("Please enter the range you want to remove!");
        }else if(removeFrom < 1){ // Check range start number minimum
            setError(`"Range From" must be at least 1`);
        }else if(removeTo < 2){ // Check range end number minimum
            setError(`"Range To" must be at least 2`);
        }else if(removeFrom > list.length || removeTo > list.length){ // Check if range valid
            setError(`Range exceeds Total Participants ${list.length}`);
        }else if(removeFrom > removeTo){
            setError("Range must be in ascending order!");
        }else if(removeTo - removeFrom < 1){ // Check difference of range
            setError("Range must include at least 2 items!");
        }else{
            const updatedList = [...list];
            updatedList.splice(removeFrom - 1, removeTo - removeFrom + 1); // Select remove range
            setList([...updatedList]);
            // Reset range inputs
            setRemoveFrom(0);
            setRemoveTo(0);
        }
        
    }

    // Function: Move item up
    function moveUp(index){
        if(index > 0){ // Move up if not first item
            const updatedList = [...list];
            [updatedList[index], updatedList[index - 1]] = [updatedList[index - 1], updatedList[index]]; // Swap item with previous item
            setList(updatedList);
        }
    }

    // Function: Move item down
    function moveDown(index){
        if(index < list.length - 1){ // Move down if not last item
            const updatedList = [...list];
            [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]]; // Swap item with next item
            setList(updatedList);
        }
    }

    // Function: Replace an item
    function replaceItem(){
        if(list.length === 0){
            setError("List is empty!");
        }else if(replaceNum === 0){
            setError("Please enter the number you want to replace!");
        }else if(replaceNum < 1){
            setError("Replace number must be at least 1");
        }else if(replaceNum > list.length){
            setError(`Replace number exceeds Total Participants ${list.length}`);
        }else if(!newItem.trim()){
            setError("Please enter the text you want to replace!");
        }else if(list.includes(newItem)){
            setError("It is already added!");
        }else{
            const editList = [...list];
            editList[replaceNum - 1] = newItem;
            setList([...editList]);
            setNewItem("");
            setReplaceNumber(0);
        }
        
    }

    // Function: Remove selected winners list
    function clearSelectedList(){
        setWinners([]);
        setSelected(false);
        setCountdown(prevCountdown);
        setWinnerCount(prevWinnerCount);
        setOriginalWinnerIndexList([]);
    }

    // Function: Remove selected winners from main list
    function removeSelectedItems(){
        setList(list.filter((_, j) => !winners.includes(list[j])));
    }

    // Function: Shuffle main list
    function shuffleList() {
        setList(prevList => {
            let shuffledList = [...prevList];

            do {
                for (let i = shuffledList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]; // Shuffle list by swapping original index with random index
                }
            } while (JSON.stringify(shuffledList) === JSON.stringify(prevList)); // Check shuffled list same as existing list

            return shuffledList;
        });
    }

    return(
        <>
        {/* Main container */}
        <div className="container">
                <h1>Select the Winner!</h1>
                
                {/* Input controls section */}
                <InputControls
                    list={list}
                    winners={winners}
                    replaceNum={replaceNum}
                    setReplaceNumber={setReplaceNumber}
                    setError={setError}
                    newItem={newItem}
                    setNewItem={setNewItem}
                    addNewItem={addNewItem}
                    replaceItem={replaceItem}
                    removeFrom={removeFrom}
                    setRemoveFrom={setRemoveFrom}
                    removeTo={removeTo}
                    setRemoveTo={setRemoveTo}
                    removeItemsRange={removeItemsRange}
                    countdown={countdown}
                    setCountdown={setCountdown}
                    winnerCount={winnerCount}
                    setWinnerCount={setWinnerCount}
                    error={error}
                    selectWinners={selectWinners}
                    reset={reset}
                />

                {/* Confetti animation when winners are revealed */}
                {countdown === 0 && winners.length > 0 && <Confetti/>}             
            </div>

            {/* Winners display section */}
            {winners.length > 0 &&
                <WinnersDisplay
                    winners={winners}
                    countdown={countdown}
                    clearSelectedList={clearSelectedList}
                    originalWinnerIndexList={originalWinnerIndexList}
                />
            }
            
            {/* Participants list section */}
            {list.length > 0 &&
                <ParticipantsList
                    list={list}
                    winners={winners}
                    countdown={countdown}
                    shuffleList={shuffleList}
                    setList={setList}
                    removeSelectedItems={removeSelectedItems}
                    moveUp={moveUp}
                    moveDown={moveDown}
                    removeItem={removeItem}
                    removeFrom={removeFrom}
                    removeTo={removeTo}
                    replaceNum={replaceNum}
                />
            }
        </>
    );
}

export default WinnerSelector;