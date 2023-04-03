import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "lightgreen" : "beige"
    }

    return(
        <div className="die--face" style={styles} onClick={props.func}>
            <h2 className="die--num" style={styles}>
                {props.value}
            </h2>
        </div>
    )
}