import React from "react";
import "./style.css";
import {nanoid} from "nanoid";

import Die from "./Components/Die";

export default function App() {

    function generateNewDie(){
        return{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    //new game
    
    
    function allNewDice(){
        const newDice = [];
        for(let i = 0; i < 10; ++i){
            newDice.push(generateNewDie())
        }
        return(newDice);
    }
    
    const [dice, setDice] = React.useState(allNewDice());
    
    const [tenzies, setTenzies] = React.useState(false);
    
    //side effect for winning and every change in state
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const valueSame = dice.every(die => die.value == firstValue);        
        
        if(allHeld && valueSame){
            setTenzies(true);
        };
    },[dice]);
    
    
    
    //sets dice up for display
    const diceElements = dice.map(die =>
        <Die 
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        id={die.id}
        func={() => holdDice(die.id)}
        />
        );
        
        
    //func call for the button
    function diceSetter(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }));
        }
        else if(tenzies){
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    //allows for holding each individual die
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} : die
        }));
    }

    return (
        <main>

            <div className="dice--container">
                {diceElements}
            </div>
            <button className="roll--button" onClick={diceSetter}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}