import React from 'react'

export default function Gallow({misses, loss}) {
    return (
        <div className="gallow-container">
            <div className="gallowstand-container">
                <div className="gallowstand head"></div>
                <div className="gallowstand headsupport"></div>
                <div className="gallowstand pole"></div>
                <div className="gallowstand polesupport-left"></div>
                <div className="gallowstand polesupport-right"></div>
                <div className="gallowstand land"></div>
                {misses >=1 && <div className="hangman noose"></div>}
                {
                    misses >=2 && 
                    <div className="hangman head">
                        {loss && <span className="eye">xx</span>}
                    </div>
                }
                {misses >=3 && <div className="hangman body"></div>}
                {misses >=4 && <div className="hangman lefthand"></div>}
                {misses >=5 && <div className="hangman righthand"></div>}
                {misses >=6 && <div className="hangman leftleg"></div>}
                {misses >=7 && <div className="hangman rightleg"></div>}
            </div>
        </div>
    )
}