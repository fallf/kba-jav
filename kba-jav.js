console.log("KBA");

try {
  const CourseInfo = { id: 451, name: "Introduction to JavaScript" };
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
      { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
      { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 } // Note: This date seems incorrect.
    ]
  };

  const LearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
  ];

  // Function to check if the assignment belongs to the course
  function validateCourse(course, assignmentGroup) {
    if (assignmentGroup.course_id !== course.id) {
      throw new Error("Assignment group does not belong to the specified course.");
    }
  }

  // Calculate the score for each submission based on whether it's late
  function calculateScore(submission, assignment) {
    const { score, submitted_at } = submission;
    const pointsPossible = assignment.points_possible;

    // Handle case where no points are possible
    if (pointsPossible === 0) return 0;

    // Determine if submission is late and apply penalty
    const isLate = new Date(submitted_at) > new Date(assignment.due_at);
    const finalScore = isLate ? score * 0.9 : score;

    return finalScore / pointsPossible; // Return percentage score
  }

  // Main function to process learner data
  function getLearnerData(course, assignmentGroup, submissions) {
    validateCourse(course, assignmentGroup);

    const scoresByLearner = submissions.reduce((acc, entry) => {
      const { learner_id, assignment_id, submission } = entry;
      const assignment = assignmentGroup.assignments.find(a => a.id === assignment_id);

      // Check if the assignment exists and is due
      if (!assignment || new Date(assignment.due_at) > new Date()) return acc;

      // Calculate the score for the assignment
      const percentageScore = calculateScore(submission, assignment);

      // Initialize learner data if not already in the accumulator
      if (!acc[learner_id]) {
        acc[learner_id] = {
          id: learner_id,
          totalScore: 0,
          totalPossible: 0,
          scores: {}
        };
      }

      // Update totals and individual assignment scores
      acc[learner_id].totalScore += percentageScore * assignment.points_possible;
      acc[learner_id].totalPossible += assignment.points_possible;
      acc[learner_id].scores[assignment_id] = percentageScore;

      return acc;
    }, {});

    // Return formatted results
    return Object.entries(scoresByLearner).map(([learnerId, data]) => {
      const avg = data.totalScore / data.totalPossible; // Calculate average score
      return { id: parseInt(learnerId), avg, ...data.scores };
    });
  }

  // Execute and log results
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);

} catch (error) {
  console.log("Please revise the code; something isn't clean in the buttermilk.");
}
