<script setup async lang="ts">
import type { IHero } from '~/types/heroes';
const props = defineProps<{
  hero: IHero,
}>();
const hero:IHero = props.hero;


</script>

<template>
    <v-card>
        <v-card-title class="text-h3 text-primary">
            {{ hero.name }}
        </v-card-title>
    </v-card>
</template>

<style scoped>
</style>