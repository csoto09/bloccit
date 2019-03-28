'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flair = sequelize.define('Flair', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    color: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Flair.associate = function(models) {
    // associations can be defined here
    // Project.belongsToMany(User, {through: 'UserProject'});
    Flair.belongsToMany(models.Post, {through: 'PostFlair'})
  };
  return Flair;
};