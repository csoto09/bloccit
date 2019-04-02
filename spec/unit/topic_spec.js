const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe('Topic', () => { 
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
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
