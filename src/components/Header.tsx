import { NavLink } from 'react-router';

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex gap-6 p-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `transition-colors hover:text-yellow-400 ${
              isActive ? 'text-yellow-400 font-semibold' : 'text-gray-300'
            }`
          }
        >
          Garage
        </NavLink>
        <NavLink
          to="/winners"
          className={({ isActive }) =>
            `transition-colors hover:text-yellow-400 ${
              isActive ? 'text-yellow-400 font-semibold' : 'text-gray-300'
            }`
          }
        >
          Winners
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
