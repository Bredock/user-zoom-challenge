# UserZoom Challenge

This is a React App to monitorize Github repos and see it's activity.  
Enter the name of the organization you want to see the repos and press search button.  
Click on a repo row to see the details and the commit history of that repo.  
On the Details section you can track the repo.

# Installation

- Run the "npm run install:dev" script to install both client and server dependencies.
- Create ".env" file on the root folder with the content:
```
PORT=5000
MONGO_URI=mongodb+srv://user-123:user-123@devconnector.ncmsn.mongodb.net/userZoom?retryWrites=true&w=majority
```
- Run the "npm run dev" script to launch both applications.
- To run the backend tests run "npm run test" script.

# Server

The data tracked is saved on a MongoDb database.  
There is an endpoint to get all the repositories tracked (GET: http://localhost:5000/api/repos)