import {BrowserRouter, Route, Routes} from "react-router";
import {Login, Register} from "./auth";
import {Products} from "./products";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Products />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
