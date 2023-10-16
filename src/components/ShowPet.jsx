import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById } from "../services/main/pets";
import PetCard from "./Petcard";

function ShowPet() {
    const { id } = useParams();  // extract id from URL
    const [pet, setPet] = useState(null);

    useEffect(() => {
        async function fetchPet() {
            const fetchedPet = await getPetById(id);
            setPet(fetchedPet);
        }

        fetchPet();
    }, [id]);

    return (
        <>
            {pet && <PetCard pet={pet} showDelete={false} showEdit={true} />}
        </>
    )
}

export default ShowPet;
