import { Link, Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <header className="p-4 bg-gray-800 flex justify-between">
        <h1 className="font-bold text-xl">iRepair</h1>

        <nav className="flex gap-4">
          <Link to="/">Dashboard</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/service-orders">Service Orders</Link>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
};