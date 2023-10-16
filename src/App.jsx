import { useEffect, useState, } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { createOrUpdatePet } from "./services/main/pets";

import PetContext from "./logic/PetContext";
import CreatePet from "./components/CreatePet";
import ListPets from "./components/ListPets";
import ShowPet from "./components/ShowPet";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  //testes de funcionalidade
  useEffect(() => {
    //Permitir cancelar um pedido ao servidor
    const abortController = new AbortController();

    async function test() {
      const data = {
        name: "Bobby",
        dateOfBirth: "2019-01-01",
        breed: "Bulldog",
      }

      const petCreated = await createOrUpdatePet(data)
      
      console.log(petCreated)
      
      const data2 = {
        name: "Fisher",
        dateOfBirth: "2019-01-01",
        breed: "french",
      }

      const petCreated2 = await createOrUpdatePet(data2)
      
      console.log(petCreated2)
      
      const data3 = {
        name: "Salty",
        dateOfBirth: "2019-01-01",
        breed: "Irsh",
      }

      const petCreated3 = await createOrUpdatePet(data3)
      
      console.log(petCreated3)
      
      // const allPets = await getAllPets()

      // console.log(allPets)

      // petCreated.name = "Fisher"
      // const petUpdated = await createOrUpdatePet(petCreated)

      // console.log(petUpdated)

      // const pet = await getPetById(petUpdated.id)

      // console.log(pet)

      // await deletePet(petUpdated.id)

      // const allPetsAfterDelete = await getAllPets()

      // console.log(allPetsAfterDelete)

    }

    test()

    return () => {
      //Cancelar o pedido caso o componente seja desmontado
      abortController.abort();
    };
  }, [])

    // Pets
    const [pets, setPets] = useState([]);

    // State for the theme
    const [theme, setTheme] = useState('light');

    // Toggle theme
    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
        document.body.classList.add('dark-theme');
      } else {
        setTheme('light');
        document.body.classList.remove('dark-theme');
      }
    };

  return (
    <>
      {/* Provide global state using context */}
      <PetContext.Provider value={[pets, setPets]}>

        {/* Set up the router */}
        <Router>

          {/* Navbar component */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">          
            <div className="container">
              {/* Brand label for the application */}
              <label className="navbar-brand"> Teste Pets</label>
              
              {/* Navigation links */}
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/">Pet List</Link>
                <Link className="nav-item nav-link" to="/create">Create</Link>
              </div>
              {/* Theme button */}
              <button className="btn" onClick={toggleTheme}>
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </button>
            </div>
          </nav>

          {/* Main content container */}
          <div className="container mt-4">
            {/* Define routes for the application */}
            <Routes>
              <Route path="/" element={<ListPets />} />
              <Route path="/create" element={<CreatePet />} />
              <Route path="/show/:id" element={<ShowPet />} />
            </Routes>
          </div>
        </Router>
      </PetContext.Provider>
    </>
  )
}

export default App
