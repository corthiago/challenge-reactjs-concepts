import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', 
      {
        title: `New Repository ${Date.now()}`,
        owner: "Thiago"
      }
    );
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204) {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ));
    }
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}   
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
