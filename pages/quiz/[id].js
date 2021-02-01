/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Quiz from '../../screens/Quiz';

export default function QuizzesDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <Quiz
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((responseObject) => (responseObject))
    .catch((err) => {
      console.error(err);
    });
  return {
    props: {
      externalDb,
    },
  };
}
