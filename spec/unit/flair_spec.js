const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;

describe('Flair', () => {
  beforeEach((done) => {
    this.post;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Post.create({
        title: "My second visit to Proxima Centauri b",
        body: "On my second visit to P. Centauri b, I met some aliens. They were lovely and now we are friends.",
        topicId: 1
      }).then((post) => {
        this.post = post;

        Flair.create({
          title: 'Trending',
          color: '#F0AD4E',
          
        })
      })
    })
  })

  
})
