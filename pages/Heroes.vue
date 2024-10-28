<script setup async lang="ts">
import { onMounted } from 'vue';
import { useHeroesStore } from '~/stores/heroes';
import Table from '@/components/heroes/table.vue';

const heroesStore = useHeroesStore()
// Fetch heroes data on page load
onMounted(async () => {
  console.log('fetching heroes');
  await heroesStore.fetchHeroes();
  console.log("after fetch ",heroesStore.heroes);
});
provide('heroesStore', heroesStore);


// Provide the heroes store to child components

</script>

<template>
<v-container class="mx-10">
    <v-row>
        <v-col>
            <Table :heroes="heroesStore.heroes" />
        </v-col>
    </v-row>
</v-container>
</template>

<style scoped>
</style>