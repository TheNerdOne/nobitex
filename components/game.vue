<template>
  <no-ssr>
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
                lowerThanTen
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
  </no-ssr>
</template>

<script>
import CustomInput from "@/components/common/CustomInput.vue";
import Navbar from "@/components/layout/Navbar.vue";
import pageAccess from "@/utils/pageAccess";
import { gameMixin } from "../mixin/game";

export default {
  components: { CustomInput, Navbar },
  mixins: [pageAccess, gameMixin],
};
</script>

<style scoped lang="scss">
.container.mt-5 {
  margin: 5rem;
}
</style>
