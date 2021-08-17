import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <AnimalList />
  );
}

function AnimalList() {
  const sectors = ['sektor1', 'sektor2', 'sektor3', 'sektor4']

  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    dateOfBirth: '',
    sector: sectors[0]
  });

  const [animals, setAnimals] = useState([
    {species: 'macka', name: 'Mjau', dateOfBirth: new Date()},
    {species: 'pas', name: 'Miki', dateOfBirth: new Date(2010, 10,2)},
    {species: 'macka', name: 'Lu', dateOfBirth: new Date(2015, 5,5)},
    {species: 'pas', name: 'Brm', dateOfBirth: null},
    {species: 'macka', name: 'Mjau2', dateOfBirth: new Date(2011, 3, 3)}
  ]);



  const handleRemoveAnimal = (index) => {
    setAnimals([...animals.slice(0, index), ...animals.slice(index + 1)])
  }

  const handleMoveToTop = (index) => {
    setAnimals([animals[index], ...animals.slice(0, index), ...animals.slice(index + 1)])
  }

  const handleNameChange = (e) => {
    setNewAnimal({
      ...newAnimal,
      name: e.target.value
    })
  }
  const handleSpeciesChange = (e) => {
    setNewAnimal({
      ...newAnimal,
      species: e.target.value
    })
  }
  const handleDateChange = (e) => {
    setNewAnimal({
      ...newAnimal,
      dateOfBirth:  new Date(e.target.value)
    })
  }

  const handleSectorChange = (e) => {
    setNewAnimal({
      ...newAnimal,
      sector: e.target.value
    })
  }

  const addAnimal = (e) => {
    e.preventDefault();

    setAnimals([...animals, newAnimal])
    setNewAnimal({
      name: '',
      species: '',
      dateOfBirth: '',
      sector: sectors[0]
    });
  }

  const checkAnimalsWithSector = (sector) => {
    const sectorAnimals = animals.filter((animal) => animal.sector === sector)

    alert(JSON.stringify(sectorAnimals))
  }

  return <div>
    {/* FORMA ZA UNOSENJE NOVE ZIVOTINJE */}
    <div>
      <h3>Nova zivotinja</h3>
      <form className="form" onSubmit={addAnimal}>
        <input required type="text" value={newAnimal.name}  placeholder="Ime" onChange={handleNameChange}/>
        <input required type="text" value={newAnimal.species}  placeholder="Vrsta" onChange={handleSpeciesChange}/>
        <input  type="date" value={newAnimal.dateOfBirth ? newAnimal.dateOfBirth.toISOString().substr(0, 10) : ''}  placeholder="Datum rodjenja"  onChange={handleDateChange}/>
        <select name="sector" onChange={handleSectorChange} value={newAnimal.sector}>
        {sectors.map((sector, index) => <option key={index} value={sector}>{sector}</option>)}
        </select>
        <button>Add</button>
      </form>
    </div>

    {/* PRIKAZ SVIH ZIVOTINJA */}
    <h3>Zivotinje</h3>
    <table>
      <thead>
      <tr>
        <th>Vrsta</th>
        <th>Ime</th>
        <th>Datum Rodjenja</th>
        <th>Sektor</th>
      </tr>
      </thead>
        <tbody>
          {animals.map((animal, index) =>
             (<tr key={index}>
              <td>{animal.species}</td>
              <td>{animal.name}</td>
              <td>{animal.dateOfBirth ? animal.dateOfBirth.toLocaleDateString() : 'Nepoznat'}</td>
              <td>{animal.sector ? animal.sector : 'Nepoznat'}</td>
              <td><button onClick={() => handleRemoveAnimal(index)}>Remove</button></td>
              <td><button onClick={() => handleMoveToTop(index)}>Move to top</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    {/* PRIKAZ SVIH SEKTORA */}
    <h3>Sektori</h3>
    <table>
      <thead>
        <tr>
          <th>Sektor</th>
        </tr>
      </thead>
      <tbody>
        {sectors.map((sector, index) =>
         (<tr key={index}>
          <td>{sector}</td>
          <td><button onClick={() => checkAnimalsWithSector(sector)}>Check animals</button></td>
        </tr>
        ))}
      </tbody>
    </table></div>
}

export default App;
