import { ExampleComponent } from '@components/ExampleComponent'

export default {
  title: 'Components/ExampleComponent',
  component: ExampleComponent,
}

const Template = (args) => <ExampleComponent {...args} />

export const Base = Template.bind({})
