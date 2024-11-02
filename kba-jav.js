console.log("KBA");
try {
const CourseInfo = {id: 451, name: "Introduction to JavaScript"};
// The provided assignment group.
const AssignmentGroup = {
  id: 12345, name: "Fundamentals of JavaScript", course_id: 451, group_weight: 25, assignments: [
    {id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50},
    {id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150},
    {id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500}
  ]
};
let course = AssignmentGroup.assignments;
console.log(course + "banana");

const LearnerSubmissions = [
  {learner_id: 125, assignment_id: 1, submission: {Submitted_at: "2023-01-25", score: 47}},
  {learner_id: 125, assignment_id: 2, submission: {submitted_at: "2023-02-12", score: 150}},
  {learner_id: 125, assignment_id: 3, submission: {submitted_at: "2023-01-25", score: 400}},
  {learner_id: 132, assignment_id: 1, submission: {submitted_at: "2023-01-24", score: 39}},
  {learner_id: 132, assignment_id: 2, submission: {Submitted_at: "2023-03-07", score: 140}}
];
//    

const scoresByLearner = {};

LearnerSubmissions.forEach(function(entry) {
  const learnerId = entry.learner_id;
  const score = entry.submission.score;

  if (scoresByLearner[learnerId]) {
    scoresByLearner[learnerId].push(score);
  } else {
    scoresByLearner[learnerId] = [score];
  }
});

console.log(scoresByLearner);

// let sum = scoresByLearner.score.reduce();
// console.log(sum);

//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const dance = [
//         // all this need to be deleted and you should used replace thus with functionality  to actually calculate the grade  
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return dance;
//   }
function getLearnerData(course, ag, submissions) {
    // Organize scores by learner using reduce
    const scoresByLearner = submissions.reduce((acc, entry) => {
        const learnerId = entry.learner_id;
        const assignmentId = entry.assignment_id;
        const score = entry.submission.score;

        // If the learner doesn't exist in the accumulator, create a new entry
        if (!acc[learnerId]) {
            acc[learnerId] = {
                totalScore: 0,
                totalPossible: 0,
                scores: {}
            };
        }

        // Find the assignment to get points possible
        const assignment = ag.assignments.find(a => a.id === assignmentId);
        if (assignment) {
            const pointsPossible = assignment.points_possible;

            // Update total scores and possible points
            acc[learnerId].totalScore += score;
            acc[learnerId].totalPossible += pointsPossible;

            // Store individual assignment scores as fractions
            acc[learnerId].scores[assignmentId] = score / pointsPossible;
        }

        return acc; // Return the accumulator for the next iteration
    }, {}); // Initialize accumulator as an empty object

    // Prepare the result array
    const result = Object.entries(scoresByLearner).map(([learnerId, data]) => {
        const avg = data.totalScore / data.totalPossible;
        return {
            id: parseInt(learnerId),
            avg: avg,
            ...data.scores
        };
    });

    return result;
}

  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
}
   catch (error) {
    console.log("Please revised the code somehing isnt clean in the buttermilk")
  }