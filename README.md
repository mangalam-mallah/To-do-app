# To-Do App

A modern, simple, and cool to-do app built using **React Native**. This app helps you manage tasks effectively with a sleek interface and essential features like adding, editing, and deleting tasks, while ensuring data persistence using **AsyncStorage**.

## Features

- **Modern and Cool UI**: A visually appealing, user-friendly design that enhances the task management experience.
- **Add Task**: Quickly add new tasks to your list with ease.
- **Edit and Save Task**: Modify existing tasks and save the changes instantly.
- **Delete Task**: Remove tasks from the list with an easy-to-use deletion process.
- **Prompt for Deletion Confirmation**: A custom alert dialog prompts users with a **Yes/No** option before deleting a task to avoid accidental deletions.
- **Persistent Data Storage**: Tasks are stored locally using **AsyncStorage**, ensuring your tasks persist even after the app is closed or restarted.

## Technologies Used

- **React Native**: For building the mobile app's UI and functionality.
- **AsyncStorage**: To store tasks locally on the device.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **React Native CLI**: Install the React Native CLI or use **Expo** for development.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
2. Navigate to the project directory: <br>
   **cd todo-app**
3. Install dependencies:<br>
   **npm install**
4. Run the app on physical device or on an emulator:<br>
   npx react-native run-android  # For Android <br>
   npx react-native run-ios      # For iOS (only on macOS)
