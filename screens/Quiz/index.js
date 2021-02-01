/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable max-len */
import React from 'react';
// import db from '../../db.json';
import Widget from '../../components/Widget';
import Footer from '../../components/Footer';
import GithubCorner from '../../components/GithubCorner';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import Spinner from '../../components/Spinner';
import ExternalQuizLogo from '../../components/ExternalQuizLogo';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado do Quiz
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((actualSum, actualResult) => {
            const isCorrect = actualResult === true;
            if (isCorrect) {
              return actualSum + 1;
            }
            return actualSum;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas! Confira abaixo o resultado:
        </p>
        <ul>
          {results.map((result, index) => (
            <li>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true ? 'Acertou!' : 'Errou!'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Spinner />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, questionIndex, totalQuestions, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h1>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h1>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmitted(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setSelectedAlternative(undefined);
            setIsQuestionSubmitted(false);
          }, 2 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
                htmlFor={alternativeId}
                as="label"
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selectedAlternative === undefined}>Confirmar</Button>
        </AlternativesForm>
        {isQuestionSubmitted && isCorrect && <p>Você acertou!</p>}
        {isQuestionSubmitted && !isCorrect && <p>Você errou!</p>}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

function quiz({ externalQuestions, externalBg }) {
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <ExternalQuizLogo />
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
        />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        <Footer />
        <GithubCorner projectUrl="https://github.com/luizfelipewd/brba-quiz" />
      </QuizContainer>
    </QuizBackground>
  );
}

export default quiz;
