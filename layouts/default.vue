<script setup async lang="ts">
import { ref, provide } from 'vue';
import appBar from '~/components/layout/appBar.vue'
import navigation from '~/components/layout/navigation.vue'

const drawer:Ref<boolean> = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

provide('drawer', drawer);
provide('toggleDrawer', toggleDrawer);
</script>

<template>
    <v-layout class="rounded rounded-md">
      <navigation/>
  
      <appBar/>
  
      <v-main  style="min-height: 300px;">
        <NuxtPage />
      </v-main>
    </v-layout>
  </template>