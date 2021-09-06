import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';

import { useHistory } from 'react-router';

import './Details.css';

const Details = ({ orgInfo, commitList }) => {
  let history = useHistory();

  if (!orgInfo || Object.keys(orgInfo).length === 0) {
    history.push('/');
  }

  const filterLongText = (text) => {
    if(text.length <= 200) {
      return text;
    } else {
      return text.substring(0, 145) + ' (...)';
    }
  }

  const commitListElement =
    (commitList !== null &&
      commitList.length > 0 &&
      commitList.map((commit) => {
        console.log('individual commit -> ', commit.committer);
        return (
          <div className='commit-element' key={commit.sha}>
            <div>
              <img src={commit.author.avatar_url} className='commit-image' alt='commit-image' />
            </div>
            <div className='commit-info'>
              <p>
                <strong>Message: </strong> {filterLongText(commit.commit.message)}
              </p>
              <p>
                <strong>Sha: </strong> {commit.sha}
              </p>
              <p>
                <strong>Author: </strong> {commit.author.login}
              </p>
              <p>
                <strong>Email: </strong> {commit.commit.committer.email}
              </p>
              <p>
                <strong>Date: </strong> {commit.commit.committer.date}
              </p>
            </div>
          </div>
        );
      })) ||
    '';
  return (
    <div className='Details'>
      <Card>
        <Card.Body>
          <div className='row'>
            <div className='col-md-3'>
              <img src={orgInfo.avatar_url} className='repo-image' alt='repo-image' />
            </div>
            <div className='col-md-9'>
              <div className='org-info-wrapper'>
                <p>
                  <strong>Organization: </strong> {orgInfo.name}
                </p>
                <p>
                  <strong>Repositorie: </strong> {orgInfo.name}
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      {commitListElement}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orgInfo: state.githubApi.orgInfo,
  commitList: state.githubApi.commitList,
});

export default connect(mapStateToProps)(Details);
