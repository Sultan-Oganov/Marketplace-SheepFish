import logo from '../../assets/icons/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { Search } from '../Search/index';

export const Header = () => {
  let { pathname } = useLocation();

  const showSearch = useMemo(() => pathname === '/', [pathname]);

  return (
    <header className="p-5 sticky top-0 bg-slate-900 rounded-b-xl text-white z-10">
      <nav className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-5'}>
          <NavLink to="/">
            <img className={'w-9 h-9 rounded-full'} src={logo} alt="Logo" title="Home" />
          </NavLink>
          <NavLink to="/">Products</NavLink>
          <NavLink to="/product">Create product</NavLink>
        </div>
        {showSearch && <Search />}
      </nav>
    </header>
  );
};
