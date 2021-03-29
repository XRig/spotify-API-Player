
import Dashboard from './dashboard'
import Login from './login'

interface Props {}
const code = new URLSearchParams(window.location.search).get('code')
function App(props: Props) {
return code? <Dashboard code={code}/> : <Login/>
}

export default App
