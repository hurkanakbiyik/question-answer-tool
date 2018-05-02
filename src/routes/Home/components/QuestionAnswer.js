import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import QuestionsLeftSidenav from './QuestionsLeftSidenav/QuestionsLeftSidenav'
import QuestionsContent from './QuestionsContent/QuestionsContent'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/DeleteForever'
import SortByAlpha from '@material-ui/icons/SortByAlpha'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import './QuestionAnswer.scss'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

export class QuestionAnswer extends React.PureComponent {
  handleInputChange (event) {
    this.props.form[event.target.name] = event.target.value
  }

  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render () {
    const { questions, open, form, handleOpen, handleClose, addQuestion, sortQuestions, removeQuestions } = this.props
    return (
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Grid container className={styles.root}>
          <Grid className="left-sidenav-container" style={{ display: 'flex' }} item md={2}>
            <QuestionsLeftSidenav {...this.props} />
          </Grid>
          <Grid style={{ display: 'flex' }} item xs={12} md={10}>
            <QuestionsContent {...this.props} />
          </Grid>
        </Grid>
        <div className="add-button-area">
          <Button data-tooltip="Add Question" onClick={handleOpen} variant="fab" color="primary" aria-label="add">
            <AddIcon/>
          </Button>
          <Button data-tooltip="Remove All Questions" style={{ marginLeft: 8 }} onClick={removeQuestions} variant="fab"
                  color="secondary" aria-label="remove">
            <RemoveIcon/>
          </Button>
          <Button style={{ marginLeft: 8, backgroundColor: '#009688' }} onClick={sortQuestions} variant="fab"
                  color="secondary" aria-label="sort">
            <SortByAlpha/>
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Question</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can create new question with filling the form.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              name="question"
              label="Question"
              type="text"
              onChange={this.handleInputChange}
              fullWidth
            />
            <TextField
              multiline
              rowsMax="4"
              margin="dense"
              id="answer"
              name="answer"
              label="Answer"
              type="text"
              onChange={this.handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={(event) => {
              addQuestion(this.props.form.question, this.props.form.answer)
            }} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

QuestionAnswer.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  sortQuestions: PropTypes.func.isRequired,
  removeQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired
}

export default QuestionAnswer
