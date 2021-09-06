import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import {
  getGithubOrg,
  getGithubOrgRepos,
  getGithubRepoCommits,
} from '../actions/github-api';

const List = ({
  orgInfo,
  repoList,
  getGithubOrg,
  getGithubOrgRepos,
  getGithubRepoCommits,
}) => {
  let history = useHistory();
  const [value, setValue] = useState('');
  const [selectedRepo, setSelectedRepo] = useState({});

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0,
  });

  useEffect(() => {
    value &&
      getGithubOrgRepos({
        org: value,
        perPage: lazyParams.rows,
        page: lazyParams.page + 1,
      });
  }, [lazyParams]);

  const onPage = (event) => {
    setLazyParams({
      first: event.first,
      page: event.page,
      rows: event.rows,
    });
  };

  const searchRepos = () => {
    getGithubOrg({ org: value });
  };

  const updateAtTemplate = (rowData) => {
    const date = new Date(rowData.updated_at);
    return date.toLocaleString();
  };

  const onSelectionChange = (selectedRepo) => {
    setSelectedRepo(selectedRepo);
    getGithubRepoCommits({ org: value, repo: selectedRepo.name });
    history.push('/details');
  };

  return (
    <div className='container'>
      <h1>List of Repositories</h1>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder="Organization's name"
          aria-label="Organization's name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant='primary' id='search-button' onClick={searchRepos}>
          Search
        </Button>
      </InputGroup>
      {repoList !== null && repoList.length > 0 && (
        <DataTable
          value={repoList}
          lazy
          onPage={onPage}
          paginator
          first={lazyParams.first}
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
          rows={lazyParams.rows}
          rowsPerPageOptions={[10, 20, 50]}
          totalRecords={orgInfo.public_repos}
          selectionMode='single'
          selection={selectedRepo}
          onSelectionChange={(e) => onSelectionChange(e.value)}
        >
          <Column field='name' header='Name'></Column>
          <Column
            field='updated_at'
            header='Updated At'
            body={updateAtTemplate}
          ></Column>
          <Column field='language' header='Language'></Column>
          <Column field='watchers' header='Watchers'></Column>
          <Column field='forks' header='Forks'></Column>
        </DataTable>
      )}
    </div>
  );
};

List.propTypes = {
  getGithubOrg: PropTypes.func.isRequired,
  getGithubOrgRepos: PropTypes.func.isRequired,
  getGithubRepoCommits: PropTypes.func.isRequired,
  orgInfo: PropTypes.object,
  repoList: PropTypes.array,
}

const mapStateToProps = (state) => ({
  orgInfo: state.githubApi.orgInfo,
  repoList: state.githubApi.repoList,
});

export default connect(mapStateToProps, {
  getGithubOrg,
  getGithubOrgRepos,
  getGithubRepoCommits,
})(List);
