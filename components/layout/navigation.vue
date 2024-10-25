<script setup async lang="ts">
import { inject } from 'vue';

const drawer = inject('drawer', ref(true)) as Ref<boolean>;
</script>

<template>
    <v-navigation-drawer class="bg-backgroundLight" v-model="drawer">
        <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
</style>