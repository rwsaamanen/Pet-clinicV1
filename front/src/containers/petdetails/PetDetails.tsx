import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Return from "../../assets/return.png"

interface Pet {
    id: number;
    name: string;
    petType: string;
    status: string;
    dob: string;
}

interface Visit {
    id: number;
    petId: number;
    petName?: string;
    petType?: string;
    date: string;
    dob: string;
    lastVisit?: string;
}

interface SortConfig {
    key: keyof Visit | null;
    direction: "ascending" | "descending";
}


const PetDetails = () => {
    const { petId } = useParams<{ petId: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: "ascending" });
    const { user } = useUser();
    const navigate = useNavigate();

    // Return Arrow style.

    const [isHovered, setIsHovered] = useState(false);

    const style = {
        transition: "transform 0.3s ease",
        transform: isHovered ? "translateX(-5px)" : "translateX(0px)"
    };

    // KESKEN

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!user) {
                    throw new Error("User is not logged in");
                }

                const requestOptions = {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                };

                // Fetch pet details.

                const petResponse = await fetch(`http://localhost:4000/pets/${petId}`, requestOptions);
                if (!petResponse.ok) {
                    throw new Error(`HTTP error! status: ${petResponse.status}`);
                }
                const petData = await petResponse.json();
                setPet(petData);

                // Fetch all visits.

                const visitsResponse = await fetch(`http://localhost:4000/visits`, requestOptions);
                if (!visitsResponse.ok) {
                    throw new Error(`HTTP error! status: ${visitsResponse.status}`);
                }
                const allVisits: Visit[] = await visitsResponse.json();

                // Ensure petId is defined and is a number.

                const petIdNumber = petId ? parseInt(petId, 10) : 0;
                if (isNaN(petIdNumber)) {
                    throw new Error("Invalid pet ID");
                }

                // Filter visits for the current pet.

                const filteredVisits = allVisits.filter((visit: Visit) => visit.petId === petIdNumber);
                setVisits(filteredVisits);

            } catch (error) {
                console.error("Error fetching pet details:", error);
            }
        };

        fetchDetails();
    }, [petId, user]);

    const sortedVisits = useMemo(() => {
        let sortableItems = [...visits];
        const sortKey = sortConfig.key;

        if (sortKey) {
            sortableItems.sort((a, b) => {

                // Provide a fallback value (e.g., an empty string) if the property is undefined

                const aValue = a[sortKey] || "";
                const bValue = b[sortKey] || "";

                if (aValue < bValue) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }

        return sortableItems;
    }, [visits, sortConfig]);

    const currentDate = new Date();
    const upcomingVisits = sortedVisits.filter(visit => new Date(visit.date) > currentDate);
    const pastVisits = sortedVisits.filter(visit => new Date(visit.date) <= currentDate);
    const todaysVisits = sortedVisits.filter(visit => {
        const visitDate = new Date(visit.date);
        return visitDate.getDate() === currentDate.getDate() &&
            visitDate.getMonth() === currentDate.getMonth() &&
            visitDate.getFullYear() === currentDate.getFullYear();
    });

    const handleBackClick = () => {
        navigate(-1);
    };

    const capitalize = (str: string | undefined) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "";
    };

    return (
        <>
            <img
                src={Return}
                alt="Return"
                onClick={handleBackClick}
                width={30}
                height={30}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={style}
            />
            <div className="px-5 mx-auto max-w-screen-xl w-full py-8">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">{pet?.name}</h1>
                    <div>
                        <button className="rounded-sm border bg-opacity-30 border-gray-400 bg-white/50 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white mr-2">
                            Edit Pet Details
                        </button>
                        <button className="rounded-sm border bg-opacity-30 border-gray-400 bg-white/50 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white mr-2">
                            Add Visit
                        </button>
                    </div>
                </div>
                <div className="border bg-white/50 rounded-sm p-4 shadow-xl mt-5">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h1 className="font-bold underline mb-3">Details</h1>
                            <div className="mb-1">
                                <strong>Type</strong>
                                <div>{capitalize(pet?.petType)}</div>
                            </div>
                            <div className="mb-1">
                                <strong>Status</strong>
                                <div>{capitalize(pet?.status)}</div>
                            </div>
                            <div className="mb-1">
                                <strong>Owner ID</strong>
                                <div>{pet?.id}</div>
                            </div>
                            <div className="mb-1">
                                <strong>Date of Birth</strong>
                                <div>{pet?.dob}</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold underline mb-3">Upcoming visits</h2>
                            {todaysVisits.length > 0 ? (
                                todaysVisits.map(visit => (
                                    <div key={visit.id}>
                                        <p className="mb-1">Today</p>
                                    </div>
                                ))
                            ) : upcomingVisits.length > 0 ? (
                                upcomingVisits.map(visit => (
                                    <div key={visit.id}>
                                        <p className="mb-1">{visit.date}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No visits scheduled</p>
                            )}
                            <h2 className="font-bold underline mt-3 mb-3">Past visits</h2>
                            {pastVisits.map(visit => (
                                <div key={visit.id}>
                                    <p className="mb-1">{visit.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center py-10">
                    <h1 className="font-bold text-2xl">Remarks</h1>
                    <div>
                        <button className="rounded-sm border bg-opacity-30 border-gray-400 bg-white/50 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white">
                            Create Remarks
                        </button>
                    </div>
                </div>
            </div >

        </>
    );
};

export default PetDetails;
