const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require('../../src/db/models').Flair;

describe('routes : flair', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair

    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;

          Flair.create({
            title: 'Beijing 2022',
            color: '#b9e8ea',
            postId: this.post.id
          })
          .then((flair) => {
            this.flair = flair
            done()
          })
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe('GET /posts/:postId/flairs/new', () => {
    it('should render a new flair form', (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done()
      })
    });

  });
  describe('POST /posts/:postId/flairs/create', () => {
    it("should create a new post and redirect", (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
        form: {title: 'I hate wintertime', color: "red"}
      }
      request.post(options, (err, res, body) => {
        Flair.findOne({where: {title: "I hate wintertime"}})
        .then((flair) => {
          expect(flair).not.toBeNull();
          expect(flair.title).toBe("I hate wintertime");
          expect(flair.color).toBe('red');
          expect(flair.postId).not.toBeNull();
          done()
          
        }).catch((err) => {
          console.log(err);
          done()
        });
      })
    })
  });
  describe('GET /posts/:postId/flairs/:id/edit', () => {
    it('should render a view with the selected flair and its edit form', (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Flair");
        expect(body).toContain('Beijing 2022');
        done()
      })
    });
  });
  describe('POST /posts/:postId/flairs/:id/destroy', () => {
    it('should delete flair with associated id', (done) => {
      expect(this.flair.id).toBe(1)
      request.post(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/destroy`, (err, res, body) => {
        Flair.findByPk(1)
        .then((flair) => {
          expect(err).toBeNull();
          expect(flair).toBeNull();
          done()
        });
      })
    });
  });
  describe('POST /posts/:postId/flairs/:id/update', () => {
    it('should return a status code 302', (done) => {
      request.post({
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
        form: {
          title: "PyeongChang 2018",
          color: "#00983D"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done()
      })
    });

    it('should update flair with given values', (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
        form: {
          title: "PyeongChang 2018",
          color: "#00983D"
        }
      }
      request.post(options, (err, res, body) => {
        Flair.findOne({
          where: {id: this.flair.id}
        }).then((flair) => {
          expect(flair.title).toBe("PyeongChang 2018");
          expect(flair.color).toBe("#00983D");
          done()
        })
      })
    });
  });
});