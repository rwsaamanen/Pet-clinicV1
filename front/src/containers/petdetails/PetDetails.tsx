import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface Pet {
    id: number;
    name: string;
    petType: string;
    status: string;
    // Lisää muut property
}

interface Owner {
    id: number;
    name: string;
    // Lisää muut omistaja
}

interface Visit {
    id: number;
    dateTime: string;
    durationMins: number;
    comment: string;
    // Lisää muut visitit
}

const PetDetails = () => {
    const { petId } = useParams<{ petId: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [owner, setOwner] = useState<Owner | null>(null);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [doctorComment, setDoctorComment] = useState('');
    const [newVisit, setNewVisit] = useState({ dateTime: '', durationMins: '', comment: '' });

    const { user } = useUser();

    // KESKEN

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!user) {
                    throw new Error("User is not logged in");
                }

                const requestOptions = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                };

                const petResponse = await fetch(`http://localhost:4000/pets/${petId}`, requestOptions);
                const petData = await petResponse.json();
                setPet(petData);

                const ownerResponse = await fetch(`http://localhost:4000/owners/${petData.ownerId}`, requestOptions);
                const ownerData = await ownerResponse.json();
                setOwner(ownerData);

                const visitsResponse = await fetch(`http://localhost:4000/visits/pet/${petId}`, requestOptions);
                const visitsData = await visitsResponse.json();
                setVisits(visitsData);

                // Kesken ----------

                // Fetch doctor's comment if available
                // setDoctorComment(...);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchDetails();
    }, [petId, user]);

    const handleAddVisit = async () => {
        try {
            if (!user) {
                throw new Error("User is not logged in");
            }

            const response = await fetch('http://localhost:4000/visits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`, 
                },
                body: JSON.stringify({
                    petId: petId,
                    ...newVisit
                }),
            });

            if (!response.ok) {
                throw new Error('Error adding visit');
            }

            // Refresh the visits list

            const updatedVisits = await response.json();
            setVisits(updatedVisits);
        } catch (error) {
            console.error('Error adding visit:', error);
        }
    };

    return (
        <div className='pt-[4rem]'>
    <div className='px-5 mx-auto max-w-screen-xl w-full py-8'>
        <div className="border border-gray-300 rounded-lg p-4">
            <h1>Pet Details: {pet?.name}</h1>
            <p>Type: {pet?.petType}</p>
            <p>Status: {pet?.status}</p>
            <p>Owner Name: {owner?.name}</p>
            <h2>Visits</h2>
            {visits.map(visit => (
                <div key={visit.id}>
                    <p>Date: {visit.dateTime}</p>
                    <p>Duration: {visit.durationMins} minutes</p>
                    <p>Comment: {visit.comment}</p>
                </div>
            ))}
            <h2>Doctor's Comment</h2>
            <p>{doctorComment}</p>
            <h2>Add Visit</h2>
            <input
                type="datetime-local"
                value={newVisit.dateTime}
                onChange={(e) => setNewVisit({ ...newVisit, dateTime: e.target.value })}
            />
            <input
                type="number"
                placeholder="Duration in minutes"
                value={newVisit.durationMins}
                onChange={(e) => setNewVisit({ ...newVisit, durationMins: e.target.value })}
            />
            <textarea
                placeholder="Comment"
                value={newVisit.comment}
                onChange={(e) => setNewVisit({ ...newVisit, comment: e.target.value })}
            />
            <button onClick={handleAddVisit}>Add Visit</button>
        </div>
    </div>
</div>

    );
};

export default PetDetails;
