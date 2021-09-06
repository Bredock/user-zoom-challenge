import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => <Alert variant={alert.type} key={alert.id}>{alert.message}</Alert>);

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
