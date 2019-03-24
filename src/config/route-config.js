module.exports = {
  init (app) {
    const staticRoutes = require('../routes/static')
    const topicRoutes = require('../routes/topics')
    const adsRoutes = require('../routes/ads')
    const postRoutes = require('../routes/posts')

    app.use(staticRoutes)
    app.use(postRoutes)
    app.use(topicRoutes)
    app.use(adsRoutes)
  }
}
