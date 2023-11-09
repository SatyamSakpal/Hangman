import React from 'react'
import trophy from '../assets/icons8-trophy-96.png'
import retryImg from '../assets/circle.png'

export default function Navbar({score, refreshGame}) {
    return (
        
        <nav>
            <div className="score">
                <img src={trophy} alt="trophy" />
                <h3>{score}</h3>
            </div>
            <div className="title">
                <h2>HANGMAN</h2>
            </div>
            <div className="retry" onClick={refreshGame}>
                <img src={retryImg} alt="retry" />
            </div>
        </nav>
    )
}