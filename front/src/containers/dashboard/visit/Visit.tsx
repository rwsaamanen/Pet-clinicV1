import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "../../../contexts/UserContext";
import UpcomingVisits from "./UpcomingVisits";
import PastVisitsList from "./PastVisits";
import TodaysVisits from "./TodaysVisits";

interface Visit {
    id: number;
    petId: number;
    petName?: string;
    petType?: string;
    date: string;
    dob: string;
    lastVisit?: string;
}

interface Pet {
    id: number;
    name: string;
    petType: string;
    dob: string;
    lastVisit?: string;
}

interface SortConfig {
    key: keyof Visit | null;
    direction: "ascending" | "descending";
}

const Visit = () => {
    const [visits, setVisits] = useState<Visit[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: "ascending" });
    const { user } = useUser();

    useEffect(() => {
        const fetchPetsAndVisits = async () => {
            if (!user) {
                console.error("User is not logged in");
                return;
            }

            try {

                // Fetch pets.

                const petResponse = await fetch("http://localhost:4000/pets", {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                });
                if (!petResponse.ok) {
                    throw new Error(`HTTP error! status: ${petResponse.status}`);
                }
                const pets: Pet[] = await petResponse.json();

                // Fetch visits.

                const visitResponse = await fetch("http://localhost:4000/visits", {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                });
                if (!visitResponse.ok) {
                    throw new Error(`HTTP error! status: ${visitResponse.status}`);
                }
                let visits: Visit[] = await visitResponse.json();

                // Map pet names and types to visits.

                visits = visits.map(visit => {
                    const pet = pets.find(p => p.id === visit.petId);
                    return {
                        ...visit,
                        petId: pet ? pet.id : 0,
                        petName: pet ? pet.name : "Unknown",
                        petType: pet ? pet.petType : "Unknown",
                        dob: pet ? pet.dob : "Unknown",
                        lastVisit: pet ? pet.lastVisit : "N/A"
                    };
                });
                console.log("Mapped Visits:", visits);

                setVisits(visits);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPetsAndVisits();
    }, [user]);

    const requestSort = (key: keyof Visit) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const sortedVisits = useMemo(() => {
        let sortableItems = [...visits];
        const sortKey = sortConfig.key;

        if (sortKey) {
            sortableItems.sort((a, b) => {

                // Provide a fallback value (e.g., an empty string) if the property is undefined.

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

    return (
        <>
            <div className="flex-grow">
                <div className="w-full md:w-auto lg:w-auto">
                    <TodaysVisits sortedVisits={todaysVisits} requestSort={requestSort} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 mt-10">
                        <UpcomingVisits sortedVisits={upcomingVisits} requestSort={requestSort} />
                        <PastVisitsList sortedVisits={pastVisits} requestSort={requestSort} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Visit;
