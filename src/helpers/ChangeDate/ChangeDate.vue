<script setup lang="ts">
import { watch } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'

const inputDate = defineModel()
const emit = defineEmits(['change-date'])

const updateDate = () => {
  emit('change-date', inputDate.value)
}
watch(inputDate, updateDate)
</script>

<template>
  <div>
    <h3>
      <v-date-input v-model="inputDate" variant="underlined" label="Change Date"></v-date-input>
    </h3>
  </div>
</template>

<style lang="scss"></style>
