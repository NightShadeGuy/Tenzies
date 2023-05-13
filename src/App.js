import React from "react"
import Die from "./components/Die"
import Features from "./components/Features"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App(){
    const [diceArr, setDiceArr] = React.useState(allNewDice);
    const [tenzies, setTenzies] = React.useState(false);

    const [rollCount, setRollCount] = React.useState(0); 
      

    React.useEffect(() => {
         const allHeld = diceArr.every( die => die.isHeld);
         const firstValue = diceArr[0].value;
         const allSameValue = diceArr.every( die => die.value === firstValue);
         if(allHeld && allSameValue){
            setTenzies(true)
            
         }
    }, [diceArr])

    function generateNewDie(){
      return { 
                value:  Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            }
    }

    function  allNewDice(){
        const newDice = [];
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function rollDice(){
       setDiceArr( oldDiceArr => oldDiceArr.map( die => {
        return die.isHeld ? die : generateNewDie();
       }));
       setRollCount( prevValue => prevValue + 1);
     }

     function newGame(){
        setTenzies(false);
        setDiceArr(allNewDice()); 
        setRollCount(0); 
      }

    function holdDice(id){
      setDiceArr( oldDiceArr => oldDiceArr.map( dice => {
        return dice.id === id ?
            {...dice, isHeld: dice.isHeld ? false : true} :
            dice
      }));
    
    }

    const dices = diceArr.map( die => {
        return <Die key={die.id}
                    id={die.id}
                    holdDice={holdDice}
                    value={die.value}
                    isHeld={die.isHeld} />
    })

    return(
        <main>
            {tenzies && <Confetti width="800px" height="500px"/>}
            <Features rollCount={rollCount} />

            <h1 className="title">Tenzies</h1>
            <p className="info">
                Roll until all dice are the same. Click each die to freeze it at its
               current value between rolls.
            </p>
            <div className="die--container">
             {dices}
            </div>
            <button className="roll"
                onClick={tenzies ? newGame : rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}