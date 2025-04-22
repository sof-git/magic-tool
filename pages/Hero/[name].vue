<script setup lang="ts">
import { onMounted } from 'vue';
import { useHeroesStore } from '~/stores/heroes';
import heroForm from '~/components/heroes/heroForm.vue';
import type { IHero } from '~/types/heroes';
const route = useRoute();
const heroesStore = useHeroesStore();

const toggleForm = ref(false);



const name = Array.isArray(route.params.name) ? route.params.name[0] : route.params.name;
const hero:Ref<IHero> = ref({} as IHero);
onMounted(async () => {
  hero.value = await heroesStore.getHeroByName(name) as IHero;
});

</script>
<template>
  <div>
    <v-container>
      <v-row v-if="!toggleForm">
        <v-col cols="12" lg="4" offset-lg="4">
          <v-card  v-if="hero && hero.img">
            <v-btn icon @click="toggleForm = !toggleForm">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-img
              :src="hero.img?.data ? `data:image/png;base64,${hero.img.data}` : hero.img?.url"
              height="300"
              class="d-flex align-center justify-center rounded-circle"
            ></v-img>
            <v-card-title class="text-h3 text-primary text-center">
              {{ route.params.name }}
            </v-card-title>
            <v-card-subtitle class="text-h5 text-secondary font-weight-bold">
              Description
            </v-card-subtitle>
            <v-card-text class="border-md ma-4 ml-5 mt-0 rounded-lg border-background">
              {{ hero.description }}
            </v-card-text>
            <v-card-subtitle class="text-h5 text-secondary font-weight-bold">
              Abilities
            </v-card-subtitle>
            <v-card-text class="pl-5">
              <p class="text-h6 text-black font-weight-bold">Active skill</p>
              <p class="text-subtitle-1">{{hero.activeSpell?.name}}</p>
            </v-card-text>
            <v-card-text class="pl-5">
              <p class="text-h6 text-black font-weight-bold">Passive skill</p>
              <p class="text-subtitle-1">{{hero.passiveSpell?.name}}</p>
              <p class="text-subtitle-2 pl-5">- {{hero.passiveSpell?.description}}</p>
            </v-card-text>
          </v-card>
        </v-col>  
      </v-row>
      <v-row v-else>
        <v-col cols="12" lg="4" offset-lg="4">
          <heroForm @toggleFormOrHeroes="toggleForm = !toggleForm" :hero="hero" :method="'PUT'"/>
        </v-col>
      </v-row>
    </v-container>
  </div>    
</template>

<style scoped>
</style>
