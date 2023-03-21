/* SECCIÓN DE IMPORT */
import { useEffect, useState } from "react";
import CallToApi from "../services/api";
import Filters from "./Filters/Filters";
import "../styles/App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [characterList, setCharacterList] = useState([]);
  const [searchByCharacter, setSearchByCharacter] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("Gryffindor");

  /* EFECTOS (código cuando carga la página) */
  useEffect(() => {
    CallToApi(selectedHouse).then((selectedData) => {
      setCharacterList(selectedData);
      console.log(characterList);
    });
  }, [selectedHouse]);

  /* FUNCIONES HANDLER */

  const handleSearchByCharacter = (value) => {
    setSearchByCharacter(value);
  };

  const handleSelectedHouse = (value) => {
    setSelectedHouse(value);
  };

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */

  const filteredCharacters = characterList
    .filter((eachCharacter) => {
      return eachCharacter.name
        .toLocaleLowerCase()
        .includes(searchByCharacter.toLowerCase());
    })
    .filter((eachCharacter) => {
      return eachCharacter.house === selectedHouse;
    });

  /* HTML */
  return (
    <div className="App">
      {
        <>
          <header className="header">
            <h1>Harry Potter</h1>
          </header>
          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <Filters
                    searchByCharacter={searchByCharacter}
                    handleSearchByCharacter={handleSearchByCharacter}
                    handleSelectedHouse={handleSelectedHouse}
                  ></Filters>
                }
              ></Route>
            </Routes>
          </main>
          <footer className="footer"></footer>
        </>
      }
    </div>
  );
}

/* PROP-TYPES */

export default App;
