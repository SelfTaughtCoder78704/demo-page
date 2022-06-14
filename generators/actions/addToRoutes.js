const { promises } = require('fs')

const addToRoutes = async (route, filename) => {
  const data = await promises.readFile('routes.json', 'utf8')
  const json = JSON.parse(data)

  const formattedRoute = route[0] === '/' ? route : `/${route}`

  if (json[formattedRoute]) {
    throw new Error(`${formattedRoute} already exists in routes.json, did not add to file`)
  } else {
    json[formattedRoute] = {
      page: `/${filename}`,
    }
    const newJson = JSON.stringify(json, null, 2)

    await promises.writeFile('routes.json', newJson, 'utf8')
  }
}

module.exports = addToRoutes
