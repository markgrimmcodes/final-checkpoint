<template>
  <div class="home">
    <h1>PLAY QUIZBOX</h1>
    <p>Quiz time - test your knowledge!</p>

    <select v-model="numOfQuestions">
      <option v-for="option in options" :key="option" :value="option.value">
        {{ option.value }} {{ option.text }}
      </option>
    </select>
    <h2>Choose your topic(s)!</h2>

    <ul class="topic_list">
      <li v-for="(category, index) in categories" :key="category">
        <div class="label_wrap">
          <input
            type="checkbox"
            v-model="checkedTopics"
            name="checkbox"
            :id="'checkbox' + index"
            :checked="category.checked"
            :value="category.value"
          />

          <label :for="'checkbox' + index">{{ category.text }}</label>
        </div>
        <label :for="'checkbox' + index"
          >&nbsp; Questions: {{ category.length }}
        </label>
      </li>
    </ul>
    <router-link
      v-if="numOfQuestions > 0 && checkedTopics.length > 0"
      id="start_game"
      @click="loggit()"
      class="link"
      to="/quiz"
      >START QUIZ</router-link
    >
    <p v-else>Choose the amount of questions and at least one topic!</p>
  </div>
</template>

<script>
import { topics } from "./../topics.js";

export default {
  name: "HomeView",
  data() {
    return {
      questions: [],
      numOfQuestions: 0,
      questionsPerTopic: [],
      categories: topics,
      options: [
        { text: "questions", value: 30 },
        { text: "questions", value: 20 },
        { text: "questions", value: 10 },
      ],
      checkedTopics: [],
    };
  },
  methods: {
    async getQuestions() {
      for (let i = 0; i < topics.length; i++) {
        const response = await fetch(
          `https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/${this.categories[i].value}.json`
        );
        this.questions = await response.json();

        this.questionsPerTopic.push(this.questions.questions.length);
        this.categories[i].length = this.questions.questions.length;
      }
    },
    loggit() {
      this.$store.commit("UPDATE_QUESTION_TOPICS", this.checkedTopics);
      this.$store.commit("UPDATE_NUMOFQUESTION", this.numOfQuestions);
    },
  },
  async created() {
    await this.getQuestions();
  },
};
</script>

<style scoped>
.home {
  padding: 2em;
}
h2 {
  margin-top: 2em;
}
li {
  list-style: none;
  padding: 1em;
}
#start_game {
  all: unset;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.3em;
  border-radius: 2px;
}
</style>
