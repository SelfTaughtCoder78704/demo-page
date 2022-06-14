const { page, component } = require('./generators/options')
const { addToRoutes } = require('./generators/actions')

module.exports = function (plop) {
  plop.setActionType('addToRoutes', function ({ route, filename }) {
    return new Promise(async (resolve, reject) => {
      try {
        await addToRoutes(route, filename)
        resolve(`${route} added to routes`)
      } catch (err) {
        reject(err)
      }
    })
  })

  plop.setGenerator('page', page)
  plop.setGenerator('component', component)
}
