const express = require('express');
const app = express();
const PORT = 3000;
const apiController = require('./controllers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.post
app.post('/api/like', apiController.save, (req, res) => {
  console.log("api working");
  return res.status(200).json(res.locals.dog);
});

//app.get
// app.get('/api/like/:userId', (req, res) => {
//   console.log("api working");
//   res.send(200);
// });


//app.delete & app.patch for stretch

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
