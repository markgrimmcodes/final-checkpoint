import { createStore } from "vuex";
const getDefaultState = () => {
  return {
    items: [],
  };
};

export default createStore({
  state() {
    return {
      questionTopics: getDefaultState(),
      numOfQuestions: 0,
    };
  },
  getters: {},
  mutations: {
    UPDATE_QUESTION_TOPICS(state, value) {
      state.questionTopics = value;
    },
    UPDATE_NUMOFQUESTION(state, value) {
      state.numOfQuestions = value;
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {},
});
