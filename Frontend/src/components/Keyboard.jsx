import {useState, useEffect} from 'react'


export default function Keyboard({keys, checkAlphabetExits}) {

    const createKeyElement = (beg, end) => {
        let elements = []
        for(let i = beg; i < end; i++) {
            elements.push(
                <div className="key" data-pos={i} key={i} style={{color: keys[i].color}} onClick={checkAlphabetExits} >{keys[i].value}</div>
            )
        }
        return elements
    }

    return (
        <div className='keyboard-container'>
            <div className='keyboard'>
                <div className='key-row top'>
                    {createKeyElement(0,10)}
                </div>
                <div className='key-row middle'>
                    {createKeyElement(10,19)}
                </div>
                <div className='key-row bottom'>
                    {createKeyElement(19,26)}
                </div>
            </div>
        </div>
    )
}