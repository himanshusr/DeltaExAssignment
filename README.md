
# Team Members Assignment 



## Deployed App

http://singhrao-team-members.herokuapp.com/



## Features of this app

- ADD & DELETE Records
- Records are sortable by status
- Filter dropdown that supports a multi-select checkbox (with select all option)
- Auto login after signup
- Backend Api for Authentication, storing values in MongoDB



## Environment Variables

To run this project, you will need to add the following environment variables to your config/default.json folder

`"MongoURI": "<Paste-here-your-mongoDB-connection-string>"`
`"JWT_SECRET": "<Add-your-jwt-secret>"`



## Installation (Please follow the order)

Install dependencies
1) Go in the project root (to install server dependencies)

```bash
  npm install 
  
```
2) cd to client (to install client dependencies) 



```bash
  cd client
  npm install
```

3) cd back to root and run the project.



```bash
  cd ../
  npm run dev
```
4) The project will be running in developer mode using concurrently script

## Tech Stack

**Client:** ReactJs, Redux, HTML, CSS

**Server:** NodeJs, Express

**Database:** MongoDB





