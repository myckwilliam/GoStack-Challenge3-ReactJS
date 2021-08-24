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

    if(repositoryIndex < 0){
      setRepositories(repositories)
    }else {
      setRepositories(repositories.splice(repositoryIndex, 1))
    }

  };





  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          <h1>{repository.title}</h1>
          <h2>{repository.tech}</h2>
          <p>{repository.url}</p>
          <h3>{repository.likes}</h3>
          <button onClick={() => handleRemoveRepository(1)}>
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
