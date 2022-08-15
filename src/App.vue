<template>
  <div class="headwrap">
    <button id="navigator" @click="toggleNavState()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        id="navMenu"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
    <p class="headline">QUIZBOX</p>
  </div>
  <div class="polygon_section">
    <div class="polygon_1" :class="[navState ? 'active_navi' : '']">
      <nav id="navi">
        <router-link @click="toggleNavState()" class="link" to="/browse"
          >Browse Questions</router-link
        >

        <router-link @click="toggleNavState()" class="link" to="/"
          >Start Game</router-link
        >
      </nav>
    </div>

    <div id="polygon_2"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navState: false,
    };
  },
  methods: {
    toggleNavState() {
      if (this.navState === false) {
        this.navState = true;
      } else {
        this.navState = false;
      }
      console.log(this.navState);
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);
* {
  --primary-color: #6a1cc3;
  --primary-inactive-color: #6a1cc3 38%;
  --secondary-color: #8849cf;
  --surface-color: #fbfbfb;
  --text-color: #000000 87%;
  font-size: 16px;
  padding: 0;
  margin: 0;
  --main-font: Source Sans Pro;
  --headline-font: Montserrat;
  font-family: var(--main-font);
}
#navigator {
  all: unset;
  position: absolute;
  transform: translate(-8em, -0.4em);
}
.headwrap {
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  padding: 1em;
  max-width: 100vw;
}
#navMenu {
  color: var(--surface-color);
  width: 2em;
  height: 2em;
  transition: 0.2s ease;
}
.headline {
  font-size: 1em;
  color: var(--surface-color);
  font-family: var(--headline-font);
  font-weight: 500;
}
@media screen and (max-width: 300px) {
  .headwrap {
    display: block;
  }
  #navigator {
    all: unset;
  }
}
.polygon_section {
  height: 2.5vh;
  position: relative;
}
.polygon_1 {
  background-color: var(--secondary-color);
  position: absolute;
  height: 100%;
  width: 100%;
  clip-path: polygon(0% 0%, 0% 30%, 50% 100%, 100% 30%, 100% 0%);
  transition: all 0.3s ease;
}

.active_navi {
  clip-path: polygon(0% 0%, 0% 80%, 50% 100%, 100% 80%, 100% 0%);
  height: 850%;
}
#navMenu:hover {
  transform: scale(1.2);
}
#polygon_2 {
  position: absolute;
  background-color: var(--primary-color);
  height: 100%;
  width: 100%;
  clip-path: polygon(0% 0%, 50% 70%, 100% 0%);
}
h1 {
  color: var(--primary-color);
}
.link {
  color: var(--surface-color);
  transition: 0.2s ease;
}
#navi {
  padding-top: 2.5em;
  gap: 1em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>
