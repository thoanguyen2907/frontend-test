import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/"> Home page </Link>
        </nav>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  )
}
