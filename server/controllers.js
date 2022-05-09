const db = require('./db/dbModel');

const apiController = {};

apiController.saveLikedDog = (req, res, next) => {
  const { userId } = req.params;
  const { petfinder_id, petfinder_url, name, photo, gender, size, breed, location } = req.body;

	const dogList = `
		INSERT INTO Dogs (petfinder_id, petfinder_url, name, photo, gender, size, breed, location)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
		`;

  const value = [petfinder_id, petfinder_url, name, photo, gender, size, breed, location];

	db.query(dogList, value)
    .then(data => {
      //pass in next query to save userId and DogID onto users_dogs
      const usersDogs = `INSERT INTO Users_Dogs (Dogs_id, Users_id) VALUES (${data.rows[0]._id}, ${userId});`
      db.query(usersDogs)
        .then(data => next())
		})
    .catch(err => {
      return next({
        log: 'Error adding dog to dogs table',
        message: { err }
      })
    })
}

apiController.fetchLikedDogs = (req, res, next) => {
  const Users_id = req.params.userId;
  //query users_dogs AND dogs for every row that has userId we want and the dog IDs match
  const userDogList = `
  SELECT *
    FROM Users_Dogs, Dogs
    WHERE Users_Dogs.Dogs_id = Dogs._id
    AND Users_Id = $1 
  `;
  
  const value  = [Users_id];

  db.query(userDogList, value)
  .then(data => {
    res.locals.dogs = data.rows;
    return next();
  })
  .catch(err => {
    return next({
      log: 'Error fetching liked dogs from dogs table',
      message: { err }
    })
  })
  
}


module.exports = apiController;
