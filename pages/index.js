/* eslint-disable func-names */
/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../components/Widget';
import Input from '../components/Input';
import Footer from '../components/Footer';
import GithubCorner from '../components/GithubCorner';
import QuizContainer from '../components/QuizContainer';
import QuizBackground from '../components/QuizBackground';
import QuizLogo from '../components/QuizLogo';
import Button from '../components/Button';
import Link from '../components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{
            delay: 0,
            duration: 0.2,
          }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Breaking Bad</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste os seus conhecimentos sobre Breaking Bad e vamos ver se você realmente é o perigo.</p>

            <form onSubmit={(event) => {
              event.preventDefault();

              router.push(`/quiz?name=${name}`);
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

        <Widget
          as={motion.section}
          transition={{
            delay: 0.1,
            duration: 0.2,
          }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Outros quizzes</h1>
            <ul>

              {db.external.map((externalLink) => {
                const [projectName, githubUser] = externalLink
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={externalLink}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`} style={{ color: db.theme.colors.contrastText }}>{`${githubUser}/${projectName}`}</Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.section}
          transition={{
            delay: 0.2,
            duration: 0.2,
          }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
        <GithubCorner projectUrl="https://github.com/luizfelipewd/brba-quiz" />
      </QuizContainer>
    </QuizBackground>
  );
}
