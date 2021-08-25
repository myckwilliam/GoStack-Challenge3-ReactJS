import React, { useState, useEffect  } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: Date.now(),
      techs: ['React', 'Node.js', 'React Native'],
      url: 'google.com'
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const repositoryClone = [...repositories]
    repositoryClone.splice(repositoryIndex, 1)
    
    setRepositories(repositoryClone)
    
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          <h1>{repository.title}</h1>
          <button onClick={() => handleRemoveRepository(repository.id)}>
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
