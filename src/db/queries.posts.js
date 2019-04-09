const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;
const Comment = require("./models").Comment;
const User = require("./models").User;
const Vote = require('./models').Vote;

module.exports = {
  addPost(newPost, callback){
    return Post.create(newPost)
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getPost(id, callback){
    return Post.findByPk(id, {
      include: [{
        model: Flair,
        as: 'flairs',        
      },
        {
          model: Comment, 
          as: "comments", 
          include: [
            {model: User }
          ]
        }, {model: Vote, as: 'votes'}
      ]
    })
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deletePost(id, callback){
    return Post.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updatePost(id, updatedPost, callback){
    return Post.findByPk(id)
    .then((post) => {
      if(!post){
        return callback("Post not found");
      }

      post.update(updatedPost, {
        fields: Object.keys(updatedPost)
      })
      .then(() => {
        callback(null, post);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}