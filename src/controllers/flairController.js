const flairQueries = require('../db/queries.flairs.js');

module.exports = {
  index(req, res, next){
    flairQueries.getAllFlairs((err, flairs) => {
      if(err) {
        res.redirect(500, 'static/index')
      } else {
        res.render('flairs/index', {flairs})
      }
    })
  }
  // index(req, res, next){
  //   res.send("TODO: list all topics");
  // }
}