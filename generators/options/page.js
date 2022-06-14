module.exports = {
  description: 'Create a new page',
  prompts: [
    {
      type: 'input',
      name: 'route',
      message: 'What is the route of the page? (ex. /overview)',
    },
    {
      type: 'input',
      name: 'filename',
      message: 'What is the filename of the page? (ex. overview_a)',
    },
    {
      type: 'list',
      name: 'isCMS',
      message: 'Is your page data coming from a CMS?',
      default: false,
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
    },
  ],
  actions: ({ route, filename, isCMS }) => {
    const actions = [
      {
        type: 'addToRoutes',
        route,
        filename,
      },
      {
        type: 'add',
        path: 'pages/{{snakeCase filename}}.js',
        templateFile: isCMS
          ? 'generators/templates/cms-page.js.hbs'
          : 'generators/templates/page.js.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'styles/pages/{{snakeCase filename}}.scss',
        templateFile: 'generators/templates/page-styles.scss',
        skipIfExists: true,
      },
    ]

    if (!isCMS) {
      actions.push({
        type: 'add',
        path: 'page-content/{{kebabCase filename}}.json',
        templateFile: 'generators/templates/page-content.json',
        skipIfExists: true,
      })
    }

    return actions
  },
}
