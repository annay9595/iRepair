import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { DashboardPage } from "./pages/DashboardPage";
import { ServiceOrdersPage } from "./pages/ServiceOrdersPage";
import { ClientsPage } from "./pages/ClientsPage";
import { Layout } from "./componentes/Layout"
function App() {

  return (
    <div className='bg-gray-900 flex flex-col justify-center min-h-screen '>
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<DashboardPage />} />

          <Route path="/clients" element={<ClientsPage />} />

          <Route path="/service-orders" element={<ServiceOrdersPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
    </div>

  )
}

export default App
