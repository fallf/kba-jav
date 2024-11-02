# kba-jav

# Learner Data Processing Script

## Overview

This JavaScript script processes data related to courses, assignment groups, assignments, and learner submissions. It calculates a weighted average score for each learner and provides assignment-specific performance, accounting for assignment weights, late submissions, and only including assignments due as of the processing date.

## Features

- Validates input data and handles errors for mismatched `course_id`, invalid types, and division by zero.
- Calculates weighted averages, with a 10% penalty on late submissions.
- Outputs each learner’s ID, average score, and individual assignment scores as a percentage.

## Requirements

- Basic JavaScript concepts: conditionals, loops, arrays, objects, and functions.
- Uses `try/catch` for error handling and includes data validation.

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/fallf/kba-jav.git
   ```
