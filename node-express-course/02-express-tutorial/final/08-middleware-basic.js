/*
A Middleware is a type of computer software that provides services to software applications beyond those available from the operating system. It can be described as "software glue".

Middleware is software that provides a bridge between operating systems and the applications that run on them, behaving as a discreet transition layer. So, middleware acts as the “middleman,” facilitating communication, bridging the gaps between tools, databases, and applications, and ultimately providing unified services to end-users.

Middleware sits between two pieces of software which talk with one another. It is responsible for connecting the softwares together and may intercede to alter the communication or even intercept it.

Middleware is also known as “plumbing” since it connects two applications so they can pass data back and forth like through a pipeline. It’s especially useful for organizations that employ containerized or multi-cloud environments.

An Express Middleware is a function that executes during the request to the server. Each middleware function has access to request and response objects.
*/

const express = require('express')
const app = express()

//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next(); // You can either pass it to the next function or terminate as seen in the comment below
  // res.send("Hello World!")
};

app.get('/', logger, (req, res) => {
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

