
# Mizuka Typing

**Mizuka Typing** is an elegant and interactive typing experience built using React. The application offers multiple modes such as word typing, sentence typing, free typing, and more, with features like sound effects, focused mode, ultra-zen mode, and local storage persistence for user settings.

## Features

- **Multiple Game Modes**: Switch between word typing, sentence typing, free typing, and more.
- **Customizable Themes**: Persist theme settings locally, and choose from different theme options.
- **Sound Effects**: Enable sound effects while typing, with customizable sound modes.
- **Ultra-Zen Mode**: A distraction-free typing experience.
- **Focused Mode**: Keeps your attention on the typing box.
- **Trainer Mode**: Practice typing with an on-screen keyboard.
- **Persistent Settings**: Your preferences, such as theme, game mode, and sound settings, are saved locally in the browser.

## How to Run Locally

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zahooruddin-dev/mizuka-typing-2.0.git
   cd mizuka-typing
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to start using Mizuka Typing.

## Available Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.

## Folder Structure

- `src/components/`: Contains all React components such as `TypeBox`, `SentenceBox`, and `FooterMenu`.
- `src/constants/`: Contains game mode and sound-related constants.
- `src/hooks/`: Custom hooks like `useLocalPersistState` for persisting data.
- `src/style/`: Global styles and themes for the app.

## License


This project is licensed under the MIT License.
