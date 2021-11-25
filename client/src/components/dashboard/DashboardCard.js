import React, { useState } from 'react'

function DashboardCard({user, assignment}) {
    const dueDate = new Date(assignment.dueDate);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const studentScore = assignment.studentPoints[user]
    const submission = assignment.assignmentSubmissions[user]
    return (
        <div>
            <div className="grid justify-items-center bg-gray-800">
                <div className="flex justify-between block border-solid border-4 border-blue-700 my-4 w-4/5 p-4 bg-gray-700 text-white">
                    <div>
                        <h2 className="text-xl">{assignment.assignmentName}</h2>
                        <div className="flex">
                            <h2 className="pr-5 text-pink-400 font-semibold">Due: {months[dueDate.getMonth()]}. {dueDate.getDate()}</h2>
                            {submission ? <h3 className="text-green-500">Submitted</h3>: <h3 className="text-red-500">No submission</h3>}
                        </div>
                    </div>
                    <div>
                        {studentScore ?
                            <h2>Score: {studentScore} / {assignment.totalPossiblePoints}</h2> :
                            <h2>__ / {assignment.totalPossiblePoints}</h2>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard

