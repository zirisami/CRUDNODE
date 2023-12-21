import 'bootstrap/dist/css/bootstrap.min.css'
import Mysql from './Mysql'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Create from './Create'
import Read from './Read'
import Edit from './Update'
function App() {
  return (<>
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mysql />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/read/:id' element={<Read />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
  </BrowserRouter>

</>
  )
}

export default App
