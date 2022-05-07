const db = require('./db/dbModel');
const apiController = {};

apiController.save = (req, res, next) => {
  //some code
  // const { userId } = req.params;
  const { petfinder_id, petfinder_url, name, photo, gender, size, breed, location } = req.body;

	
	const dogList = `
		INSERT INTO dogs (petfinder_id, petfinder_url, name, photo, gender, size, breed, location)
		VALUES (${petfinder_id}, ${petfinder_url}, ${name}, ${photo}, ${gender}, ${size}, ${breed}, ${location})
	` ;


	db.query(dogList)
    .then(data => {
      res.locals.dog = data.rows;
      console.log(data);
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

