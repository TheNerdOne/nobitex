<template>
  <Navbar>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-lg-6 col-md-8">
          <div>Enter number between {{ `${min} - ${max}` }}</div>
          <div class="d-flex">
            <CustomInput @input="guessedNum = $event" :value="guessedNum" />
            <b-button variant="primary" block @click="handleNum"
              >submit</b-button
            >
          </div>
          <div>Previous guesses: {{ spliter }}</div>
          <div v-if="counter !== 0">
            your number is {{ message }} random number!
          </div>
          <div v-if="counter !== 0">
            resault:
            {{
              counter < 10
                ? `guessed: ${counter}`
                : counter == 10 && guessedNum == randomNum
                ? "you win"
                : "you lose!"
            }}
          </div>
          <b-button v-if="counter == 10" variant="info" block @click="reset"
            >reset</b-button
          >
        </div>
      </div>
    </div>
  </Navbar>
</template>

<script>
import CustomInput from "../../components/common/CustomInput.vue";
import Navbar from "../../components/layout/Navbar.vue";
import pageAccess from "@/utils/pageAccess";

export default {
  components: { CustomInput, Navbar },
  mixins:[pageAccess],
  data() {
    return {
      counter: 0,
      guessedNum: 0,
      randomNum: 10,
      message: "",
      min: "",
      max: "",
      PrevGuesses: [],
    };
  },
  computed: {
    spliter() {
      if (this.PrevGuesses.length > 0) {
        return this.PrevGuesses.toString();
      } else {
        return 0;
      }
    },
  },
  methods: {
    guessChecker() {
      this.counter += 1;
    },
    generateRandomFloatInRange(min, max) {
      this.randomNum = parseInt(Math.random() * (max - min + 1) + min);
    },
    reset() {
      this.counter = 0;
      this.guessedNum = 0;
      this.message = "";
    },
    handleNum() {
      if (this.counter < 10) {
        if (this.guessedNum > this.randomNum) {
          this.PrevGuesses.push(this.guessedNum);
          this.message = "higher than";
        } else if (this.guessedNum < this.randomNum) {
          this.PrevGuesses.push(this.guessedNum);
          this.message = "lower than";
        } else {
          this.message = "equal to";
        }
        this.guessChecker();
      }
    },
  },
  mounted() {
    this.min = parseInt(Math.random() * 10);
    this.max = parseInt(Math.random() * 1000);
    this.generateRandomFloatInRange(this.min, this.max);
  },
};
</script>

<style scoped lang="scss">
.container.mt-5{
  margin:5rem;
}
</style>
