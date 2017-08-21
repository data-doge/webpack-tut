const React = require('react')
const ReactDOM = require('react-dom')
const { AppContainer } = require('react-hot-loader')
const App = require('./App')

const rootEl = document.body
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}
