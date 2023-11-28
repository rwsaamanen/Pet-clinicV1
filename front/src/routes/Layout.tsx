import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import LeftSidebar from '../components/navbar/LeftSideBar'
import BottomBar from '../components/navbar/Bottombar'

const Layout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { user } = useUser();

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className='flex-grow'>
                    <div className='pt-[4rem]'>
                        <div className='flex px-5 mx-auto max-w-screen-xl w-full py-8'>
                            {!isMobile && user && (
                                <section className='w-52'>
                                    <LeftSidebar />
                                </section>
                            )}
                            <div className='flex-grow'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
                {isMobile && <BottomBar />}
            </div>
        </>
    );
};


export default Layout