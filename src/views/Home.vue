<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ChangeDate from '../helpers/ChangeDate/ChangeDate.vue'
import PrayerCard from '../helpers/PrayerCard/PrayerCard.vue'
import jamTimes from '../assets/prayerTimes.json'

const beginingTimes = ref('')
const jamatTimes = ref(jamTimes)
const myDate = ref(new Date())
const fajrJamTime = ref('')
const zohrJamTime = ref('')
const asrJamTime = ref('')
const magribJamTime = ref('')
const ishaJamTime = ref('')
const zohrOrJummah = ref('Zohr')

function convertTo12HourClock(time) {
  if (typeof time !== 'string' || !time.includes(':')) {
    return time
  }

  let [hour, minute] = time.split(':').map(Number)

  if (hour > 12) {
    hour -= 12
  } else if (hour === 0) {
    hour = 12
  }

  return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} `
}

const fajrBegTime = computed(() => beginingTimes.value.data?.timings?.Fajr || 'Loading...')
const zohrBegTime = computed(() => beginingTimes.value.data?.timings?.Dhuhr || 'Loading...')
const asrBegTime = computed(() => beginingTimes.value.data?.timings?.Asr || 'Loading...')
const magribBegTime = computed(() => beginingTimes.value.data?.timings?.Maghrib || 'Loading...')
const ishaBegTime = computed(() => beginingTimes.value.data?.timings?.Isha || 'Loading...')
const imsak = computed(() => beginingTimes.value.data?.timings?.Imsak || 'Loading...')
const sunrise = computed(() => beginingTimes.value.data?.timings?.Sunrise || 'Loading...')
const firstThird = computed(() => beginingTimes.value.data?.timings?.Firstthird || 'Loading...')
const lastThird = computed(() => beginingTimes.value.data?.timings?.Lastthird || 'Loading...')
const zawal = computed(() => {
  const timings = beginingTimes.value?.data?.timings

  if (!timings) return 'Loading...'

  const dhuhrTime = timings.Dhuhr

  const [hours, minutes] = dhuhrTime.split(':').map(Number)

  const zawalTime = new Date()
  zawalTime.setHours(hours, minutes - 10, 0)

  const formattedZawalTime = zawalTime.toTimeString().slice(0, 5)

  return formattedZawalTime
})

const filterJamatTimes = () => {
  const formattedDate = getFormattedDate(myDate.value, false)
  const dayData = jamatTimes.value.January_2025?.find((entry) => entry.date === formattedDate)

  if (dayData) {
    fajrJamTime.value = dayData.jamat_times.fajr
    zohrJamTime.value = dayData.jamat_times.zuhr
    asrJamTime.value = dayData.jamat_times.asr
    magribJamTime.value = dayData.jamat_times.maghrib
    ishaJamTime.value = dayData.jamat_times.isha
  } else {
    fajrJamTime.value = 'No Data'
    zohrJamTime.value = 'No Data'
    asrJamTime.value = 'No Data'
    magribJamTime.value = 'No Data'
    ishaJamTime.value = 'No Data'
  }
}

const myFormattedDate = computed(() => {
  return getFormattedDate(myDate.value, true)
})

const isJummah = () => {
  const date = getFormattedDate(myDate.value, true)
  if (date.includes('Friday')) {
    return (zohrOrJummah.value = "Jumu'ah")
  } else {
    return (zohrOrJummah.value = 'Zohr')
  }
}

const fetchPrayerTimes = async () => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${myDate.value}?latitude=53.57692&longitude=-2.4282`,
    )
    const data = await response.json()
    beginingTimes.value = data
  } catch (error) {
    console.error('Error fetching prayer times data:', error)
  }
}

const getFormattedDate = (newDate, includeDay = false) => {
  const today = new Date(newDate)
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today)
  const date = String(today.getDate()).padStart(2, '0')
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today)
  const year = today.getFullYear()
  return includeDay ? `${day} ${date} ${month} ${year}` : `${date} ${month} ${year}`
}

const changeNewDate = (date) => {
  myDate.value = date
  fetchPrayerTimes()
  filterJamatTimes()
  isJummah()
}

onMounted(() => {
  fetchPrayerTimes()
  filterJamatTimes()
  isJummah()
})
</script>

<template>
  <div class="prayer-times">
    <div class="center-container">
      <h1 class="prayer-times__title">Taiyabah Masjid Bolton</h1>
      <h2>{{ myFormattedDate }}</h2>
      <div>
        <RouterLink class="see-month__router" :to="`/full-month`">See full month</RouterLink>
      </div>
      <ChangeDate @change-date="changeNewDate"></ChangeDate>
    </div>
    <div class="prayer-times__container">
      <PrayerCard
        :name="'Fajr'"
        :begPrayerTime="convertTo12HourClock(fajrBegTime)"
        :jamPrayerTime="convertTo12HourClock(fajrJamTime)"
      />
      <PrayerCard
        :name="zohrOrJummah"
        :begPrayerTime="convertTo12HourClock(zohrBegTime)"
        :jamPrayerTime="convertTo12HourClock(zohrJamTime)"
      />
      <PrayerCard
        :name="'Asr'"
        :begPrayerTime="convertTo12HourClock(asrBegTime)"
        :jamPrayerTime="convertTo12HourClock(asrJamTime)"
      />
      <PrayerCard
        :name="'Maghrib'"
        :begPrayerTime="convertTo12HourClock(magribBegTime)"
        :jamPrayerTime="convertTo12HourClock(magribJamTime)"
      />
      <PrayerCard
        :name="'Isha'"
        :begPrayerTime="convertTo12HourClock(ishaBegTime)"
        :jamPrayerTime="convertTo12HourClock(ishaJamTime)"
      />
    </div>

    <div class="prayer-times__horizontal">
      <div class="time">
        <p>Imsak</p>
        <span>{{ convertTo12HourClock(imsak) }}</span>
      </div>
      <div class="time">
        <p>Sunrise</p>
        <span>{{ convertTo12HourClock(sunrise) }}</span>
      </div>
      <div class="time">
        <p>Zawal</p>
        <span>{{ convertTo12HourClock(zawal) }}</span>
      </div>
      <div class="time">
        <p>Tahajud 1/3</p>
        <span>{{ convertTo12HourClock(firstThird) }}</span>
      </div>
      <div class="time">
        <p>Tahajud 3/3</p>
        <span>{{ convertTo12HourClock(lastThird) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-image: url('../assets/Designer.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  height: 100vh;
}

.prayer-times {
  &__horizontal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }

  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    font-weight: bold;
  }
}

.center-container {
  text-align: center;
}
</style>
