const Advertisement = require('./models').Advertisement;

module.exports = {
  getAllAds(callback) {
    Advertisement.findAll()
    .then((ads) => {
      callback(null, ads)
    })
    .catch((err) => {
      callback(err)
    })
  },
  addAdvertisement(newAd, callback) {
    return Advertisement.create({
      title: newAd.title,
      description: newAd.description
    }).then((ad) => {
      callback(null, ad)
    }).catch((err) => {
      callback(err)
    })
  },
  getAdvertisement(id, callback) {
    return Advertisement.findByPk(id)
    .then((ad) => {
      callback(null, ad)
    })
    .catch((err) => {
      callback(err)
    })
  },
  deleteAd(id, callback) {
    return Advertisement.destroy({
      where: {id}
    })
    .then((ad) => {
      callback(null, ad)
    })
    .catch((err) => {
      callback(err)
    })
  },
  updateAd(id, updatedAd, callback){
    return Advertisement.findByPk(id)
    .then((ad) => {
      if(!ad){
        return callback("Advertisement not found");
      }
      ad.update(updatedAd, {
        fields: Object.keys(updatedAd)
      })
      .then(() => {
        callback(null, ad);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },
}