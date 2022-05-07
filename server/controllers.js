const db = require('./db/dbModel');
const apiController = {};

apiController.save = (req, res, next) => {
  //some code
  const { userId } = req.params;
  const { petfinder_id, petfinder_url, name, photo, gender, size, breed, location } = req.body;

	
	// const dogList = `
	// 	INSERT INTO dogs
	// 	VALUES (DEFAULT, petfinder_id, petfinder_url, name, photo, gender, size, breed, location)
	// 	`;
	const dogList = `
		INSERT INTO Dogs
		VALUES (DEFAULT, ${petfinder_id}, ${petfinder_url}, ${name}, ${photo}, ${gender}, ${size}, ${breed}, ${location})
		`;

  

	db.query(dogList)
    .then(data => {
      //pass in next query to save userId and DogID onto users_dogs
      // const usersDogs = `INSERT INTO Users_Dogs VALUES (DEFAULT, ${data.rows._id}, ${userId});`
      // db.query(usersDogs)
      //   .then(data => next())
      // res.locals.dog = data.rows;
      console.log(data.rows[0]);
			return next();
		})
    .catch(err => {
      return next({
        log: 'Error adding dog to dogs table',
        message: { err }
      })
    })
}

module.exports = apiController;

