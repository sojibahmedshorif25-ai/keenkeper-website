import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart3, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold">KeenKeeper</h1>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium">
          <NavLink 
            to="/" 
            className={({isActive}) => `flex items-center gap-2 ${isActive ? 'text-accent' : 'hover:text-accent'}`}
          >
            <Home size={20} /> Home
          </NavLink>
          
          <NavLink 
            to="/timeline" 
            className={({isActive}) => `flex items-center gap-2 ${isActive ? 'text-accent' : 'hover:text-accent'}`}
          >
            <Clock size={20} /> Timeline
          </NavLink>
          
          <NavLink 
            to="/stats" 
            className={({isActive}) => `flex items-center gap-2 ${isActive ? 'text-accent' : 'hover:text-accent'}`}
          >
            <BarChart3 size={20} /> Stats
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;