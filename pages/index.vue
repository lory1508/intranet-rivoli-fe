<template>
  <div class="flex flex-col w-full gap-2">
    <h1 class="pb-6 text-3xl font-bold text-primary">{{ homeStaticData.title }}</h1>

    <div class="flex flex-row w-full gap-4">
      <div class="flex flex-col w-full gap-4">
        <!-- Rubrica -->
        <RubricaCard :title="homeStaticData.rubrica.title" :icon="homeStaticData.rubrica.icon" />

        <!-- Strumenti personali -->
        <PersonalTools :title="homeStaticData.personalTools.title" :icon="homeStaticData.personalTools.icon" />

        <!-- Link utili generali -->
        <UsefulLinks :title="homeStaticData.usefulLinks.title" :icon="homeStaticData.usefulLinks.icon" />
      </div>

      <div class="flex flex-col w-full gap-4">
        <!-- Comunicazioni di servizio -->
        <AlertCard :title="homeStaticData.alerts.title" :icon="homeStaticData.alerts.icon" />

        <!-- Bacheca dipendenti -->
        <EmployeesBoard :title="homeStaticData.employeesBoard.title" :icon="homeStaticData.employeesBoard.icon" />

        <!-- Link utili edilizia -->
        <UsefulLinks :title="homeStaticData.edilizia.title" :icon="homeStaticData.edilizia.icon" />
      </div>
    </div>

    <NDivider />

    <!-- News -->
    <LatestNews :title="homeStaticData.news.title" :icon="homeStaticData.news.icon" />
  </div>
</template>

<script setup>
  import AlertCard from '~/components/home/AlertCard.vue'
  import RubricaCard from '~/components/home/RubricaCard.vue'
  import EmployeesBoard from '~/components/home/EmployeesBoard.vue'
  import UsefulLinks from '~/components/home/UsefulLinks.vue'
  import LatestNews from '~/components/home/LatestNews.vue'
  import PersonalTools from '~/components/home/PersonalTools.vue'

  import { homeStaticData } from '~/utils/staticData/home'
</script>
