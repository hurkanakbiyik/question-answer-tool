import { connect } from 'react-redux'
import { addQuestion, handleClose, handleOpen, toggleAnswer, sortQuestions, removeQuestions } from '../modules/home'

import QuestionAnswer from '../components/QuestionAnswer'

const mapDispatchToProps = {
  addQuestion,
  handleClose,
  handleOpen,
  toggleAnswer,
  sortQuestions,
  removeQuestions
}

const mapStateToProps = (state) => (state.home)

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer)
