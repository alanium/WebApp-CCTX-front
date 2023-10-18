import React from 'react'

export default function WorkOrder (props) {
    return (
    <div>
        <h2>{props.name}</h2>
        <p>{props.id}</p>
        <p>{props.email}</p>
        <p>{props.fullname}</p>
        <p>{props.subontratist}</p>
        <h3>Task Name</h3>
        {props.task.map((task, index) => (
            <div key={index}>
            <p>Task: {task.task_name}</p>
            <p>Start Date: {task.start_date}</p>
            <p>End Date: {task.end_date}</p>
            <p>Negotiated Price: {task.negotiated}</p>
            </div>
            ))}
        <p>Total Negotiatied Price: {props.price}</p>
    </div>)
}