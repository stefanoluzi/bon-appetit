import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../utils/routes'
import { AuthContext } from '../Context';

export const Navbar = () => {
  const { authState: { logged }, logout } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const handleLogout = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmed) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-left">
        <img className='navbar-logo' src="/Images/Logo-generico.jpg" alt="Logo Marca" />
        <h2 className="navbar-heading">BonAppetit</h2>
      </Link>

      <ul className='nav-list'>
        <Link to="/"><li className='nav-item'>Inicio</li></Link>
        <li className='nav-item'>Contacto</li>
        <li className='nav-item'>Sobre Nosotros</li>
        <li className='nav-item'><Link to={routes.adminPanel}>Panel de administrador</Link></li>
      </ul>

      <div className="navbar-right">
        {logged ? (
          <div className="avatar-container">
            <div className="avatar">
              {/* {getInitial(user.name)} */}
            </div>
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <>
            <Link to={routes.register}><button className="navbar-button">Crear Cuenta</button></Link>
            <Link to={routes.login}><button className="navbar-button">Iniciar sesión</button></Link>
          </>
        )}
      </div>

      <div className='menu-hamburguesa'>
        <button onClick={() => setToggle(!toggle)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
        </button>
      </div>

      {toggle && (
        <ul className='mobile-nav-list'>
          <li className='nav-item mobile-item'><Link to="/">Inicio</Link></li>
          <li className='nav-item mobile-item'>Contacto</li>
          <li className='nav-item mobile-item'>Sobre Nosotros</li>
          <li className='nav-item mobile-item'><Link to={routes.adminPanel}>Panel de administrador</Link></li>
        </ul>
      )}
    </nav>
  );
};