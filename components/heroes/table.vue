<script setup async lang="ts">
import type { IHero } from '~/types/heroes';
const emit = defineEmits(['toggleFormOrHeroes']);
const props = defineProps<{
  heroes: IHero[],
}>();

const headers = [
        {sortable:false,value:"img"},
        { title: "Name", sortable: true, value: "name" },
        { title: "Description", sortable: true, value: "description" },
        { title: "Type", sortable: true, value: "type" },
    ];

const search:Ref<string> = ref('');

const toggleFormOrHeroes = () => {
  emit('toggleFormOrHeroes');
};

const routeToHero = (event:Event,item: any) => {
  const name:string = item.item.name;
  navigateTo(`/hero/${name}`);
};

</script>

<template>
    <section>
        <div class="d-flex align-top justify-self">
            <v-btn @click="toggleFormOrHeroes"  class="text-white bg-secondary mr-5">Add Hero</v-btn>
            <v-text-field
                v-model="search"
                label="Search"
                append-inner-icon="mdi-magnify"
                class="w-50 rounded-lg"
            ></v-text-field>
        </div>
        <v-data-table
            :search="search"
            :items-per-page="5"
            :items="props.heroes"
            @click:row="routeToHero"
            class="elevation-1 rounded-lg w-auto"
            :headers="headers"
            header-width="auto"
        >
        <template #item.img="{ item }">
          <img width="50" height="50" :src="`data:image/jpeg;base64,${item.img.data}`" alt="Hero Picture" class="table-image mt-2 rounded-circle" />
        </template>
        </v-data-table> 
    </section>
</template>

<style scoped>
</style>