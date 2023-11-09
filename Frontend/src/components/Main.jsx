import {useState, useEffect} from "react";
import Navbar from "./Navbar";
import Keyboard from './Keyboard'
import Word from './Word'
import Gallow from "./Gallow";

export default function Main() {
    const alphabets = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']
    const [ wordToGuess, setWordToGuess] = useState("")
    const [ context, setContext] = useState("")
    const [ alphaToGuess , setAlphaToGuess] = useState([])
    const [ keys, setKeys] = useState(createKeyArray())
    const [ misses, setMisses ] = useState(0)
    const [ won, setWon ] = useState(false)
    const [ loss, setLoss ] = useState(false)
    const [ score, setScore ] = useState(0)
    const [ refresh, setRefresh ] = useState(false)
    
    function createAlphaToGuessObj() {
        let objectArr = []
        Array.from(wordToGuess).forEach(alpha => {
            objectArr.push({value: alpha, guessed: false})
        })
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
    
    function handleKeyClick(e) {
        let clickedChar = e.target.textContent
        let pos = Number.parseInt(e.target.dataset.pos)
        
        if(keys[pos].clicked || won || loss) {
            return
        }

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

    function refreshGame() {
        if(loss)
            setScore(0)
        setMisses(0)
        setWon(false)
        setLoss(false)
        setRefresh(refresh => !refresh)
    }

    useEffect(() => {
        fetch("/api/randomWord")
            .then(res => res.json())
            .then(data => {
                setWordToGuess(data.word)
                setContext(data.context)
            })
    },[refresh])

    useEffect(() => {
        if( misses === 7 ) {
            setLoss(loss => true)
            setAlphaToGuess(alphas => {
                return alphas.map(alpha => ({...alpha, guessed: true}))
            })
        }
    }, [misses])

    useEffect(() => {
        if(alphaToGuess.length === 0) {
            setWon(won => false)
            return
        }
        let wordGuessed =  alphaToGuess.every(alpha => alpha.guessed)
        if(wordGuessed) {
            setWon(won => true)
        }
    }, [alphaToGuess])
   
    useEffect(() => {
        setAlphaToGuess(createAlphaToGuessObj())
        setKeys(createKeyArray())
    },[wordToGuess])
    
    useEffect(() => {
        if(won) {
            setScore(prevScore => prevScore+(700-(misses*100)))
        }
    },[won])

    return (
        <>
            <Navbar score={score} refreshGame={refreshGame}/>
            <main>
                    <div className='left-half'>
                        <Word alphaToGuess={alphaToGuess} context={context} />
                        <Keyboard keys={keys} checkAlphabetExits={handleKeyClick} />
                    </div>
                    <div className='right-half'>
                        <Gallow misses={misses} loss={loss} />
                    </div>
            </main>
        </>
    )
}
