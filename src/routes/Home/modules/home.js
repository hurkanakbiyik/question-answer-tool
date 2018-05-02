import faker from 'faker';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_QUESTION = 'ADD_QUESTION'
export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const TOGGLE_ANSWER = 'TOGGLE_ANSWER'
export const SORT_QUESTIONS = 'SORT_QUESTIONS'
export const REMOVE_QUESTIONS = 'REMOVE_QUESTIONS'
export const UNSORT_QUESTIONS = 'UNSORT_QUESTIONS'

// ------------------------------------
// Actions
// ------------------------------------

export function handleOpen () {
  return {
    type: OPEN_DIALOG
  }
}

export function handleClose () {
  return {
    type: CLOSE_DIALOG
  }
}

export function sortQuestions () {
  return {
    type: SORT_QUESTIONS
  }
}

export function unsortQuestions () {
  return {
    type: SORT_QUESTIONS
  }
}

export function removeQuestions () {
  return {
    type: REMOVE_QUESTIONS
  }
}

export function toggleAnswer (index) {
  return {
    type: TOGGLE_ANSWER,
    payload: index
  }
}

export function addQuestion (question, answer) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: ADD_QUESTION,
          payload: { id: getState().home.questions.length + 1, question, answer }
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  addQuestion,
  handleOpen,
  handleClose,
  toggleAnswer,
  sortQuestions,
  unsortQuestions,
  removeQuestions
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  questions: createQuestions(),
  form: {
    question: '',
    answer: ''
  },
  open: false,
  sorted: false
}

function createQuestions () {
  faker.seed(1)
  const questions = []
  for ( let i = 0; i < 50; i++) {
    questions.push({
      id: faker.random.number(),
      question: faker.lorem.sentence(),
      answer: faker.lorem.paragraph(),
      visible: false
    });
  }
  return questions;
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        questions: state.questions,
        open: true,
        sorted: false,
        form: state.form
      }
    case CLOSE_DIALOG:
      return {
        questions: state.questions,
        open: false,
        sorted: false,
        form: state.form
      }
    case ADD_QUESTION:
      return {
        questions: [...state.questions, action.payload],
        open: false,
        sorted: false,
        form: initialState.form
      }
    case REMOVE_QUESTIONS:
      return {
        questions: [],
        open: false,
        sorted: false,
        form: initialState.form
      }
    case SORT_QUESTIONS:
      return {
        questions: state.questions.sort((a, b) => {
          const nameA = a.question.toUpperCase(); // ignore upper and lowercase
          const nameB = b.question.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }),
        open: false,
        sorted: true,
        form: initialState.form
      }
    case UNSORT_QUESTIONS:
      return {
        questions: state.questions.sort((a, b) => {
          return a.id - b.id;
        }),
        sorted: false,
        open: false,
        form: initialState.form
      }
    case TOGGLE_ANSWER:
      state.questions[action.payload].visible = state.questions[action.payload].visible
        ? !state.questions[action.payload].visible : true
      return {
        questions: [...state.questions],
        open: false,
        sorted: false,
        form: initialState.form
      }
    default:
      return state
  }
}
