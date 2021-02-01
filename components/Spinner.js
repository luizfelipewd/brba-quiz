/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';

const SpinnerBase = styled.div`
  margin: auto;
  border: 5px solid ${({ theme }) => theme.colors.input};
  border-top: 5px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default function Spinner() {
  return (
    <div>
      <SpinnerBase />
    </div>
  );
}
