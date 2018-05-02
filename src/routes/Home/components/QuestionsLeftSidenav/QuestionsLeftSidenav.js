import React from 'react'
import PropTypes from 'prop-types'
import './QuestionsLeftSidenav.scss'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'

export class QuestionsLeftSidenav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  selectQuestion (event, index) {
    const elementTop = document.getElementById(`question-${index}`).offsetTop;
    document.getElementById('question-area').scrollTo(0, elementTop)
    this.toggleAnswer(index)
  }
  render () {
    const { questions, toggleAnswer } = this.props
    this.toggleAnswer = toggleAnswer
    let listItems = <ListItem button><ListItemText primary="There is no question" /></ListItem>
    listItems = questions.map((question, index) =>
      (<ListItem onClick={(event) => this.selectQuestion(event, index)} button key={question.id}>
        <ListItemText primary={question.question} />
      </ListItem>)
    )
    return (
      <div className="left-sidenav">
        <List
          component="nav"
          subheader={<ListSubheader component="div">Questions</ListSubheader>}
        >
          {listItems}
        </List>
      </div>
    )
  }
}

QuestionsLeftSidenav.propTypes = {
  questions: PropTypes.array.isRequired,
  toggleAnswer: PropTypes.func.isRequired
}

export default QuestionsLeftSidenav
