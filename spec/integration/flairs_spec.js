const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/flairs'
const sequelize = require("../../src/db/models/index").sequelize;
 const Flair = require("../../src/db/models").Flair;


describe('routes : flairs', () => {

  beforeEach((done) => {
    this.flair;
    sequelize.sync({force: true}).then((res) => {

      Flair.create({
        title: 'Trending',
        color: 'red'
      })
     Topic.create({
       title: "JS Frameworks",
       description: "There is a lot of them"
     })
      .then((flair) => {
        this.flair = flair;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });
  describe('GET /flairs', () => {
    it('should return a status code 200 and all available flairs', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200)
        expect(err).toBeNull();
        expect(body).toContain('Flair Listing')
        expect(body).toContain('Trending')
        done()
      })
    })
  })
  
})
