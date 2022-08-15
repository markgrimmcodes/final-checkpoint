<template>
  <div id="counter">Question {{ count }}/{{ $store.state.numOfQuestions }}</div>
  <p>{{ text }}</p>
  <button
    v-if="finishedState === false"
    @click="getRandomQuestion(), countUp()"
  >
    {{ buttonText }}
  </button>
  <router-link v-else id="finish_link" to="/" @click="cleanUp()">
    Wanna go again?</router-link
  >
</template>
<script>
export default {
  name: "QuizView",
  data() {
    return {
      questions: [],
      count: 1,
      finishedState: false,
    };
  },
  computed: {
    text() {
      if (this.finishedState === false) {
        return this.getRandomQuestion().toString();
      } else {
        return "Congratulations you worked your way through all of the Questions!";
      }
    },
    buttonText() {
      if (this.count === this.$store.state.numOfQuestions) {
        return "Finish";
      } else {
        return "Next Question";
      }
    },
  },

  methods: {
    getRandomQuestion() {
      const choices = this.questions[0].questions
        .sort(() => Math.random() - 0.5)
        .slice(0, 1);

      return choices;
    },
    countUp() {
      if (this.count < this.$store.state.numOfQuestions) {
        this.count++;
      } else if ((this.count = this.$store.state.numOfQuestions)) {
        (this.finishedState = true), (this.buttonText = "finish");
      }
    },
    cleanUp() {
      this.$store.commit("RESET_STATE");
    },
  },

  async created() {
    for (let category of this.$store.state.questionTopics) {
      const response = await fetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
          category +
          ".json"
      );
      this.questions.push(await response.json());
    }
  },
};
</script>

<style scoped>
#counter {
  padding-top: 2em;
}
#finish_link {
  color: black;
}
</style>
