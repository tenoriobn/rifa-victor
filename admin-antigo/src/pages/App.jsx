import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import AdminLayout from "./admin/AdminLayout";
import Posts from "./admin/posts/Posts";
import CreatePost from "./admin/posts/CreatePost";
import UpdatePost from "./admin/posts/UpdatePost";
import Buyers from "./admin/buyers/Buyers";
import ChooseWinner from "./admin/winner/ChooseWinner";
import Config from "./admin/config/Config";

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route element={<AuthMiddleware />}>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<AdminLayout />}>
            <Route exact path="/" element={<Posts />} />
            <Route path="/rifas" element={<Posts />} />
            <Route path="/rifas/:id" element={<UpdatePost />} />
            <Route path="/rifas/nova-rifa" element={<CreatePost />} />
            <Route path="/compras/:rifaId" element={<Buyers />} />
            <Route path="/configuracao-do-site" element={<Config />} />
            <Route path="/definir-ganhador/:rifaId" element={<ChooseWinner />} />

            <Route path="*" element={<h1>Page not found </h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
