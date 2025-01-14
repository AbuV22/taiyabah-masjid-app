<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ChangeMonth from '../ChangeMonth/ChangeMonth.vue'

const montlhyPrayerTimes = ref([])
const date = new Date()
const myMonth = ref(date.getMonth() + 1)

const monthlyIndividualsPrayerTimes = computed(() => {
  return (
    montlhyPrayerTimes.value?.map((day) => ({
      date: day.date,
      timings: day.timings,
    })) || 'Loading...'
  )
})

const fetchMonthlyPrayerTimes = async () => {
  try {
    const response = await fetch(
      `http://api.aladhan.com/v1/calendarByCity/2025/${myMonth.value}?city=Manchester&country=UK`,
    )
    const data = await response.json()

    montlhyPrayerTimes.value = data.data.map((day) => ({
      date: day.date.gregorian.date,
      timings: {
        Fajr: day.timings.Fajr,
        Dhuhr: day.timings.Dhuhr,
        Asr: day.timings.Asr,
        Maghrib: day.timings.Maghrib,
        Isha: day.timings.Isha,
      },
    }))
  } catch (error) {
    console.error('Error fetching prayer times data:', error)
  }
}

const changeNewMonth = (month) => {
  myMonth.value = month
  fetchMonthlyPrayerTimes()
}

onMounted(fetchMonthlyPrayerTimes)
</script>

<template>
  <div class="see-month">
    <div>
      <ChangeMonth @change-month="changeNewMonth" />
    </div>
    <div>
      <RouterLink to="/" class="see-month__router">Go back</RouterLink>
    </div>
    <div
      class="see-month__prayer-container"
      v-for="(prayer, index) in monthlyIndividualsPrayerTimes"
      :key="index"
    >
      <div class="see-month__prayer-card">
        <h1 class="see-month__prayer-date">
          {{ prayer.date }}
        </h1>
        <ul class="see-month__prayer-times">
          <li><strong>Fajr:</strong> {{ prayer.timings.Fajr }}</li>
          <li><strong>Zohr:</strong> {{ prayer.timings.Dhuhr }}</li>
          <li><strong>Asr:</strong> {{ prayer.timings.Asr }}</li>
          <li><strong>Maghrib:</strong> {{ prayer.timings.Maghrib }}</li>
          <li><strong>Isha:</strong> {{ prayer.timings.Isha }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.see-month {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 20px;

  &__router {
    color: blue;
    text-decoration: underline;
    margin-bottom: 20px;
  }

  &__prayer-container {
    display: flex;
    justify-content: center;
  }

  &__prayer-card {
    width: 100%;
    max-width: 350px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  }

  &__prayer-date {
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  &__prayer-times {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 1.1em;
      margin: 5px 0;
      strong {
        color: #007bff;
      }
    }
  }
}
</style>
