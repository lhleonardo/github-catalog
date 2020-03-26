import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import api from '../../service/api';
import { Loading, Owner, IssueList, Issue, Label, LabelList } from './styles';

import Container from '../../components/Container';

function Repository({ match: { params } }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const repoName = decodeURIComponent(params.repoName);

  useEffect(() => {
    async function loadInfo() {
      setLoading(true);
      // base_api/repoName/issues
      const [repoInfo, repoIssues] = await Promise.all([
        await api.get(`/repos/${repoName}`),
        await api.get(`/repos/${repoName}/issues`, {
          params: { state: 'open', per_page: 10 },
        }),
      ]);

      setRepository(repoInfo.data);
      setIssues(repoIssues.data);
      setLoading(false);
    }

    loadInfo();
  }, [repoName]);
  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      <Owner>
        <Link to="/">Voltar para os repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <IssueList>
        {issues.map((issue) => (
          <Issue key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
              </strong>
              <p>{issue.user.login}</p>

              <LabelList>
                {issue.labels.map((label) => (
                  <Label key={String(label.id)} color={label.color}>
                    <span>{label.name}</span>
                  </Label>
                ))}
              </LabelList>
            </div>
          </Issue>
        ))}
      </IssueList>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repoName: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
