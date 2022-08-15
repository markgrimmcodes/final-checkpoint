<template>
  <h1>Quizbox</h1>
  <p>Browse Questions -</p>
  <select v-model="selectedTopic">
    <option value="" disabled selected hidden>Choose a topic!</option>
    <option v-for="topic in quizTopics" :key="topic" :value="topic.value">
      {{ topic.text }}
    </option>
  </select>
  <h2>Questions from this topic : {{ questions.length }}</h2>
  <ul>
    <li v-for="question in questions" :key="question">{{ question }}</li>
  </ul>
</template>
<script>
import { topics } from "./../topics";
export default {
  name: "BrowseView",
  data() {
    return {
      selectedTopic: "",
      quizTopics: topics,
      questions: [],
    };
  },
  watch: {
    async selectedTopic(activeTopic) {
      const response = await fetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
          activeTopic +
          ".json"
      );
      this.questions = await response.json();
      this.questions = this.questions.questions;
    },
  },
};
</script>
<style scoped>
h1 {
  padding-top: 2em;
}
</style>
