import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createOrUpdatePet, getPetById } from "../services/main/pets";

function EditPet() {
    const { id } = useParams(); // extract pet id from the route

    const [formData, setFormData] = useState({
        id: null, // include id in formData to update the correct pet
        name: '',
        dateOfBirth: '',
        breed: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchPetDetails() {
            try {
                const petDetails = await getPetById(id);
                setFormData(petDetails);
            } catch (error) {
                alert("Error fetching pet details. Please try again later.");
            }
        }

        fetchPetDetails();
    }, [id]);

    const validate = () => {
        const tempErrors = {};

        if (!formData.name) {
            tempErrors.name = "Name is required!";
        }
        if (!formData.dateOfBirth) {
            tempErrors.dateOfBirth = "Date of Birth is required!";
        }
        if (!formData.breed) {
            tempErrors.breed = "Breed is required!";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;  // returns true if no errors
    };

    const updateField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                await createOrUpdatePet(formData);
                alert("Pet updated successfully!");
            } catch (error) {
                alert("Error updating pet. Please try again later.");
            }
        }
    };

    return (
        <>
            <h1>EDIT PET</h1>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>Name:</label>
                    <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" value={formData.dateOfBirth} onChange={e => updateField('dateOfBirth', e.target.value)} />
                    {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
                </div>
                <div>
                    <label>Breed:</label>
                    <input type="text" value={formData.breed} onChange={e => updateField('breed', e.target.value)} />
                    {errors.breed && <p className="error">{errors.breed}</p>}
                </div>
                <button type="submit">Edit</button>
            </form>
        </>
    );
}

export default EditPet;
