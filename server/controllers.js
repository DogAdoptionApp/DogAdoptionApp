const db = require('./db/dbModel');
const apiController = {};

apiController.save = (req, res, next) => {
  //some code
  console.log(req.params, "params")
  console.log(req.body, "body")
  const { userId } = req.params;
  const { petfinder_id, petfinder_url, name, photo, gender, size, breed, location } = req.body;

	
	// const dogList = `
	// 	INSERT INTO dogs
	// 	VALUES (DEFAULT, petfinder_id, petfinder_url, name, photo, gender, size, breed, location)
	// 	`;
  
	// const dogList = `
	// 	INSERT INTO Dogs 
	// 	VALUES (DEFAULT, ${petfinder_id}, ${petfinder_url}, ${name}, ${photo}, ${gender}, ${size}, ${breed}, ${location})
	// 	`;
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
      // res.locals.dog = data.rows;
			// return next();
		})
    .catch(err => {
      return next({
        log: 'Error adding dog to dogs table',
        message: { err }
      })
    })
}

module.exports = apiController;

