import React, { useState } from 'react'

function DashboardCard({user, assignment}) {
    const dueDate = new Date(assignment.dueDate);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return (
        <div>
            <h2>Assignment</h2>
            <h2>Due: {months[dueDate.getMonth()]}. {dueDate.getDate()}</h2>
            <h2>{assignment.assignmentName}</h2>
        </div>
    )
}

export default DashboardCard

