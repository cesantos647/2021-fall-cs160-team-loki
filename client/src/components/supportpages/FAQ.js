const FAQ = () => {
  return (
    <div className="w-full h-full bg-gray-800 bg-cover">
      <div className="flex-col px-24 py-4">
        <h1 className="font-sans text-3xl font-bold text-yellow-400">FAQ</h1>
        <Question
          question="What is Savnac?"
          answer="Savnac is a learning management system (LMS) that focuses on fostering community within the online learning paradigm.
          Through the integration of chat-based communication systems found in hub-based communication apps such as Discord and Slack, 
          we aim to create an LMS that will remove the need for 3rd-party apps and facilitate communications—and hopefully relationships—between professors and students."/>
        <Question
          question="Why do some links redirect to blank pages?"
          answer="Savnac is a class project that is currently being developed by students from Team Loki in CS160;
          it is in no shape or form near completion and will as such be missing many of its planned (and visible) features."/>
        <Question
          question="What features are currently available?"
          answer="As of December 1st, 2021, the Login, Registration, Dashboard, Course Creation, Course Assignments, and Assignment Creation pages are available and functional.
          These usable pages will be denoted by a pulsing animation."/>
        <Question
          question="How do I go back to the dashboard?"
          answer="To reach the dashboard, click on the yellow calender shaped icon on the blue navigation bar to your left. It is the 1st icon below the Savnac logo." />
        <Question
          question="How do I log out?"
          answer="To log out, click on red arrow shaped icon on the blue navigation bar to your left. It is the 5th icon below the Savnac logo." />
        <Question
          question="How do create a new course?"
          answer="To create a new course, click on the gray '+' shaped icon on the blue navigation bar to your left. It is the 6th icon below the Savnac logo.
          This should redirect you to the course creation page, which will allow you to set the name, section, and color of the new course. (All fields must be filled out, with color being one of 7 given colors.)" />
        <Question
          question="How do I see my courses?"
          answer="The bottom half of the blue navigation bar to your left is reserved for links to any courses that you have already created on this account.
          As of now, there is no way to join courses other users have made; you will automatically join any courses that you yourself create, however." />
        <Question
          question="How do I create a new assignment in a course?"
          answer="Once you navigate to your course's assignments page, click on the blue '+' shaped icon on the bottom right of the screen.
          This should redirect you to the assignment creation page, which will allow you to set the name, total possible points, open date, due date, close date, and description of the assignment.
          All of these fields are required besides the date fields; if left as-is, they will default to the current date. 
          On creation, you will be redirected back to the course's assignments page, and the 'Assignments from Database' assignment type should update to hold the new assignment."/>
        <Question
          question="How do I toggle between row and column view in assignments?"
          answer="Once you navigate to your course's assignments page, click on the blue and yellow arrow button with 3 boxes on the top right of the screen.
          This should toggle you between row view, which shows assignment types on top of eachother, and column view, which shows assignment types side-by-side." />
        <Question
          question="What are the four default assignments that I see when I first create a course?"
          answer="Currently, there are four assignments that are hard coded into the assignment page of every course by default, 
          found within the 'Upcoming Assignments' and 'Past Assignments' assignment types. 
          They are there to show off the view toggle feature, and there is currently no way to remove them."  />
        <Question
          question="How do I edit, submit, delete, or check the details of an assignment?"
          answer="Currently, there is no way to interact with assignments; you can only add them and view them in your assignments page and dashboard page.
          Do note that you can manually edit and delete assignments using REST API commands and/or MongoDB commands without side effects." />
        <Question
          question="How do I edit, delete, or check the details of a course?"
          answer="Currently, there is no way to interact with courses; you can only add them, interact with their associated course pages, and view them on your navigation bar.
          DO NOT manually edit and delete a course using REST API commands and/or MongoDB commands unless you throughly know the schema; 
          such may result in harmful side effects that may break the current user account." />
        <Question
          question="After creating a course, my navigation bar didn't update to show it. Why is that?"
          answer="There is currently a bug in which the navigation bar will occasionally not get the updated courses info of the user.
          To manually update, please go to the Dashboard and refresh the page twice." />
        <Question
          question="Is Savnac accessible as a service outside of downloading the source code and manually running it with NodeJS?"
          answer="Yes! Go to https://teamloki-savnac-frontend.herokuapp.com." />
      </div>
    </div>
  )
}

function Question(props) {
  return (
    <body className="pt-4 font-sans ">
      <h1 className="pt-4 text-xl font-semibold text-green-500">{props.question}</h1>
      <h2 className="pt-4 text-gray-100 text-md">{props.answer}</h2>
    </body>
  )
}

export default FAQ;
