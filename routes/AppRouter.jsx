import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/Notfound";
import Home from "../pages/Home";
const AppRouter=()=>{
    return(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<NotFound />} />
    <Route path="/contact" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
    )

}

export default AppRouter