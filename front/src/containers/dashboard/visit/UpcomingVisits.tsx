import React, { useState } from "react";
import SortingArrow from "../../../assets/sortingArrow.png"
import { useNavigate } from "react-router-dom";

interface Visit {
    id: number;
    petId: number;
    petName?: string;
    petType?: string;
    date: string;
    dob: string;
    lastVisit?: string;
}

interface UpcomingVisitsProps {
    sortedVisits: Visit[];
    requestSort: (key: keyof Visit) => void;
}

const UpcomingVisits: React.FC<UpcomingVisitsProps> = ({ sortedVisits, requestSort }) => {
    const [selectedPet, setSelectedPet] = useState<number | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    };

    const capitalize = (str: string | undefined) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "";
    };

    const navigate = useNavigate();

    const handlePetClick = (petId: number) => {
        setSelectedPet(selectedPet === petId ? null : petId);
    };

    const handlePetNavigate = (petId: number) => {
        navigate(`/dashboard/pet/${petId}`);
    };

    return (
        <>
            <div className="max-w-full w-full">
                <h1 className="font-bold text-2xl mt-0 py-0 mb-5">Upcoming Visits</h1>
                <div className="border bg-gradient-to-br border-gray-300 from-sky-100/50 via-white/50 to-sky-100/50 shadow-md rounded-lg p-4">
                    <table id="content" className="w-full border-collapse text-left">
                        <thead className="sticky top-0 z-10 px-6 py-5 border-b border-slate-300/10 last:border-none">
                            <tr>
                                <th className="py-4 pr-8 text-sm font-semibold text-black items-center">
                                    <span className="flex items-center">
                                        Name
                                        <img
                                            src={SortingArrow}
                                            alt="SortingArrow"
                                            onClick={() => requestSort("petName")}
                                            width={12}
                                            height={12}
                                            className="ml-2 cursor-pointer flex-shrink-0"
                                        />
                                    </span>
                                </th>
                                <th className="py-4 pr-8 text-sm font-semibold text-black items-center">
                                    <span className="flex items-center">
                                        Date
                                        <img
                                            src={SortingArrow}
                                            alt="SortingArrow"
                                            onClick={() => requestSort("date")}
                                            width={12}
                                            height={12}
                                            className="ml-2 cursor-pointer flex-shrink-0"
                                        />
                                    </span>
                                </th>
                                <th className="py-4 pr-8 text-sm font-semibold text-black lg:table-cell items-center">
                                    <span className="flex items-center">
                                        Type
                                        <img
                                            src={SortingArrow}
                                            alt="SortingArrow"
                                            onClick={() => requestSort("petType")}
                                            width={12}
                                            height={12}
                                            className="ml-2 cursor-pointer flex-shrink-0"
                                        />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedVisits.map((visit: Visit) => (
                                <React.Fragment key={visit.id}>
                                    <tr
                                        key={visit.id}
                                        className="border-b border-slate-300/10 last:border-none cursor-pointer"
                                        onClick={() => handlePetClick(visit.id)}
                                    >
                                        <td className="py-4 pr-4 align-top text-sm text-black">
                                            <div className="translate-y-px">{capitalize(visit.petName)}</div>
                                        </td>
                                        <td className="py-4 pr-4 align-top leading-snug text-black">
                                            <div>
                                                <div className="sm:block">{formatDate(visit.date)}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 align-top text-sm lg:table-cell">
                                            <div className="translate-y-px whitespace-nowrap">
                                                {capitalize(visit.petType)}
                                            </div>
                                        </td>
                                    </tr>
                                    {selectedPet === visit.id && (
                                        <tr className="border-b border-slate-300/10 last:border-none">
                                            <td colSpan={3}>
                                                <div className="px-4 py-2 flex justify-between items-center">
                                                    <div>
                                                        <div className="mb-2">
                                                            <strong>Date of Birth</strong>
                                                            <div>{visit.dob}</div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <strong>Last Visit:</strong>
                                                            <div>{visit.lastVisit || "No record"}</div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="rounded-md border bg-opacity-30 border-gray-400 bg-white/50 p-1 px-2 text-sm text-black transition-all hover:bg-gray-400 hover:text-white"
                                                        onClick={() => handlePetNavigate(visit.petId)}>
                                                        View full details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UpcomingVisits;
