import React from 'react'
import { Link } from 'react-router-dom'
import { Links } from '../../constants'
import Logo from '../../assets/icons8-plaster-64.png'
import { Login } from '../../containers'

const Navbar = () => {
    return (
        <>
            <div className='fixed top-0 w-full flex justify-center border-b border-gray-700 bg-gray-900 backdrop-blur-xl z-30 transition-all bg-opacity-30'>
                <div className='mx-5 flex items-center h-12 max-w-screen-xl w-full justify-between'>
                    <div className='flex items-center'>
                        <a href='/'>
                            <img
                                src={Logo}
                                alt='logo'
                                width={27}
                                height={27}
                                className='inline-block cursor-pointer mr-4'
                            />
                        </a>
                        <ul className='hidden ml-10 lg:flex h-full gap-10 items-center'>
                            {Links.map((link) => (
                                <li key={link.key}>
                                    <Link to={link.href} className='regular-14 text-gray-400 cursor-pointer pb-1.5 transition all hover:text-white'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to={'/login'}>
                        <button className='rounded-md border bg-opacity-30 border-gray-700 bg-gray-900 p-1 px-2 text-sm text-white transition-all hover:bg-gray-900 hover:text-white'>
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar