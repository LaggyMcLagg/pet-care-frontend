import { useContext, useEffect, useState } from "react";
import { getAllPets, deletePet } from "../services/main/pets";
import PetCard from "./Petcard";
import PetContext from "../logic/PetContext";

function ListPets() {
    const [pets, setPets] = useContext(PetContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function loadPets() {
            const allPets = await getAllPets();
            setPets(allPets);
        }

        loadPets();
    }, []);

    const filteredPets = pets.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <input 
                type="text" 
                placeholder="Search by pet name..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
            />
            {filteredPets.map(pet => <PetCard key={pet.id} pet={pet} showDelete={true} onDelete={() => {
                deletePet(pet.id);
                setPets(prevPets => prevPets.filter(p => p.id !== pet.id));
            }} />)}
        </>
    )
}


export default ListPets;
