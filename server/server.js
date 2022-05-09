const express = require('express');
const app = express();
const PORT = 3000;
const apiController = require('./controllers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.post -> receive dog info and save it to the users likes list
app.post('/api/like/:userId', apiController.saveLikedDog, (req, res) => {
  console.log("dog has been saved to database");
  return res.sendStatus(200);
});

//app.get -> return users liked dogs for the faves pages
app.get('/api/like/:userId', apiController.fetchLikedDogs, (req, res) => {
  console.log('fetched dogs: ' + res.locals.dogs);
  return res.status(200).json(res.locals.dogs);
});

//app.post -> stores user preferences in database


//app.get -> fetches user preferences from database


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
