import React from "react"

const Total = ({parts}) => {
    const totalEx = parts.reduce((sum, part) => sum + part.exercises, 0);
    console.log(totalEx)
    return(
        <p><strong>total of {totalEx} exercises</strong></p>
    )
}

export default Total