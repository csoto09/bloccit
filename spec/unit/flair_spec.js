const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;

describe('Flair', () => {
  beforeEach((done) => {
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Flair.create({
        title: 'trending',
        color: '#F0AD4E'
      })
      .then((flair) => {
        this.flair = flair;
        done()
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })
  })
  
  describe('#create()', () => {
    it('should create a flair with a title and color',(done) => {
      Flair.create({
        title: 'trending',
        color: '#F0AD4E'
      })
      .then((flair) => {
        expect(flair.title).toBe('trending');
        expect(flair.color).toBe('#F0AD4E')
        done()
      })      
      .catch((err) => {
        console.log(err);
        done();
      });
    })

    it('should not create flair with invalid attributes', (done) => {
      Flair.create({
        title: 'Verified'
      })
      .then((flair) => {
        done()
      })
      .catch((err) => {
        expect(err.message).toContain("Flair.color cannot be null");
        done();
      })
    })
  })
  
  describe('#read()', () => {
    it('Should return valid flair records', (done) => {
      Flair.findOne({
        where: { id: this.flair.id }
      })
      .then((flair) => {
        expect(flair.title).toBe('trending')
        done()
      })
      .catch((err) => {
        console.log(err);
        done()
      })
    })
  })
  
  describe('#update()', () => {
    it('should update record with given values', (done) => {
      this.flair.update({
        color: "#40E0D0",
        title: "Trending"
      })
      .then(flair => {
        expect(flair.color).toBe('#40E0D0')
        done()
      })
      .catch(err => {
        console.log(err);
        done()
      })
    })
  })
  
  // describe('#destroy()', () => {
  //   Flair.findAll()
  //   .then((flairs) => {
  //     const flairCountBeforeDelete = flairs.length;
  //     expect(flairCountBeforeDelete).toBe(1)
  //     flairs[0].destroy()
  //     .then((flairs) => {
  //       expect(flairs.length).toBe(flairCountBeforeDelete - 1)
  //       expect(err).toBeNull()
  //       done()
  //     })
  //   })
  // })
})
