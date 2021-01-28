import styled from 'styled-components'
import db from '../db.json'
import Widget from '../components/Widget'
import Footer from '../components/Footer'
import GithubCorner from '../components/GithubCorner'
import QuizContainer from '../components/QuizContainer'
import QuizBackground from '../components/QuizBackground'


export default function Home() {
  return(
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Breaking Bad</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Quiz sobre a melhor serie do mundo.</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Outros quizzes</h1>
            <p>Quiz sobre a melhor serie do mundo.</p>
          </Widget.Content>
        </Widget>

        <Footer />
        <GithubCorner projectUrl="https://www.github.com/luizfelipewd"/>
      </QuizContainer>
    </QuizBackground>
    )
}
