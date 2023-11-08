import {useState, useEffect} from "react";
import Keyboard from './Keyboard'
import Word from './Word'
import Gallow from "./Gallow";

export default function Main() {
    const alphabets = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']

    const wordToGuess = "CARROT"
    const [alphaToGuess , setAlphaToGuess] = useState(createAlphaToGuessObj())
    const [keys, setKeys] = useState(createKeyArray())
    const [ misses, setMisses ] = useState(0)
    const [ won, setWon ] = useState(false)
    const [ loss, setLoss ] = useState(false)
    
    function createAlphaToGuessObj() {
        let objectArr = []
        Array.from(wordToGuess).forEach(alpha => {
            objectArr.push({value: alpha, guessed: false})
        });
        return objectArr
    }
    
    function createKeyArray() {
        return alphabets.map(alphabet => {
            return {
                value: alphabet,
                color: "#116FB2",
                clicked: false
            }
        })
    }
    
    function handKeyClick(e) {
        let clickedChar = e.target.textContent
        let pos = Number.parseInt(e.target.dataset.pos)
        
        if(keys[pos].clicked || won || loss) 
            return
    
        if(!wordToGuess.includes(clickedChar)) {
            setKeyColor(pos, "red")
            setMisses(misses => misses + 1)
            return
        } 
        
        setKeyColor(pos, "green")
        updateAlphaToGuess(clickedChar)   
    }

    function updateAlphaToGuess(clickedChar) {
        setAlphaToGuess(prevAlphas => {
            return prevAlphas.map(char => {
                if(char.value === clickedChar) {
                    return { ...char, guessed: true }
                }
                return char
            })
        })
    }
    
    function setKeyColor(pos, colour) {
        setKeys(prevKeys => {
            return prevKeys.map((key, idx) => {
                if(idx === pos)  {
                    return {
                        ...key,
                        color: colour,
                        clicked: true
                    }
                }
                return key
            })
        })
    }

    useEffect(() => {
        if( misses === 7 ) 
        setLoss(loss => true)
    }, [misses])
        
    useEffect(() => {
        let wordGuessed = alphaToGuess.every(alpha => alpha.guessed)
        if(wordGuessed) 
            setWon(won => true)
    }, [alphaToGuess])
    
    console.log("lost",loss)

    return (
        <main>
            <div className='left-half'>
                <Word alphaToGuess={alphaToGuess} />
                <Keyboard keys={keys} checkAlphabetExits={handKeyClick} />
            </div>
            <div className='right-half'>
                <Gallow misses={misses} loss={loss} />
            </div>
        </main>
    )
}
