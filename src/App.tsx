import {BrowserRouter, Route, Routes} from "react-router";
import {Login, Register} from "./auth";
import {Products} from "./products";
import {Layout} from "./admin";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Products />} />

                <Route path="admin" element={<Layout/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
