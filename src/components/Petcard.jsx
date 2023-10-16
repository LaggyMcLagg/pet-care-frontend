/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";



function PetCard({ pet, onDelete, showDelete = true, showEdit = false }) {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title"><strong>Nome:</strong>{pet.name}</h5>
                <p className="card-text"><strong>Data nascimento:</strong>{pet.dateOfBirth}</p>
                <p className="card-text"><strong>Raça:</strong>{pet.breed}</p>
            </div>
            <div className="card-footer">
                {showDelete && (
                    <button className="btn btn-light" onClick={onDelete}>Delete</button>
                )}
                {showEdit && (
                    <Link to={`/edit/${pet.id}`} className="btn btn-light">Edit</Link>
                )}
                <Link to={`/show/${pet.id}`} className="btn btn-light">Show</Link>
            </div>
        </div>
    );
}

export default PetCard;
