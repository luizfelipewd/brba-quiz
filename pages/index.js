/* eslint-disable func-names */
/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../components/Widget';
import Input from '../components/Input';
import Footer from '../components/Footer';
import GithubCorner from '../components/GithubCorner';
import QuizContainer from '../components/QuizContainer';
import QuizBackground from '../components/QuizBackground';
import QuizLogo from '../components/QuizLogo';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Breaking Bad</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste os seus conhecimentos sobre Breaking Bad e vamos ver se você realmente é o perigo.</p>

            <form onSubmit={(event) => {
              event.preventDefault();

              router.push(`/quiz?name=${name}`);
              // eslint-disable-next-line no-console
              console.log('Fazendo submissão');
            }}
            >
              <Input
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Insira seu nome"
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar&nbsp;
                {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Outros quizzes</h1>
            <p>Quiz sobre a melhor serie do mundo.</p>
          </Widget.Content>
        </Widget>

        <Footer />
        <GithubCorner projectUrl="https://github.com/luizfelipewd/brba-quiz" />
      </QuizContainer>
    </QuizBackground>
  );
}
