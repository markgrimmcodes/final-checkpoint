<template>
  <div id="counter">Question {{ count }}/{{ $store.state.numOfQuestions }}</div>
  <p>{{ text }}</p>
  <button v-if="finishedState === false" @click="countUp()">
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
      numOfQuestions: Number,
      questions: [],
      count: 1,
      finishedState: false,
      mixedQuestions: [],
    };
  },
  computed: {
    text() {
      if (this.finishedState === false) {
        return this.mixedQuestions[this.count - 1];
      } else {
        return "Congratulations you worked your way through all of the questions!";
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
    countUp() {
      if (this.count < this.$store.state.numOfQuestions) {
        this.count++;
      } else if ((this.count = this.$store.state.numOfQuestions)) {
        this.finishedState = true;
      }
    },

    cleanUp() {
      this.$store.commit("RESET_STATE");
    },
  },

  async created() {
    this.numOfQuestions = this.$store.state.numOfQuestions;
    const numbersPerCategory = Math.floor(
      this.numOfQuestions / this.$store.state.questionTopics.length
    );
    let modulo = this.numOfQuestions % numbersPerCategory;
    const additionalNumbersPerCategory = Math.ceil(
      modulo / this.$store.state.questionTopics.length
    );

    for (let category of this.$store.state.questionTopics) {
      const response = await fetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
          category +
          ".json"
      );
      const data = await response.json();

      let sorted = data.questions
        .sort(() => Math.random() - 0.5)
        .slice(0, numbersPerCategory + additionalNumbersPerCategory);
      this.mixedQuestions = this.mixedQuestions.concat(sorted);
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
