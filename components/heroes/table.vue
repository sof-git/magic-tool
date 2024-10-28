<script setup async lang="ts">

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

</script>

<template>
    <section>
        <v-text-field
            v-model="search"
            label="Search"
            append-inner-icon="mdi-magnify"
            class="w-25 rounded-lg"
        ></v-text-field>
        <v-data-table
            :search="search"
            :items-per-page="5"
            class="elevation-1 rounded-lg w-50"
            :headers="headers"
            :items="props.heroes"
        >
        </v-data-table> 
    </section>
</template>

<style scoped>
</style>