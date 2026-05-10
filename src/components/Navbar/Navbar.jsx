import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import { FaChartBar, FaClock, FaHome } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className='bg-white shadow-sm'>
            <div className='flex justify-between container mx-auto py-3'>
                <Link to="/">
                    <img src={logo} alt="Keen Keeper" />
                </Link>
                <div className="flex gap-2 md:gap-6">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md font-medium ${isActive
                                ? "bg-green-600 text-white"
                                : "text-gray-600 hover:text-green-600"
                            }`
                        }
                    >
                        <FaHome /> Home
                    </NavLink>

                    <NavLink
                        to="/timeline"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md font-medium ${isActive
                                ? "bg-green-600 text-white"
                                : "text-gray-600 hover:text-green-600"
                            }`
                        }
                    >
                        <FaClock /> Timeline
                    </NavLink>

                    <NavLink
                        to="/stats"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md font-medium ${isActive
                                ? "bg-green-600 text-white"
                                : "text-gray-600 hover:text-green-600"
                            }`
                        }
                    >
                        <FaChartBar /> Stats
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;