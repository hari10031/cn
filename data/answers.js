export const answersData = {
  1: {
    a: [
      {
        title: 'UseStateDemo.js',
        code: `import { useState } from "react"

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

export default UseStateDemo`
      },
      {
        title: 'App.js',
        code: `import UseStateDemo from "./UseStateDemo";

function App() {
  return (
    <div align="center">
      <UseStateDemo/>
    </div>
  );
}

export default App;`
      }
    ],
    b: `// Node.js URL Module Demo
const { URL } = require('url');
const str = "https://user:abcd@www.example.com:4000/abc/xyz/sample.txt?value1=10&value2=20#demo"
const myUrl = new URL(str);
console.log("Hostname=" + myUrl.hostname);
console.log("Portnumber=" + myUrl.port);
console.log("Relative path=" + myUrl.pathname);
console.log("Queryparams=" + myUrl.search);
console.log("Hashed data=" + myUrl.hash);
console.log("Username=" + myUrl.username);
console.log("Password=" + myUrl.password);
console.log("Protocol=" + myUrl.protocol);`
  },
  2: {
    a: [
      {
        title: 'WithJsx.js',
        code: `import React from "react";

function WithJsx() {
  return (
    <div align="center">
      <h1>This is H1 tag executed using JSX</h1>
      <p>This is paragraph tag executed using JSX</p>
    </div>
  )
}

export default WithJsx;`
      },
      {
        title: 'WithoutJsx.js',
        code: `import React from "react";

function WithoutJsx() {
  let k1 = React.createElement("h1", null, "This is H1 tag executed without JSX")
  let k2 = React.createElement("p", null, "This is Paragraph tag executed without JSX")
  let k3 = React.createElement("div", {"align":"center"}, k1, k2);
  return k3;
}

export default WithoutJsx;`
      },
      {
        title: 'App.js',
        code: `import WithJsx from './WithJsx';
import WithoutJsx from './WithoutJsx';

function App() {
  return (
    <div align="center">
      <h3>React JS Program to demonstrate JSX</h3><hr/>
      <WithJsx/>
      <WithoutJsx/>
    </div>
  );
}

export default App;`
      }
    ],
    b: `// MongoDB Connection and Fetch Data
const mdb = require("mongodb")
const prompt = require("prompt-sync")()
const mclient = mdb.MongoClient
const url = "mongodb://localhost:27017"

async function connectDB() {
  try {
    const conn = await mclient.connect(url);
    console.log("Mongodb connection success...")
    const test = conn.db("test")
    const std = test.collection("student")
    let result = await std.find({}).toArray()
    console.log(result);
    console.log("Number of records fetched=" + result.length)
    conn.close()
  } catch(error) {
    console.log("Error=" + error)
  }
}

connectDB()`
  },
  3: {
    a: [
      {
        title: 'Arithmetic.js',
        code: `import { Component } from "react";

class Arithmetic extends Component {
  constructor(props) {
    super(props);
    this.state = {a:0, b:0, c:""}
  }
  
  changeA = (event) => {this.setState({a:event.target.value})}
  changeB = (event) => {this.setState({b:event.target.value})}
  
  add = () => {
    let x = parseInt(this.state.a);
    let y = parseInt(this.state.b);
    this.setState({c:(x+y)})
  }
  
  sub = () => {
    let x = parseInt(this.state.a);
    let y = parseInt(this.state.b);
    this.setState({c:(x-y)})
  }
  
  mul = () => {
    let x = parseInt(this.state.a);
    let y = parseInt(this.state.b);
    this.setState({c:(x*y)})
  }
  
  div = () => {
    let x = parseInt(this.state.a);
    let y = parseInt(this.state.b);
    this.setState({c:(x/y)})
  }
  
  render() {
    return (
      <div>
        <h4>Arithmetic Operations using React Events</h4><hr/>
        Enter first number:
        <input type="text" value={this.state.a} onChange={this.changeA}/>
        <br/>
        Enter second number:
        <input type="text" value={this.state.b} onChange={this.changeB}/>
        <br/>
        <button onClick={this.add}>Add</button>&nbsp;&nbsp;
        <button onClick={this.sub}>Subtract</button>&nbsp;&nbsp;
        <button onClick={this.mul}>Multiply</button>&nbsp;&nbsp;
        <button onClick={this.div}>Divide</button><br/>
        Result={this.state.c}
      </div>
    );
  }
}

export default Arithmetic;`
      },
      {
        title: 'App.js',
        code: `import './App.css';
import Arithmetic from './Arithmetic';

function App() {
  return (
    <div className="App">
      <Arithmetic/>
    </div>
  );
}

export default App;`
      }
    ],
    b: `// Node.js Append to File
const file = require("fs")
const prompt = require("prompt-sync")()
let fname = prompt("Enter file name to open:")
let data = prompt("Enter some text:")
file.appendFileSync(fname, data)
console.log("Data appended to file")`
  },
  4: {
    a: `// MongoDB Insert Many Records
const mdb = require("mongodb")
const prompt = require("prompt-sync")()
const mclient = mdb.MongoClient
const url = "mongodb://localhost:27017"

async function connectDB() {
  try {
    const conn = await mclient.connect(url);
    console.log("Mongodb connection success...")
    let n = prompt("How many records you want to insert?")
    n = parseInt(n)
    const test = conn.db("test")
    const std = test.collection("student")
    let query = []
    for(let i=0; i<n; i++) {
      console.log(\`Enter details of \${i} record:\\n=====\\n \`)
      let id = parseInt(prompt("enter id:"));
      let name = prompt("enter name:");
      let marks = parseInt(prompt("enter marks:"))
      let branch = prompt("enter branch:")
      let city = prompt("enter city:")
      let record = {
        "_id":id, "name":name, "marks":marks, "branch":branch, "city":city
      }
      query.push(record)
    }
    await std.insertMany(query);
    console.log(n + " records inserted")
    conn.close();
  } catch (error) {
    console.log("Error=" + error)
  }
}

connectDB()`,
    b: [
      {
        title: 'Empprops.js',
        code: `function Empprops(props) {
  return (
    <div>
      <h3>Employee details using props are:</h3>
      <hr/>
      <p>Name:{props.name}<br/>
      Eid:{props.eid}<br/>
      Salary:{props.salary}
      </p>
    </div>
  );
}

export default Empprops;`
      },
      {
        title: 'Studentcomp.js',
        code: `import { Component } from "react";

class Studentcomp extends Component {
  constructor(props) {
    super(props);
    this.state = {rno:123, name:"smith", marks:70, branch:"CSE-DS"}
  }
  
  change = () => {
    this.setState({rno:345, name:"SMITH", marks:80, branch:"CSE-DS"})
  }
  
  render() {
    return (
      <div>
        <h3>Student Details using State</h3><hr/>
        <p>Roll number:{this.state.rno}<br/>
        Name:{this.state.name}<br/>
        Branch:{this.state.branch}<br/>
        Marks:{this.state.marks}<br/>
        </p>
        <button onClick={this.change}>Click to change</button>
      </div>
    );
  }
}

export default Studentcomp;`
      },
      {
        title: 'App.js',
        code: `import './App.css';
import Empprops from './propsdemo/Empprops';
import Studentcomp from './propsdemo/Studentcomp';

function App() {
  return (
    <div className="App">
      <Empprops name="John" eid={123} salary={6000}/>
      <Studentcomp/>
    </div>
  );
}

export default App;`
      }
    ]
  },
  5: {
    a: [
      {
        title: 'Sample.css',
        code: `p {
  color: blue;
  border: 5px solid green;
  background-color: bisque;
  font-style: italic;
  font-size: 40px;
  margin-left: 400px;
  margin-right: 400px;
}`
      },
      {
        title: 'Rules.module.css',
        code: `.rule1 {
  color: white;
  background-color: darkmagenta;
  border: 10px dotted yellow;
  margin-left: 300px;
  margin-right: 300px;
  font-size: 40px;
}`
      },
      {
        title: 'StyleDemo.js',
        code: `import "./Sample.css"
import styles from "./Rules.module.css"

function StyleDemo() {
  return (
    <div>
      <h1 style={{color:"red", fontSize:"30px"}}>
        This is H1 tag with Inline Style
      </h1>
      <p>This is paragraph with external style</p>
      <h2 className={styles.rule1}>
        This is H2 tag with external Module style
      </h2>
    </div>
  );
}

export default StyleDemo;`
      }
    ],
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
    a: [
      {
        title: 'Parent.js',
        code: `import Child from "./Child"

function Parent() {
  return (<>
    <h3>Parent Component</h3>
    <Child/>
  </>)
}

export default Parent;`
      },
      {
        title: 'Child.js',
        code: `import GrandChild from "./GrandChild"

function Child() {
  return (<>
    <h3>Child component</h3>
    <GrandChild/>
  </>)
}

export default Child;`
      },
      {
        title: 'GrandChild.js',
        code: `import { UserNameContext } from "./App";
import { useContext } from "react";

function GrandChild() {
  let data = useContext(UserNameContext);
  return (<>
    <h3>Grand Child component</h3>
    <h3>Data Inherited from Main Application={data}</h3>
  </>)
}

export default GrandChild;`
      },
      {
        title: 'App.js',
        code: `import Parent from "./Parent"
import React from "react";

export const UserNameContext = React.createContext();

function App() {
  return (
    <div align="center">
      <UserNameContext.Provider value={"MVSR"}>
        <Parent/>
      </UserNameContext.Provider>
    </div>
  );
}

export default App;`
      }
    ],
    b: `// MongoDB Delete Many with Dynamic Search
const mdb = require("mongodb")
const prompt = require("prompt-sync")()
const mclient = mdb.MongoClient
const url = "mongodb://localhost:27017"

async function connectDB() {
  try {
    const conn = await mclient.connect(url)
    const test = conn.db("test")
    const std = test.collection("student")
    console.log("Mongodb connection success...")
    let query1 = {}
    let skey = prompt("Enter search key:")
    let svalue = prompt("Enter search value:")
    query1[skey] = svalue
    await std.deleteMany(query1)
    conn.close()
    console.log("Record(s) Deleted")
  } catch (error) {
    console.log("Error=" + error)
  }
}

connectDB()`
  },
  7: {
    a: `// Node.js Create and Write File
const file = require("fs")
const prompt = require("prompt-sync")()
let fname = prompt("Enter file name to create:")
let data = prompt("Enter some text:")
file.writeFileSync(fname, data)
console.log("File created and data written to file")`,
    b: [
      {
        title: 'Conditional.js',
        code: `function Conditional(props) {
  let k = props.value;
  if (k)
    return <h1>True Conditional tag executed</h1>
  else
    return <h1>False Conditional tag executed</h1>
}

export default Conditional;`
      },
      {
        title: 'List.js',
        code: `function List() {
  let items = ["CSE", "CSIT", "DS", "IOTT", "AIML"]
  let temp = []
  for (let k=0; k<items.length; k++)
    temp.push(<li>{items[k]}</li>)
  return (<>
    <h3>Displaying List using for loop</h3><br/>
    <ol>{temp}</ol>
    <hr/>
    <h3>Displaying List using map function</h3><br/>
    <ul>
      {
        items.map((value) => <li>{value}</li>)
      }
    </ul>
  </>)
}

export default List;`
      },
      {
        title: 'App.js',
        code: `import Conditional from "./Conditional";
import List from "./List";

function App() {
  return (
    <div align="center">
      <h3>React JS Program to demonstrate Conditional Rendering and List Rendering</h3><hr/>
      <Conditional value={true}/>
      <Conditional value={false}/>
      <List/>
    </div>
  );
}

export default App;`
      }
    ]
  },
  8: {
    a: [
      {
        title: 'FunctionDemo.js',
        code: `function FunctionDemo() {
  return <h1>Function Component Executed</h1>
}

export default FunctionDemo;`
      },
      {
        title: 'ClassComDemo.js',
        code: `import { Component } from "react";

class ClassComDemo extends Component {
  render() {
    return <h1>Class Component Executed</h1>
  }
}

export default ClassComDemo;`
      },
      {
        title: 'App.js',
        code: `import './App.css';
import FunctionDemo from './FunctionDemo';
import ClassComDemo from './ClassComDemo';

function App() {
  return (
    <div className="App">
      <h1>ReactJS Application to demonstrate Components</h1>
      <hr/>
      <FunctionDemo/>
      <ClassComDemo/>
    </div>
  );
}

export default App;`
      }
    ],
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
    b: [
      {
        title: 'FunctionDemo.js',
        code: `function FunctionDemo() {
  return <h1>Function Component Executed</h1>
}

export default FunctionDemo;`
      },
      {
        title: 'ClassComDemo.js',
        code: `import { Component } from "react";

class ClassComDemo extends Component {
  render() {
    return <h1>Class Component Executed</h1>
  }
}

export default ClassComDemo;`
      },
      {
        title: 'App.js',
        code: `import './App.css';
import FunctionDemo from './FunctionDemo';
import ClassComDemo from './ClassComDemo';

function App() {
  return (
    <div className="App">
      <h1>ReactJS Application to demonstrate Components</h1>
      <hr/>
      <FunctionDemo/>
      <ClassComDemo/>
    </div>
  );
}

export default App;`
      }
    ]
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
    b: [
      {
        title: 'Sample.css',
        code: `p {
  color: blue;
  border: 5px solid green;
  background-color: bisque;
  font-style: italic;
  font-size: 40px;
  margin-left: 400px;
  margin-right: 400px;
}`
      },
      {
        title: 'Rules.module.css',
        code: `.rule1 {
  color: white;
  background-color: darkmagenta;
  border: 10px dotted yellow;
  margin-left: 300px;
  margin-right: 300px;
  font-size: 40px;
}`
      },
      {
        title: 'StyleDemo.js',
        code: `import "./Sample.css"
import styles from "./Rules.module.css"

function StyleDemo() {
  return (
    <div>
      <h1 style={{color:"red", fontSize:"30px"}}>
        This is H1 tag with Inline Style
      </h1>
      <p>This is paragraph with external style</p>
      <h2 className={styles.rule1}>
        This is H2 tag with external Module style
      </h2>
    </div>
  );
}

export default StyleDemo;`
      }
    ]
  },
  15: {
    a: [
      {
        title: 'Parent.js',
        code: `import Child from "./Child"

function Parent() {
  return (<>
    <h3>Parent Component</h3>
    <Child/>
  </>)
}

export default Parent;`
      },
      {
        title: 'Child.js',
        code: `import GrandChild from "./GrandChild"

function Child() {
  return (<>
    <h3>Child component</h3>
    <GrandChild/>
  </>)
}

export default Child;`
      },
      {
        title: 'GrandChild.js',
        code: `import { UserNameContext } from "./App";
import { useContext } from "react";

function GrandChild() {
  let data = useContext(UserNameContext);
  return (<>
    <h3>Grand Child component</h3>
    <h3>Data Inherited from Main Application={data}</h3>
  </>)
}

export default GrandChild;`
      },
      {
        title: 'App.js',
        code: `import Parent from "./Parent"
import React from "react";

export const UserNameContext = React.createContext();

function App() {
  return (
    <div align="center">
      <UserNameContext.Provider value={"MVSR"}>
        <Parent/>
      </UserNameContext.Provider>
    </div>
  );
}

export default App;`
      }
    ],
    b: `// MongoDB Insert Many Records
const mdb = require("mongodb")
const prompt = require("prompt-sync")()
const mclient = mdb.MongoClient
const url = "mongodb://localhost:27017"

async function connectDB() {
  try {
    const conn = await mclient.connect(url);
    console.log("Mongodb connection success...")
    let n = prompt("How many records you want to insert?")
    n = parseInt(n)
    const test = conn.db("test")
    const std = test.collection("student")
    let query = []
    for(let i=0; i<n; i++) {
      console.log(\`Enter details of \${i} record:\\n=====\\n \`)
      let id = parseInt(prompt("enter id:"));
      let name = prompt("enter name:");
      let marks = parseInt(prompt("enter marks:"))
      let branch = prompt("enter branch:")
      let city = prompt("enter city:")
      let record = {
        "_id":id, "name":name, "marks":marks, "branch":branch, "city":city
      }
      query.push(record)
    }
    await std.insertMany(query);
    console.log(n + " records inserted")
    conn.close();
  } catch (error) {
    console.log("Error=" + error)
  }
}

connectDB()`
  }
};
