import React from 'react'

function DashboardCard({user, assignment}) {
    const dueDate = new Date(assignment.dueDate);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let studentScore = -1
    let submission = false
    for (let i = 0; i < assignment.studentPoints.length; i++) {  // loop through all students in assignment
        console.log(assignment.studentPoints[i].points)
        if (assignment.studentPoints[i].id == user) {   // if id found, assign student score and change submission status to true
            studentScore = assignment.studentPoints[i].points
            submission = true
        }
    }

    return (
        <div>
            <div className="grid bg-gray-800 justify-items-center">
                <div className="flex justify-between w-4/5 p-4 my-4 text-white bg-gray-700 border-4 border-blue-700 border-solid">
                    <div>
                        <h2 className="text-xl">{assignment.assignmentName}</h2>
                        <div className="flex">
                            <h2 className="pr-5 font-semibold text-pink-400">Due: {months[dueDate.getMonth()]}. {dueDate.getDate()}</h2>
                            {submission ? <h3 className="text-green-500">Submitted</h3>: <h3 className="text-red-500">No submission</h3>}
                        </div>
                    </div>
                    <div>
                        {studentScore != -1 ?
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

