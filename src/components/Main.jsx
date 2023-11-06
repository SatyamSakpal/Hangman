import React from "react";
import Keyboard from './Keyboard'
import Word from './Word'

export default function Main() {
    return (
        <main>
            <div className='left-half'>
                <Word />
                <Keyboard />
            </div>
            <div className='right-half'>
                Gallow
            </div>
        </main>
    )
}
