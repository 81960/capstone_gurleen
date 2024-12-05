# capstone_SURJIT

# Quiz Application Development Report

This report provides a comprehensive overview of the steps taken to develop the Quiz Application, from initial setup to final implementation. This application fetches quiz questions from QuizAPI based on a selected difficulty level and provides immediate feedback to the user.

## Project Overview

The Quiz Application is designed to:
- Allow users to select a difficulty level (Easy, Medium, Hard).
- Display questions based on the selected difficulty.
- Track the number of correct and incorrect answers.
- Provide immediate feedback to the user after each question.
- Allow users to reset their progress at any time.

## Features

- **Difficulty Selection**: Users can select a difficulty level before each question.
- **Dynamic Question Fetching**: The application fetches questions from QuizAPI based on the selected difficulty.
- **Immediate Feedback**: Users receive instant feedback on whether their answer was correct or incorrect.
- **Progress Tracking**: Tracks the number of correct and incorrect answers.
- **Responsive Design**: The application is accessible on various screen sizes and devices.

## Development Steps

### 1. Setting Up the Project Structure

Created the basic file structure:
- **index.html**: The main HTML file for the structure of the web application.
- **style.css**: CSS for styling the interface.
- **script.js**: JavaScript for managing the app’s logic.



### 2. Implementing JavaScript Functionality

#### Variable Initialization and Event Handling

Initialized variables for tracking correct and incorrect counts, the current question count, and the total number of questions. Set up event listeners for key interactions:
- **Start Quiz Button**: Initializes the quiz based on the selected difficulty level.
- **Get Question Button**: Fetches a new question from the QuizAPI.
- **Answer Buttons**: Provide feedback on whether the selected answer was correct.
- **Reset Stats Button**: Resets correct and incorrect counters to zero.

#### Fetching Questions from QuizAPI

Used the Fetch API to request questions from QuizAPI based on the selected difficulty level.
- Built the request URL dynamically, incorporating the user-selected difficulty.
- Implemented error handling to alert users if questions are unavailable or if there’s a network issue.


#### Displaying Questions and Handling Answers

Dynamically generated HTML to display each question and its answer choices. Implemented logic to handle user answers:
- Checked if the selected answer was correct based on data attributes.
- Updated and displayed correct or incorrect counts on the screen.
- Disabled answer buttons once an answer was selected to prevent multiple submissions.

#### Managing Application State

Used browser local storage to store and persist correct and incorrect counts, allowing users to resume their progress if they close the application and return later. Ensured that the correct/incorrect counts are loaded from local storage when the app initializes.
