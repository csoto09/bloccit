const request = require('request')
const server = require('../../src/server')
const base = 'http://localhost:3000/ads/'
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require('../../src/db/models').Advertisement;

describe('routes : advertisements', () => {
  beforeEach((done) => {
    this.ad
    sequelize.sync({force: true}).then((res) => {
      
      Advertisement.create({
        title: "New Car Model",
        description: "it's new"
      })
      .then((ad) => {
        this.ad = ad
        done()
      }).catch((err) => {
        console.log(err)
        done()
      });
    })
  })

  describe('GET /ads', () => {
    it('should return a status code 200 and all ads', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200)
        expect(err).toBeNull()
        expect(body).toContain('Advertisements')
        expect(body).toContain("New Car Model")
        done()
      })
    })
  })

  describe('GET /ads/new', () => {
    it('should render a new advertisement form', (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull()
        expect(body).toContain('New Advertisement Submission')
        done()
      })
    })
  })

  describe('POST /ads/create', () => {
    const options = {
      url: `${base}create`,
      form: {
        title: 'watch this tv show',
        description: 'Tuesdays at 9'
      }
    }

    it('should create a new ad submission and redirect', (done) => {
      request.post(options, (err, res, body) => {
        Advertisement.findOne({where: {title: 'watch this tv show'}})
        .then((ad) => {
          expect(res.statusCode).toBe(303)
          expect(ad.title).toBe('watch this tv show')
          expect(ad.description).toBe('Tuesdays at 9')
          done()
        }).catch((err) => {
          console.log(err);
          done()          
        })
      })
    })
  })
  
  describe('GET /ads/:id', () => {
    it('should render a view with the selected ad entry', (done) =>{
      request.get(`${base}${this.ad.id}`, (err, res, body) => {
        expect(err).toBeNull()
        expect(body).toContain('New Car Model')
        done()
      })
    })
  })

  describe('POST /ads/:id/destroy', () => {
    it('should delete ad entry with the associated ID', (done) => {
      Advertisement.findAll()
      .then((ads) => {
        const adCountBeforeDelete = ads.length
        expect(adCountBeforeDelete).toBe(1)
        request.post(`${base}${this.ad.id}/destroy`, (err, res, body) => {
          Advertisement.findAll()
          .then((ads) => {
            expect(err).toBeNull()
            expect(ads.length).toBe(adCountBeforeDelete - 1)
            done()
          })
        })
      })
    })
  })

  describe('GET /ads/:id/edit', () => {
    it('should render a view with an edit advertisement form', (done) => {
      request.get(`${base}${this.ad.id}/edit`, (err, res, body) => {
        expect(err).toBeNull()
        expect(body).toContain('Edit Advertisement')
        expect(body).toContain('New Car Model')
        done()
      })
    })
  })
  
  describe("POST /ads/:id/update", () => {

    it("should update the ad with the given values", (done) => {
       const options = {
          url: `${base}${this.ad.id}/update`,
          form: {
            title: "New 2019 Car Model",
            description: "it's new"
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
          Advertisement.findOne({
            where: { id: this.ad.id }
          })
          .then((ad) => {
            expect(ad.title).toBe("New 2019 Car Model");
            done();
          })
        });
    });
  });  
  
})
