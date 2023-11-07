import React from "react";

export default function Word({alphaToGuess}) {

    const wordLetterElements = alphaToGuess.map((alpha, idx) => {
        return (
            <div className="alphabet" key={idx} style={{borderBottom: alpha.guessed? "none": "5px solid black"}}>
                <span>
                    {alpha.guessed? alpha.value: " "}
                </span>
            </div>
        )
    })

    return (
        <div className="word-container">
            <div className="word-context">
                Vegetables
            </div>
            <div className="word">
                {wordLetterElements}
            </div>
        </div>
    )
}