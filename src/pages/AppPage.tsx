import logo from '../logo.svg'
import './AppPage.scss'
import ClickCounter from '../components/ClickCounter'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1>
          Environment: - {process.env.NODE_ENV} - {process.env.name}
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ClickCounter />
      </header>
    </div>
  )
}

export default App
