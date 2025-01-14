<script setup lang="ts">
const inputMonth = defineModel()
const emit = defineEmits(['change-month'])

const updateMonth = () => {
  emit('change-month', inputMonth.value)
}
</script>

<template>
  <div>
    <h3 data-qa-input-month>
      Change Month <input v-model="inputMonth" placeholder="Month" />

      <button @click="updateMonth" data-qa-update-month>Change</button>
    </h3>
  </div>
</template>

<style lang="scss"></style>
