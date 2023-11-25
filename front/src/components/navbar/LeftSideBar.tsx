import React from 'react';
import { Link } from 'react-router-dom';

const sidebarLinks = [
    { label: 'Home', route: '/dashboard' },
    { label: 'All Pets', route: '/all-pets' },
];

const LeftSidebar = () => {
    return (
        <div className='fixed custom-scrollbar leftsidebar bg-grey-500'>
            <div className='py-16 flex w-full flex-1 flex-col gap-6 px-5'>
                <h1 className='font-bold'>Dashboard</h1>
                {sidebarLinks.map((link) => (
                    <Link
                        to={link.route}
                        key={link.label}
                        className='leftsidebar_link'
                    >
                        <p className='text-black'>{link.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LeftSidebar;
