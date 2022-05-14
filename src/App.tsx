import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import {AuthContextProvider} from "./context/AuthContext"

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<NewRoom /> } path="/rooms/new" />
        </Routes>  
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;

