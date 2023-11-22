import { Navbar } from '../components'
import { Outlet } from 'react-router-dom'

const root = () => {
    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-gray-900 via-grey-800 to-gray-700'>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default root