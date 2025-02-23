import './Confetti.css';
import React, {useEffect, useRef} from 'react';

/**
 * Animates colorful confetti particles for celebration effects
 * Uses CSS animations and random positioning for visual appeal
 */

function Confetti(){
    const containerRef = useRef(null);

    // Initialize confetti animation on component mount
    useEffect(() => {
        // Capture current ref value in a local variable
        const containerNode = containerRef.current;

        createConfetti(containerNode);

        return () => {
            // Cleanup confetti elements when component unmounts
            // Use the captured value in cleanup
            if(containerNode){
                containerNode.innerHTML = '';
            }
        }
    }, []); // Empty dependency array ensures this runs once

    /**
     * Generates and animates confetti particles
     * Creates multiple div elements with random colors and positions
     */
    function createConfetti(container){
        if(!container) return;

        const confettiCount = 50; // Total number of confetti pieces

        // Generate confetti particles
        for(let i = 0; i < confettiCount; i++){
            const confetti = document.createElement("div");
            confetti.classList.add('confetti');

            // Random HSL color values for vibrant colors
            const hue = Math.floor(Math.random() * 360); // 0-359 degrees
            const saturation = "100%"; // Full saturation for bright colors
            const lightness = "66%"; // Slightly light for pastel effect
            confetti.style.backgroundColor = `hsl(${hue}, ${saturation}, ${lightness})`;

            // Random horizontal positioning
            const left = Math.random() * 100; // 0-100% of container width
            confetti.style.left = `${left}%`;

            // Animation start times for organic effect
            const animationDelay = Math.random() * 10; // 0-10 seconds
            confetti.style.animationDelay = `${animationDelay}s`;

            container.appendChild(confetti);
        }
    }

    return(
        // Container for confetti elements
        // Animation is handled entirely through CSS
        <div className="celebration-container" ref={containerRef}></div> 
    );
}

export default Confetti;