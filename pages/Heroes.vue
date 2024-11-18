<script setup async lang="ts">
import { onMounted } from 'vue';
import { useHeroesStore } from '~/stores/heroes';
import Table from '@/components/heroes/table.vue';
import HeroForm from '@/components/heroes/heroForm.vue';
const heroesStore = useHeroesStore()
// Fetch heroes data on page load using onMounted
onMounted(async () => {
  await heroesStore.fetchHeroes();
});
const tableOrForm = ref(false);

const toggleTableOrForm = () => {
    tableOrForm.value = !tableOrForm.value;
}

</script>

<template>
<v-container>
    <v-row v-if="!tableOrForm">
        <v-col cols="12">
            <Table :heroes="heroesStore.heroes" @toggleFormOrHeroes="toggleTableOrForm" />
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12" md="6" lg="4">
            <HeroForm  @toggleFormOrHeroes="toggleTableOrForm" />
        </v-col>    
    </v-row>
</v-container>
</template>

<style scoped>
</style>