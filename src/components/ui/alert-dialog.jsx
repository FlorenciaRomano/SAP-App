import { Outlet } from "react-router-dom"
import Header from "./Header"

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout