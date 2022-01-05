//Express module is used to dispatch the incoming requests
//to the corresponding behaviours (controllers)
const express = require('express');

//Create an Express server
const app = express();

//On this first version, accept anything coming from clients
app.get('*', (req, res) => {
  res.send('Express response');
});

//Start listening on a specific port
app.listen(4000);

console.log('App server running on port 4000');
