import { Route, Routes } from 'react-router-dom'

import { HomePage } from "../pages/HomePage.jsx"
import { EarthquakeDetail } from "../components/earthquakes/EarthquakeDetail.jsx"

export const HomeRoutes = () => (
  <Routes>
    <Route path="" element={<HomePage  />} />
    <Route path="feature/:id" element={<EarthquakeDetail />} />
  </Routes>
)