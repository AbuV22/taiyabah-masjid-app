<script setup lang="ts">
const prayerCard = defineProps<{
  name: String
  begPrayerTime: Number
  jamPrayerTime: string
}>()
</script>

<template>
  <div class="prayer-card">
    <h5 class="prayer-card__name">{{ name }}</h5>
    <div class="prayer-card__times">
      <p class="prayer-card__begin-time">{{ begPrayerTime }}</p>
      <p class="prayer-card__jamat-time">{{ jamPrayerTime }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.prayer-card {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid black;
  margin: 10px;
  font-family: 'Arial', sans-serif;

  &__name {
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

  &__times {
    display: flex;
    gap: 20px;
    font-size: 16px;
    color: #444;
  }

  &__jamat-time {
    font-size: large;
    font-weight: bolder;
  }

  @media (max-width: 412px) {
    .prayer-card {
      flex-direction: row;
    }

    .prayer-card__times {
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
    }
  }
}
</style>
