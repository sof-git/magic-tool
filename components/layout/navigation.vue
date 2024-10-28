<script setup async lang="ts">
import { inject } from 'vue';

const drawer = inject('drawer', ref(true)) as Ref<boolean>;

const items = ref([
    { title: 'Magic Tool', icon: 'mdi-view-dashboard', to: '/' },
    { title: 'Heroes', icon: 'mdi-account', to: '/heroes' },
])
</script>

<template>
    <v-navigation-drawer class="bg-backgroundLight" v-model="drawer">
        <v-list>
            <v-list-item-group>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
</style>