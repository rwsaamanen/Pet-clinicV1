import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from '../../components/navbar/LeftSideBar';

interface Pet {
    id: number;
    ownerId: number;
    name: string;
    petType: string;
    status: string;
    dob: string;
    lastVisit?: string;
}

const AdminDashboard = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [showAliveOnly, setShowAliveOnly] = useState(false);
    const [selectedPet, setSelectedPet] = useState<number | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('http://localhost:4000/pets', {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPets(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        if (user?.token) {
            fetchPets();
        }
    }, [user?.token]);

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handlePetClick = (petId: number) => {
        setSelectedPet(selectedPet === petId ? null : petId);
    };

    const filteredPets = showAliveOnly ? pets.filter(pet => pet.status === 'alive') : pets;

    const navigate = useNavigate();

    const handlePetNavigate = (petId: number) => {
        navigate(`/dashboard/pet/${petId}`);
    };

    return (
        <>
            <div className='pt-[4rem]'>
                <div className='flex px-5 mx-auto max-w-screen-xl w-full py-8'>
                    <section className='w-52'>
                        <LeftSidebar />
                    </section>
                    <div className='flex-grow'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                        <div className='bg-gradient-to-br from-sky-50 via-white/50 to-sky-100/50 p-4 rounded-lg shadow-md h-16 border hover:bg-gray-300/50'>
                            <h2 className='text-xl font-medium text-black cursor-pointer'>Upcoming Appointments</h2>
                        </div>
                        <div className='bg-gradient-to-br from-sky-50 via-white/50 to-sky-100/50 p-4 rounded-lg shadow-md h-16 border hover:bg-gray-300/50'>
                            <h2 className='text-xl font-medium text-black cursor-pointer'>Recent pet registrations</h2>
                        </div>
                        <div className='bg-gradient-to-br from-sky-50 via-white/50 to-sky-100/50 p-4 rounded-lg shadow-md h-16 border hover:bg-gray-300/50'>
                            <h2 className='text-xl font-medium text-black cursor-pointer'>Quick actions</h2>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h2 className='text-2xl font-semibold mb-4 text-black'>All Pets</h2>
                        <label className='text-black'>
                            <input
                                type="checkbox"
                                checked={showAliveOnly}
                                onChange={(e) => setShowAliveOnly(e.target.checked)}
                                className='mr-4'
                            />
                            Show Alive Pets Only
                        </label>
                        <div className='bg-gradient-to-br from-sky-100/50 via-white/50 to-sky-100/50 rounded-lg shadow-md p-6 mt-4 border'>
                            <ul>
                                {filteredPets.map(pet => (
                                    <React.Fragment key={pet.id}>
                                        <li
                                            className='border-b border-gray-400/50 py-2 flex cursor-pointer'
                                            onClick={() => handlePetClick(pet.id)}
                                        >
                                            <span className='w-1/2 flex justify-start'>{capitalize(pet.name)}</span>
                                            <span className='w-1/2 flex justify-start'>{capitalize(pet.petType)}</span>
                                            <span className={`w-1/4 flex justify-start ${pet.status === 'alive' ? 'text-green-600' : 'text-red-600'}`}>
                                                {capitalize(pet.status)}
                                            </span>
                                        </li>
                                        {selectedPet === pet.id && (
                                            <li className='border-b border-gray-100 py-2 flex justify-between items-center'>
                                                <div className='pl-4'>
                                                    <p><strong>Date of Birth:</strong> {pet.dob}</p>
                                                    <p><strong>Last Visit:</strong> {pet.lastVisit || 'No record'}</p>
                                                </div>
                                                <button
                                                    className='rounded-md border bg-opacity-30 border-gray-400 bg-white/50 p-1 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white mr-4'
                                                    onClick={() => handlePetNavigate(pet.id)}>
                                                    View full details
                                                </button>
                                            </li>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
