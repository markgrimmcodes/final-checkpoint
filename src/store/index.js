import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      questionTopics: [],
      numOfQuestions: 0,
    };
  },
  getters: {},
  mutations: {
    UPDATE_QUESTION_TOPICS(state, value) {
      console.log(state.questionTopics);
      state.questionTopics = value;
      console.log(state.questionTopics);
    },
    UPDATE_NUMOFQUESTION(state, value) {
      state.numOfQuestions = value;
    },
  },
  actions: {},
});
