import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { CSSTransition } from "react-transition-group";
import "./LeftSideBar.css"

// Images

import homeIcon from "../../assets/home.png";
import petsIcon from "../../assets/pets.png";
import Visit from "../../assets/visit.png";
import Collapse from "../../assets/collapse.png"
import Right from "../../assets/right.png"

interface Pet {
    id: number;
    name: string;
}

const LeftSidebar = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPetsDropdown, setShowPetsDropdown] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("http://localhost:4000/pets", {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Pet[] = await response.json();

                // Sort pets alphabetically by name ( Displays the names alphabetically in the dropdown ).
                // TODO: Having a 2 or more pets with same name.

                const sortedPets = data.sort((a: Pet, b: Pet) => a.name.localeCompare(b.name));
                setPets(sortedPets);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
    
        if (user?.token) {
            fetchPets();
        }
    }, [user?.token]);

    const togglePetsDropdown = () => {
        setShowPetsDropdown(!showPetsDropdown);
    };

    return (
        <div className="fixed custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-5">
                <h1 className="font-bold mb-10">Dashboard</h1>
                <Link to="/dashboard" className="leftsidebar_link flex">
                    <img src={homeIcon} alt="Home" width={24} height={24} />
                    <p className="text-black ml-2">Home</p>
                </Link>
                <div className="dropdown-container">
                    <div className="leftsidebar_link flex flex-col">
                        <div className="flex items-center">
                            <Link to="/dashboard/all-pets" className="flex items-center">
                                <img src={petsIcon} alt="All Pets" width={24} height={24} />
                                <p className="text-black ml-2 my-auto">All Pets</p>
                            </Link>
                            <img
                                src={showPetsDropdown ? Collapse : Right}
                                onClick={togglePetsDropdown}
                                alt="Dropdown"
                                width={10}
                                height={10}
                                className="ml-10 cursor-pointer mt-[3px]"
                            />
                        </div>
                        <CSSTransition
                            in={showPetsDropdown}
                            timeout={300}
                            classNames="dropdown"
                            unmountOnExit
                        >
                            <div className="dropdown-content">
                                <div className="dropdown-line"></div>
                                {pets.map(pet => (
                                    <Link
                                        key={pet.id}
                                        to={`/dashboard/pet/${pet.id}`}
                                        className="block text-sm text-gray-700 hover:text-gray-400 pl-10 py-1"
                                    >
                                        {pet.name}
                                    </Link>
                                ))}
                            </div>
                        </CSSTransition>
                    </div>
                </div>
                <Link to="/dashboard/visit" className="flex items-center">
                    <img src={Visit} alt="All Pets" width={24} height={24} />
                    <p className="text-black ml-2 my-auto">Visits</p>
                </Link>
            </div>
        </div>
    );
};

export default LeftSidebar;
