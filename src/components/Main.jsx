import {useState} from "react";
import Keyboard from './Keyboard'
import Word from './Word'

export default function Main() {
    const wordToGuess = "CARROT"

    const createAlphaToGuessObj = () => {
        let objectArr = []
        Array.from(wordToGuess).forEach(alpha => {
            objectArr.push({value: alpha, guessed: false})
        });
        return objectArr
    }

    const [alphaToGuess , setAlphaToGuess] = useState(createAlphaToGuessObj())

    
    const checkAlphabetExits = (e) => {
        let clickedChar = e.target.textContent
        let keyPos = e.target.dataset.pos
        if(wordToGuess.includes(clickedChar)) {
            setKeyColor(keyPos, "green")
        } else {
            setKeyColor(keyPos, "red")
        }

        setAlphaToGuess(prevAlphas => {
            return prevAlphas.map(char => {
                if(char.value === clickedChar) {
                    return { ...char, guessed: true }
                }
                return char
            })
        })
    } 
    
    const alphabets = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']
    
    const createKeyArray = () => {
        return alphabets.map(alphabet => {
            return {
                value: alphabet,
                color: "#116FB2",
            }
        })
    }
    
    const [keys, setKeys] = useState(createKeyArray())
    
    const setKeyColor = (pos, color) => {
        let tempArr = keys
        tempArr[pos].color = color
        setKeys(tempArr)
    }
    
    console.log(alphaToGuess)

    return (
        <main>
            <div className='left-half'>
                <Word alphaToGuess={alphaToGuess} />
                <Keyboard keys={keys} checkAlphabetExits={checkAlphabetExits} />
            </div>
            <div className='right-half'>
                Gallow
            </div>
        </main>
    )
}
