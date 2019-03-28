const Flair = require('./models').Flair;

module.exports = {

  getAllFlairs(callback) {
    return Flair.findAll()
    .then((flairs) => {
      callback(null, flairs);
    })
    .catch((err) => {
      callback(err);
    })
  }
}