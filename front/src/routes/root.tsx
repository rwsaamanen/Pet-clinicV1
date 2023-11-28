import { Navbar, Footer } from '../components'
import { Outlet } from 'react-router-dom'

const root = () => {
    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-white/50 to-cyan-100'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default root