<script setup async lang="ts">
const emit = defineEmits(['toggleFormOrHeroes']);
const props = defineProps({
  heroes: {
    type: Array,
    default: () => []
  }
});

const headers = [
        { title: "Name", sortable: true, value: "name" },
        { title: "Description", sortable: true, value: "description" },
        { title: "Type", sortable: true, value: "type" },
    ];

const search:Ref<string> = ref('');

const toggleFormOrHeroes = () => {
    console.log('toggleFormOrHeroes');
  emit('toggleFormOrHeroes');
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
            class="elevation-1 rounded-lg w-auto"
            :headers="headers"
            header-width="auto"
            :items="props.heroes"
        >
        </v-data-table> 
    </section>
</template>

<style scoped>
</style>