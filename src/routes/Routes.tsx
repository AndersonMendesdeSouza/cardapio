import { Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import Reels from '../pages/reels/Reels'
import Search from '../pages/search/Search'
import Profile from '../pages/profile/Profile'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="reels" element={<Reels />} />
        <Route path="pesquisa" element={<Search />} />
        <Route path="perfil" element={<Profile />} />
      </Route>
    </Routes>
  )
}
