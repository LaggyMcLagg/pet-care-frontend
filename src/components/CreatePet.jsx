import { useState } from "react";
import { createOrUpdatePet } from "../services/main/pets";

function CreatePet() {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        breed: ''
    });
    const [errors, setErrors] = useState({});

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
                alert("Pet created successfully!");
                setFormData({
                    name: '',
                    dateOfBirth: '',
                    breed: ''
                });
            } catch (error) {
                alert("Error creating pet. Please try again later.");
            }
        }
    };

    return (
        <>
            <h1>CREATE PET</h1>
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
                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default CreatePet;
