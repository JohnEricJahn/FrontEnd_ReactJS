import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Novo Repositorio ${Date.now()}`,
      "url": "github.com",
      "techs": ["NodeJS", "Java"]
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {

    const indexRepositorie = repositories.indexOf(repositorie => repositorie.id === id);

    const newRepositories = [...repositories];

    newRepositories.splice(indexRepositorie, 1);

    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('repositories').then(res => setRepositories(res.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
