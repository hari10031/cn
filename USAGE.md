# Question Answer Portal - Usage Guide

## 🚀 Quick Start

### Running the Application

1. Navigate to the project directory:
   ```bash
   cd "m:/DSA/OS internal/question-answer-app"
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and go to: **http://localhost:3000**

## 📝 How to Use

### Selecting a Set
- The homepage displays 15 numbered buttons (1-15)
- Click any number to view the questions for that set
- The selected set button will be highlighted with a gradient color

### Viewing Questions
Each set contains two questions:
- **Question A** - Typically React JS or Node.js related
- **Question B** - Typically Node.js, MongoDB, or Express JS related

### Providing Answers
1. Type or paste your answer in the textarea below each question
2. Answers are automatically saved in the component state
3. You can switch between sets freely - answers will reset when changing sets

### Copying Answers
1. After entering your answer, click the **"Copy"** button next to the question header
2. The button will change to show "Copied!" with a checkmark icon
3. Your answer is now in your clipboard, ready to paste elsewhere
4. The copy button is disabled until you enter some text in the answer field

## 🎨 Features

- **Modern UI**: Beautiful gradient design with glassmorphism effects
- **Responsive**: Works on all screen sizes (desktop, tablet, mobile)
- **Interactive**: Smooth animations and hover effects
- **User-Friendly**: Clear visual feedback for all interactions
- **All 15 Sets**: Complete question bank covering:
  - React JS (useState, JSX, events, props/state, styling, useContext, conditional rendering, components, list rendering)
  - Node.js (URL module, file operations, HTTP module, MongoDB operations, prompt-sync)
  - Express JS (HTML pages, EJS templates, form handling, routing)
  - MongoDB (CRUD operations via Shell and Compass)

## 📋 Question Sets Overview

1. **Set 1**: useState hook, URL module
2. **Set 2**: JSX, Student records
3. **Set 3**: React events, File append
4. **Set 4**: MongoDB insert, Props and state
5. **Set 5**: React styling, MongoDB CRUD (Shell)
6. **Set 6**: useContext hook, MongoDB delete
7. **Set 7**: File write, Conditional rendering
8. **Set 8**: React components, MongoDB CRUD (Compass)
9. **Set 9**: HTTP module, Express HTML
10. **Set 10**: List rendering, EJS templates
11. **Set 11**: Express forms, prompt-sync
12. **Set 12**: File read, Express routing
13. **Set 13**: MongoDB delete, React components
14. **Set 14**: MongoDB CRUD (Shell), React styling
15. **Set 15**: useContext hook, MongoDB insert

## 🛠️ Technical Stack

- **Framework**: Next.js 16 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules with custom properties
- **Font**: Inter (Google Fonts)
- **Features**: Client-side rendering, Clipboard API

## 📱 Browser Compatibility

The application works best on modern browsers that support:
- CSS backdrop-filter (for glassmorphism effects)
- Clipboard API (for copy functionality)
- CSS Grid and Flexbox

Tested on: Chrome, Firefox, Edge, Safari (latest versions)

## 💡 Tips

- **Quick Navigation**: Set buttons are numbered for easy access
- **Visual Feedback**: Active set button has a distinct gradient background
- **Responsive Design**: The layout adapts automatically to your screen size
- **Persistent State**: Answers remain while viewing a set but reset when switching

## 🎯 Use Cases

- **Studying**: Keep track of your answers for different question sets
- **Exam Preparation**: Quick reference to all questions
- **Assignment Management**: Organize answers by set number
- **Clipboard Sharing**: Easy copy-paste functionality for submissions

Enjoy using the Question Answer Portal! 🎉
