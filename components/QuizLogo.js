/* eslint-disable linebreak-style */
import styled from 'styled-components';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import db from '../db.json';

function Logo({ className }) {
  return (
    <img src={db.logo} alt="" className={className} />
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  max-height: 280px;
  padding-top: 40px;
  margin: auto 10%;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
    padding-top: 0;
    height: 150px;
  }
`;

export default QuizLogo;
