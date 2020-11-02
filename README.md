### Hi there, I'm Shubham Routh 👋

## Would like to share some insight about this app built with Express!!

- 🔭 It is a Restful crud Api.
- 🌱 There are altogether 6 routes:
- ⚡ (1) post route("/createUser") to create a new user and the body requires the following info:
- {
  "name":"userInput",
  "email":"userInput",
  "password":"userInput",
  "mobile":"9862124322",
  "address":{
  "street":"userInput",
  "locality":"userInput",
  "city":"userInput",
  "state":"userInput",
  "pincode":"chuserInputeck",
  "coordinatesType":{"type":"point", "coordinates":[22.46, 82.98]}
  }
  }
- 🥅 (2) get route("/allUser") to get all user that exist in database.
- ⚡ (3) put route("/updateUser/:id") to update an existing user(a query param id is required).
- 🌱 (4) delete route("/deleteUser/:id") to delete an existing user(a query param id is required).
- 👯 (5) get route("/sortBycreatedAt") to get all user sorted by createdAt and query param of limit||skip can be passed for pagination.
- 🌱 (6) get("/sortByCoordinate") to get all users sorted by their distance from coordinates passed in the query param of the Endpoint for example(lng=83&lat=12.4867).
- 👯 To start the server, npm run dev command will trigger nodemon to watch.
- 🥅 Also npm start will work.

<!--  -->

### Languages and Tools:

[<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />]
[<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />]
[<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />]
[<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />]
[<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />]
[<img align="left" alt="Terminal" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />]
<br />
<br />

---

<details>
  <summary>"To be or not to be"</summary>

Keep Coding!!

</details>
