import { Link, useNavigate } from "react-router-dom"
import { Links } from "../../constants"
import Logo from "../../assets/icons8-plaster-64.png"
import { useUser } from "../../contexts/UserContext";

const Navbar = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <div className="fixed top-0 w-full flex justify-center border-b border-gray-300 bg-cyan-50 backdrop-blur-sm z-30 transition-all bg-opacity-10">
                <div className="mx-5 flex items-center h-12 max-w-screen-xl w-full justify-between">
                    <div className="flex items-center max-lg:hidden">
                        <Link to="/">
                            <img
                                src={Logo}
                                alt="logo"
                                width={27}
                                height={27}
                                className="inline-block cursor-pointer mr-4"
                            />
                        </Link>
                        <ul className="hidden ml-10 lg:flex h-full gap-10 items-center max-lg:hidden">
                            {Links.map((link) => (
                                <li key={link.key}>
                                    <Link to={link.href} className="regular-14 text-black cursor-pointer pb-1.5 transition all hover:text-gray-400">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center items-center gap-10">
                        {user ? (
                            <>
                                <Link to={"/dashboard"}>
                                    <p className="text-black hover:text-gray-400">Dashboard</p>
                                </Link>
                                <button 
                                onClick={handleLogout}
                                className="rounded-md border bg-opacity-30 border-gray-400 bg-white/50 p-1 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link to={"/login"}>
                                <button className="rounded-md border bg-opacity-30 border-gray-400 bg-white/50 p-1 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white">
                                    Log In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
