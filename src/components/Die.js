import React from "react"

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="die" style={styles}
        onClick={() => props.holdDice(props.id)}> 
            <h2>{props.value} {props.isHeld}</h2>
        </div>
    )
}