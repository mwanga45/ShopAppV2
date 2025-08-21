import { Outlet } from "react-router-dom"
export default function layout() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
