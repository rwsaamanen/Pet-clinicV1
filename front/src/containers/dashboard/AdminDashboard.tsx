import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/dashboard/visit");
    };

    return (
        <>
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center align-middle">
                    <div className="bg-gradient-to-br from-sky-50 via-white/50 to-sky-100/50 p-4 rounded-lg shadow-md h-16 border hover:bg-gray-300/50"
                    onClick={() => handleNavigate()}>
                        <h2 className="text-xl font-medium text-black cursor-pointer">Upcoming Appointments</h2>
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 via-white/50 to-sky-100/50 p-4 rounded-lg shadow-md h-16 border hover:bg-gray-300/50">
                        <h2 className="text-xl font-medium text-black cursor-pointer">Recent pet registrations</h2>
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 via-white/50 to-sky-100/50 p-4 rounded-lg shadow-md h-16 border hover:bg-gray-300/50">
                        <h2 className="text-xl font-medium text-black cursor-pointer">Quick actions</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
