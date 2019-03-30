const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          Flair.create({
            title: "Trending",
            color: '#F0AD4E',
            postId: this.post.id
          })
          .then((flair) => {
            this.flair = flair;
            done()
          })
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe('#create()', () => {
    it('should create a flair with title, color and assigned post', (done) => {
      Flair.create({
        title: "Discussion",
        color: "#4E1650",
        postId: this.post.id
      })
      .then((flair) => {
        expect(flair.title).toBe('Discussion');
        expect(flair.color).toBe("#4E1650");
        done()
      }).catch((err) => {
        console.log(err);
        done()
      });
    });
    it('should not create a flair w/o a title, color or assigned topic', (done) => {
      Flair.create({
        color: "blue"
      })
      .then((flair) => {
        done()
      }).catch((err) => {
        expect(err.message).toContain('Flair.title cannot be null');
        expect(err.message).toContain('Flair.postId cannot be null');
        done()
      });
    });
  });
  describe('#setPost()', () => {
    it('should associate a post and a flair together', (done) => {
      Post.create({
        title:'Space Ipsum',
        body: 'It suddenly struck me that that tiny pea, pretty and blue, was the Earth. I put up my thumb and shut one eye, and my thumb blotted out the planet Earth. I didn’t feel like a giant. I felt very, very small.',
        topicId: this.topic.id
      })
      .then((newPost) => {
        expect(this.flair.postId).toBe(this.post.id);
        this.flair.setPost(newPost)
        .then((flair) => {
          expect(flair.postId).toBe(newPost.id);
          done()
        })
      })
    });
  });
  describe('#getPost()', () => {
    it('should return the associated Post', (done) => {
      this.flair.getPost()
      .then((parentPost) => {
        expect(parentPost.title).toBe('My first visit to Proxima Centauri b');
        done()
      })
    });
  });
});