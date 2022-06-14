module.exports = {
  description: 'Create a new component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component? (ex. Callout)',
    },
    {
      type: 'list',
      name: 'componentType',
      message: 'What type of component are you creating?',
      default: '',
      choices: [
        { name: 'Section', value: 'sections/' },
        { name: 'Shared', value: 'shared/' },
        { name: 'Other', value: '' },
      ],
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'components/{{componentType}}{{pascalCase name}}.js',
      templateFile: 'generators/templates/component.js.hbs',
    },
    {
      type: 'add',
      path: 'stories/components/{{componentType}}{{pascalCase name}}.stories.jsx',
      templateFile: 'generators/templates/component-story.js.hbs',
    },
  ],
}
