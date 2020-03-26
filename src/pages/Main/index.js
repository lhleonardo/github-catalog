import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../service/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

function Main() {
  // state
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, msg: '' });

  // carrega do localStorage...
  useEffect(() => {
    const repos = localStorage.getItem('repositories');

    if (repos) {
      setRepositories(JSON.parse(repos));
    }
  }, []);

  // salva no localStorage...
  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function onSubmitForm(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      if (repositories.find((repository) => repository.name === data.name)) {
        throw new Error('Duplicate entry of repository');
      }

      setRepositories([...repositories, data]);
    } catch (err) {
      setError({ status: true, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={onSubmitForm} error={error.status}>
        <input
          value={newRepo}
          onChange={(e) => {
            if (error) setError(false);
            setNewRepo(e.target.value);
          }}
          type="text"
          placeholder="Adicionar repositório"
        />
        <SubmitButton disabled={false} loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repo) => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
