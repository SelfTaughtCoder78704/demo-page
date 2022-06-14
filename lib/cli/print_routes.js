const routes = require('../../routes.json')

const printRoutes = () => {
  Object.keys(routes).forEach((route) => {
    console.log(`${route}  -  ${routes[route].page}`)
  })
}

printRoutes()
