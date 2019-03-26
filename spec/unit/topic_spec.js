const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe('Topic', () => { 
  beforeEach((done) => {
    this.topic;
    this.post;
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
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe('#create()', () => {
    it('should create a topic object with a title and description', (done) => {
      Topic.create({
        title: "Headphones",
        description: "A community to review and compare the best headphones for any purposes."
      })
      .then((topic) => {
        expect(topic.title).toBe("Headphones")
        expect(topic.description).toBe("A community to review and compare the best headphones for any purposes.")
        done()
      })
      .catch((err) => {
        console.log(err);
        done()
      })
    })
  })
  
  describe('#getPosts()', () => {
    it('should not create a topic with invalid attributes', (done) => {
      Topic.create({
        title: 'AvGeeks'
      }).then((topic) => {
        done()
      }).catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    })
    it("should return posts associated with the previously defined topic.", (done) => {
      this.topic.getPosts()
      .then((childPosts) => {
          expect(childPosts[0].topicId).toBe(this.topic.id)
          done()
        })
        .catch((err) => {
          console.log(err);
        done()
      })
    })
  })
})
