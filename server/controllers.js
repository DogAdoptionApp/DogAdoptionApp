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

apiController.addPrefs = (req, res, next) => {
  //save user preferences to database
  console.log(req.body, "helllooo")
  const { userId } = req.params;
  const { location, size_pref, age_pref, gender_pref,	breed_pref,	has_dog, has_kid } = req.body;
  const has_dogs = has_dog === "true" ? "1" : "0";
  const has_kids = has_kid === "true" ? "1": "0";

  const usersPref = `
  UPDATE Users SET location = $1, size_pref = $2, age_pref = $3, gender_pref = $4, breed_pref = $5, has_dog = $6, has_kid = $7  
  WHERE _id = ${userId}
  RETURNING *
  `;

  const value = [location, size_pref, age_pref, gender_pref, breed_pref, has_dogs, has_kids];

  db.query(usersPref, value)
    .then(data => {
      res.locals.updatePrefs = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error patching',
        message: { err }
      })
    })

}

apiController.getPrefs = (req, res, next) => {
  //fetch user prefs for front end to call api based on the prefs
  const { userId } = req.params;

  const usersPrefList = `
    SELECT * FROM users WHERE _id = ${userId}
  `;

  db.query(usersPrefList)
  .then(data => {
    res.locals.getPrefs = data.rows;
    return next();
  })
  .catch(err => {
    return next({
      log: 'Error getting back user preferences',
      message: { err }
    })
  })
}

apiController.deleteLikedDogs = (req, res, next) => {
  const { dogId } = req.params;
  const deleteDog = `
  DELETE FROM users_dogs WHERE dogs_id = ${dogId}
  RETURNING *
  `;

  db.query(deleteDog)
  .then(data => {
    res.locals.deleted = data.rows;
    return next();
  })
  .catch(err => {
    return next({
    log: 'Error deleting dog',
    message: { err }
    })
  })
}

module.exports = apiController;
