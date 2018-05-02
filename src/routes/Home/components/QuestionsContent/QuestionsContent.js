import React from 'react'
import PropTypes from 'prop-types'
import './QuestionsContent.scss'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

export class QuestionsLeftSidenav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const { questions, toggleAnswer } = this.props
    if (questions.length > 0) {
      const questionsDOM = questions.map((question, index) =>
        (
          <div id={`question-${index}`} key={question.id} className="question-answer">
            <label data-tooltip="This is a question" onClick={() => toggleAnswer(index)}>{question.question}</label>
            <p data-tooltip="This is an answer" className={question.visible ? 'visible' : ''}>{question.answer}</p>
          </div>
        )
      )
      const result = (<Paper id="question-area" className="question-area" elevation={4}>
        {questionsDOM}
      </Paper>)
      return (
        <div id="content" className="content">
          {result}
        </div>
      )
    }
    return (
      <div id="content" className="content">
        <Paper className="not-found" elevation={4}>
          <Typography className="not-found-info" component="p">
            There is no question!
          </Typography>
        </Paper>
      </div>
    )
  }
}

QuestionsLeftSidenav.propTypes = {
  questions: PropTypes.array.isRequired,
  toggleAnswer: PropTypes.func.isRequired
}

export default QuestionsLeftSidenav
