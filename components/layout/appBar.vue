<script setup async lang="ts">
import { useAuthStore } from '~/stores/auth';
import { inject } from 'vue';
const { logout } = useAuthStore();
const toggleDrawer = inject('toggleDrawer') as () => void;
</script>

<template>
    <v-app-bar app color="background" dark>
        <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="toggleDrawer" />
        <v-toolbar-title>Magic Tool</v-toolbar-title>
        <v-btn @click="logout">logout</v-btn>
    </v-app-bar>
</template>

<style scoped>
</style>