import { render, cleanup, act } from '@testing-library/react'
import ClientApp from '@pages/_app'
import { mockMatchMedia } from '../__mocks__/matchMediaMock'
import routes from '../routes.json'

beforeAll(() => {
  mockMatchMedia()
})

afterEach(() => {
  cleanup()
})

afterAll(() => {
  jest.restoreAllMocks()
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
      query: {},
    }
  },
}))

const renderWithContext = (component, props) => {
  return render(<ClientApp Component={component} pageProps={props} />)
}

describe('Each page should render without errors', () => {
  Object.keys(routes).forEach((route) => {
    const pagePath = routes[route].page

    test(`${route} should call getInitialProps and render ${pagePath} without errors`, async () => {
      const page = require(`../pages${pagePath}`)

      const PageComponent = page.default
      const props = await PageComponent.getInitialProps({
        asPath: route,
      })

      await act(async () => {
        expect(() => renderWithContext(PageComponent, props)).not.toThrowError()
      })
    })
  })
})
