<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    classes: {
      type: String,
      default: '',
    },
    value: {
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: false,
    },
    errortext: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
   
   
  },
}
</script>

<template>
  <div>
    <div class="mainInput" :class="classes">
      <div class="w-100 position-relative">
        <b-form-input
          :class="showError ? `errorStyle` : `inputStyle`"
          autocomplete="off"
          v-model="inputVal"
          :type="inputType"
          :placeholder="placeholder"
          :required="required"
          :style="required && 'border-right: 5px solid #fe5e61;'"
        ></b-form-input>
        <div v-if="showError" class="errorClass">{{ errortext }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainInput {
  display: flex;
  align-items: center;
}
.inputStyle {
  width: 100%;
  color: #74788d;
  background: #ffffff;
  border: 1px solid #ced4da;
  padding: 6px 10px;
  box-sizing: border-box;
}
.errorStyle {
  line-height: 17px;
  width: 100%;
  color: #74788d;
  background: #ffffff;
  border: 1px solid #fe5e61;
  padding: 6px 10px;
  box-sizing: border-box;
}
.errorClass {
  position: absolute;
  bottom: -16px;
  font-size: 10px;
  color: #fe5e61;
}
input:focus {
  outline: none;
}
input:focus::placeholder {
  color: transparent;
}
input::placeholder {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: #74788d;
}
.labelStyle {
  min-width: 90px;
  max-width: 90px;
  margin-left: 10px;
  display: table;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #444444;
  justify-content: flex-start;
  align-items: center;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
