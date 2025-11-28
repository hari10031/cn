export const answersData = {
  1: {
    a: `// UseStateDemo.js
import { useState } from "react"

function UseStateDemo() {
  let [count, setCount] = useState(0);
  const increase = () => setCount(++count)
  const decrease = () => setCount(--count)
  
  return (
    <div align='center'>
      <button onClick={increase}>Increment</button>
      &nbsp;&nbsp;&nbsp;
      {count}&nbsp;&nbsp;&nbsp;
      <button onClick={decrease}>Decrement</button>
    </div>
  )
}

export default UseStateDemo`,
    b: `// App.js
import UseStateDemo from "./UseStateDemo";

function App() {
  return (
    <div align="center">
      <UseStateDemo/>
    </div>
  );
}

export default App;`
  },
  2: {
    a: `// React JSX Demo
import React from 'react';

function JSXDemo() {
  const name = "John";
  const age = 25;
  
  return (
    <div className="container">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <ul>
        {[1, 2, 3].map(num => <li key={num}>Item {num}</li>)}
      </ul>
    </div>
  );
}

export default JSXDemo;`,
    b: `// Node.js Fetch and Display Student Records from MongoDB
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function fetchStudents() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('school');
    const collection = db.collection('students');
    
    // Fetch all students
    const students = await collection.find().toArray();
    
    console.log('Student Records:');
    students.forEach(student => {
      console.log(\`ID: \${student._id}, Name: \${student.name}, Grade: \${student.grade}, Age: \${student.age}\`);
    });
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

fetchStudents();`
  },
  3: {
    a: `// React Events Demo
import React, { useState } from 'react';

function EventsDemo() {
  const [text, setText] = useState('');
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => setClicked(true);
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted: ' + text);
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      {clicked && <p>Button was clicked!</p>}
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EventsDemo;`,
    b: `// Node.js Append to File
const fs = require('fs');

const data = "\\nNew line appended to file";

fs.appendFile('output.txt', data, (err) => {
  if (err) throw err;
  console.log('Data appended successfully!');
});`
  },
  4: {
    a: `// Node.js MongoDB Insert Employee
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function insertEmployee() {
  await client.connect();
  const db = client.db('company');
  const collection = db.collection('employees');
  
  const employee = {
    name: "John Doe",
    position: "Developer",
    salary: 60000
  };
  
  const result = await collection.insertOne(employee);
  console.log('Employee inserted:', result.insertedId);
  await client.close();
}

insertEmployee();`,
    b: `// React Props and State Demo
import React, { useState } from 'react';

function Child({ name, age }) {
  return <p>{name} is {age} years old</p>;
}

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Child name="Alice" age={25} />
      <Child name="Bob" age={30} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Parent;`
  },
  5: {
    a: `// React Styling Demo
import React from 'react';
import './App.css';

function StyledComponent() {
  const inlineStyle = {
    color: 'blue',
    fontSize: '20px',
    padding: '10px'
  };
  
  return (
    <div>
      <h1 style={inlineStyle}>Inline Styled</h1>
      <p className="external-style">External CSS</p>
      <div style={{ backgroundColor: 'lightgray', margin: '10px' }}>
        Object Style
      </div>
    </div>
  );
}

export default StyledComponent;`,
    b: `// MongoDB Student CRUD Operations (Shell)
// 1. Create
db.students.insertOne({ name: "Alice", grade: "A", age: 20 })

// 2. Read
db.students.find()
db.students.findOne({ name: "Alice" })

// 3. Update
db.students.updateOne(
  { name: "Alice" },
  { $set: { grade: "A+" } }
)

// 4. Delete
db.students.deleteOne({ name: "Alice" })`
  },
  6: {
    a: `// React useContext Hook Demo
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function Child() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Child />
    </ThemeContext.Provider>
  );
}

export default App;`,
    b: `// Node.js MongoDB Delete Employee
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function deleteEmployee() {
  await client.connect();
  const db = client.db('company');
  const collection = db.collection('employees');
  
  const result = await collection.deleteOne({ name: "John Doe" });
  console.log('Deleted count:', result.deletedCount);
  
  await client.close();
}

deleteEmployee();`
  },
  7: {
    a: `// Node.js Create and Write File
const fs = require('fs');

const data = 'This is the file content\\nLine 2\\nLine 3';

fs.writeFile('newfile.txt', data, (err) => {
  if (err) throw err;
  console.log('File created and written successfully!');
});`,
    b: `// React Conditional Rendering
import React, { useState } from 'react';

function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  
  return (
    <div>
      {isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Log In</h1>}
      {showMessage && <p>This is a conditional message</p>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}

export default ConditionalDemo;`
  },
  8: {
    a: `// React Components Demo
import React from 'react';

function Header() {
  return <header><h1>My App</h1></header>;
}

function Footer() {
  return <footer><p>© 2024</p></footer>;
}

function Content() {
  return <main><p>Main content here</p></main>;
}

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;`,
    b: `// MongoDB CRUD using Compass
1. Open MongoDB Compass
2. Connect to mongodb://localhost:27017
3. Create Database: company
4. Create Collection: employees
5. Insert Document: Click "Add Data" > "Insert Document"
   { "name": "John", "position": "Developer", "salary": 60000 }
6. Find: Use filter { "position": "Developer" }
7. Update: Click on document > Edit > Modify > Update
8. Delete: Click on document > Delete`
  },
  9: {
    a: `// Node.js HTTP Module Demo
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Node.js HTTP Server!</h1>');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
    b: `// Express.js Load HTML Page
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// index.html
<!DOCTYPE html>
<html>
<head><title>My Page</title></head>
<body><h1>Welcome to Express!</h1></body>
</html>`
  },
  10: {
    a: `// React List Rendering Demo
import React from 'react';

function ListDemo() {
  const items = ['Apple', 'Banana', 'Orange', 'Mango'];
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  
  return (
    <div>
      <ul>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default ListDemo;`,
    b: `// Express.js with EJS Template Engine
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = { title: 'Home', users: ['Alice', 'Bob', 'Charlie'] };
  res.render('index', data);
});

app.listen(3000);

// views/index.ejs
<!DOCTYPE html>
<html>
<head><title><%= title %></title></head>
<body>
  <h1><%= title %></h1>
  <ul>
    <% users.forEach(user => { %>
      <li><%= user %></li>
    <% }); %>
  </ul>
</body>
</html>`
  },
  11: {
    a: `// Express.js Arithmetic Form Handling
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(\`
    <form method="POST" action="/calculate">
      <input name="num1" type="number" placeholder="Number 1">
      <select name="operation">
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>
      <input name="num2" type="number" placeholder="Number 2">
      <button type="submit">Calculate</button>
    </form>
  \`);
});

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  const n1 = parseFloat(num1), n2 = parseFloat(num2);
  let result;
  switch(operation) {
    case 'add': result = n1 + n2; break;
    case 'subtract': result = n1 - n2; break;
    case 'multiply': result = n1 * n2; break;
    case 'divide': result = n1 / n2; break;
  }
  res.send(\`Result: \${result}\`);
});

app.listen(3000);`,
    b: `// Node.js prompt-sync Module
const prompt = require('prompt-sync')();

console.log('Welcome to the Calculator!');

const name = prompt('Enter your name: ');
console.log(\`Hello, \${name}!\`);

const num1 = parseFloat(prompt('Enter first number: '));
const num2 = parseFloat(prompt('Enter second number: '));

const sum = num1 + num2;
console.log(\`Sum: \${sum}\`);

const choice = prompt('Do you want to continue? (yes/no): ');
if (choice === 'yes') {
  console.log('Continuing...');
} else {
  console.log('Goodbye!');
}`
  },
  12: {
    a: `// Node.js Read File
const fs = require('fs');

// Asynchronous read
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content:', data);
});

// Synchronous read
const data = fs.readFileSync('input.txt', 'utf8');
console.log(data);`,
    b: `// Express.js Multiple Routes and Navigation
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(\`
    <h1>Home Page</h1>
    <a href="/about">About</a> | 
    <a href="/contact">Contact</a>
  \`);
});

app.get('/about', (req, res) => {
  res.send(\`
    <h1>About Page</h1>
    <a href="/">Home</a> | 
    <a href="/contact">Contact</a>
  \`);
});

app.get('/contact', (req, res) => {
  res.send(\`
    <h1>Contact Page</h1>
    <a href="/">Home</a> | 
    <a href="/about">About</a>
  \`);
});

app.listen(3000, () => console.log('Server running'));`
  },
  13: {
    a: `// Node.js Delete Employee from MongoDB
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function deleteEmployee() {
  await client.connect();
  const db = client.db('company');
  const collection = db.collection('employees');
  
  // Delete one
  const result1 = await collection.deleteOne({ name: "John" });
  console.log('Deleted:', result1.deletedCount);
  
  // Delete many
  const result2 = await collection.deleteMany({ salary: { $lt: 30000 } });
  console.log('Deleted:', result2.deletedCount);
  
  await client.close();
}

deleteEmployee();`,
    b: `// React Components Demo
import React from 'react';

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const Card = ({ title, content }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px' }}>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

function App() {
  return (
    <div>
      <Card title="Card 1" content="This is card 1" />
      <Card title="Card 2" content="This is card 2" />
      <Button text="Click Me" onClick={() => alert('Clicked!')} />
    </div>
  );
}

export default App;`
  },
  14: {
    a: `// MongoDB CRUD Operations (Shell)
// 1. Create Database and Collection
use company
db.createCollection("employees")

// 2. Insert
db.employees.insertOne({ name: "John", age: 30, position: "Developer" })
db.employees.insertMany([
  { name: "Alice", age: 25, position: "Designer" },
  { name: "Bob", age: 35, position: "Manager" }
])

// 3. Read
db.employees.find()
db.employees.find({ position: "Developer" })
db.employees.findOne({ name: "John" })

// 4. Update
db.employees.updateOne(
  { name: "John" },
  { $set: { age: 31 } }
)
db.employees.updateMany(
  { position: "Developer" },
  { $set: { department: "IT" } }
)

// 5. Delete
db.employees.deleteOne({ name: "Bob" })
db.employees.deleteMany({ age: { $lt: 30 } })`,
    b: `// React Styling Demo
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div\`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 10px;
  color: white;
\`;

function StyledApp() {
  const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial'
    },
    heading: {
      color: '#333',
      fontSize: '24px'
    }
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Inline Styles</h1>
      <StyledDiv>Styled Components</StyledDiv>
      <p className="css-module">CSS Module Style</p>
    </div>
  );
}

export default StyledApp;`
  },
  15: {
    a: `// React useContext Hook Demo
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function Profile() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h2>Profile: {user.name}</h2>
      <button onClick={() => setUser({ name: 'Jane', age: 28 })}>
        Change User
      </button>
    </div>
  );
}

function Display() {
  const { user } = useContext(UserContext);
  return <p>Age: {user.age}</p>;
}

function App() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Profile />
      <Display />
    </UserContext.Provider>
  );
}

export default App;`,
    b: `// Node.js Insert Employee to MongoDB
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function insertEmployees() {
  await client.connect();
  const db = client.db('company');
  const collection = db.collection('employees');
  
  // Insert one
  const result1 = await collection.insertOne({
    name: "John Doe",
    position: "Developer",
    salary: 60000,
    department: "IT"
  });
  console.log('Inserted ID:', result1.insertedId);
  
  // Insert many
  const result2 = await collection.insertMany([
    { name: "Alice", position: "Designer", salary: 55000 },
    { name: "Bob", position: "Manager", salary: 70000 }
  ]);
  console.log('Inserted IDs:', result2.insertedIds);
  
  await client.close();
}

insertEmployees();`
  }
};
