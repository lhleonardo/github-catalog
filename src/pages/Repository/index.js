import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import api from '../../service/api';
import {
  Loading,
  Owner,
  IssueList,
  Issue,
  Label,
  LabelList,
  PageControl,
} from './styles';

import Container from '../../components/Container';

function Repository({ match: { params } }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageInfo, setPageInfo] = useState({});

  const repoName = decodeURIComponent(params.repoName);

  function extractPageInfo(issuesResponse) {
    // <https://api.github.com/repositories/10270250/issues?page=1>; rel="prev",
    // <https://api.github.com/repositories/10270250/issues?page=3>; rel="next",
    // <https://api.github.com/repositories/10270250/issues?page=19>; rel="last",
    // <https://api.github.com/repositories/10270250/issues?page=1>; rel="first"

    const links = issuesResponse.headers.link.split(',');

    const pagesData = {};

    links.forEach((link) => {
      const [linkData, rel] = link.split(';');
      const url = new URL(linkData.match(/<([^)]+)>/)[1]);

      pagesData[rel.match(/rel="([^)]+)"/)[1]] = Number(
        url.searchParams.get('page'),
      );
    });

    return pagesData;
  }

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

      const info = extractPageInfo(repoIssues);
      setPageInfo({
        current: 1,
        ...info,
      });

      setLoading(false);
    }

    loadInfo();
  }, [repoName]);

  useEffect(() => {
    console.log(pageInfo);
  }, [pageInfo]);

  async function changePage(nextPage) {
    console.log(nextPage);
    const response = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        page: nextPage,
        state: 'open',
        per_page: 10,
      },
    });

    const info = extractPageInfo(response);

    setIssues(response.data);
    setPageInfo({
      current: nextPage,
      ...info,
    });
  }

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

      <PageControl>
        <button
          disabled={!('prev' in pageInfo)}
          type="button"
          onClick={() => changePage(pageInfo.prev)}
        >
          <FaArrowCircleLeft color="#5960c1" size={25} />
        </button>
        <button
          disabled={!('next' in pageInfo)}
          type="button"
          onClick={() => changePage(pageInfo.next)}
        >
          <FaArrowCircleRight color="#5960c1" size={25} />
        </button>
      </PageControl>
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
