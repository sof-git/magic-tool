<script setup lang="ts">
const emit = defineEmits(['toggleFormOrHeroes']);
import { reactive } from "vue";
import alert from '@/components/common/alert.vue';
import { useHero } from "~/composables/heroes/index";
import type { INewHero } from "~/types/heroes";
import { spellsTypes, spellsTarget, spellsDuration, spellsEffect } from "~/types/spells.enum"; // Import your enums here
import type { IImage } from "~/types/images";
import { VNumberInput } from 'vuetify/labs/VNumberInput'

// Define heroParams with initial enum values
const heroParams: INewHero = reactive({
    name: '',
    description: '',
    img:{
        url: '',
        alt: 'Hero Image',
    },
    passiveSpell: {
        name: '',
        description: '',
        type: spellsTypes.DAMAGE,  // Initialize with a default enum value
        target: spellsTarget.SELF,
        duration: spellsDuration.INSTANT,
        effect: spellsEffect.POISON,
        value: 0,
    },
    activeSpell: {
        name: '',
        description: '',
        type: spellsTypes.DAMAGE,
        target: spellsTarget.SELF,
        duration: spellsDuration.INSTANT,
        effect: spellsEffect.POISON,
        value: 0,
    },
});

const { submitHero, alertContent, errors } = useHero();

const items = [
    {title: 'Hero Details', icon: 'mdi-account', step: 1,color: "red",errors: errors},
    {title: 'Passive Spell', icon: 'mdi-spellcheck', step: 2,errors: errors},
    {title: 'Active Spell', icon: 'mdi-spellcheck', step: 3,errors: errors},
];

const file = ref<File | null>(null);
// Set default image with a placeholder in public folder img folder defaultHeroImg.png
const img:IImage = reactive(
    {
        src:'img/defaultHeroImg.png',
        alt: 'Hero Image',
        file: null,
    }
);

const handleFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const onFileChange = async () => {
    if (file.value) {
        img.src = await handleFile(file.value);
        img.file = file.value;
    }
};

const closeForm = () => {
    emit('toggleFormOrHeroes');
};

</script>

<template>
    <section>
        <v-form @submit.prevent="submitHero(heroParams,img.file)">
        <v-stepper
            alt-labels
            :items="items"
            :class="errors.name ? 'error' : ''"
        >
        <template
            v-slot:item.1
        >   

        <v-text-field
        v-model="heroParams.name"
        label="Name"
        required
        :error="!!errors.name"
        :error-messages="errors.name"
        ></v-text-field>
        <v-textarea
        v-model="heroParams.description"
        label="Description"
        required
        :error="!!errors.description"
        :error-messages="errors.description"
        ></v-textarea>
        <v-img 
            :src="img.src as string"
            width="200"
            height="200"
            alt="Hero Image"
            aspect-ratio="1"
            class="mx-auto"
        ></v-img>
        <v-file-input
            v-model="file"
            label="Hero Image"
            accept="image/*"
            @change="onFileChange"
        ></v-file-input>
        </template>
        <template
            v-slot:item.2
        >
            <!-- Dropdowns for enum properties in passiveSpell -->
             <v-text-field
                v-model="heroParams.passiveSpell.name"
                label="Passive Spell Name"
                required
                :error="!!errors.passiveSpell.name"
                :error-messages="errors.passiveSpell.name"
            ></v-text-field>
            <v-textarea
                v-model="heroParams.passiveSpell.description"
                label="Passive Spell Description"
                required
                :error="!!errors.passiveSpell.description"
                :error-messages="errors.passiveSpell.description"
            ></v-textarea>
            <v-select
                v-model="heroParams.passiveSpell.type"
                :items="Object.values(spellsTypes)"
                label="Passive Spell Type"
                required
            ></v-select>
            <v-select
                v-model="heroParams.passiveSpell.target"
                :items="Object.values(spellsTarget)"
                label="Passive Spell Target"
                required
            ></v-select>
            <v-select
                v-model="heroParams.passiveSpell.duration"
                :items="Object.values(spellsDuration)"
                label="Passive Spell Duration"
                required
            ></v-select>
            <v-select
                v-model="heroParams.passiveSpell.effect"
                :items="Object.values(spellsEffect)"
                label="Passive Spell Effect"
                required
            ></v-select>
            <v-number-input
                :reverse="false"
                v-model="heroParams.passiveSpell.value"
                controlVariant="default"
                label=""
                :hideInput="false"
                :inset="false"
                variant="outlined"
                >
            </v-number-input>
        </template>
        <template
            v-slot:item.3
        >   
            <!-- Dropdowns for enum properties in activeSpell -->
            <v-text-field
                v-model="heroParams.activeSpell.name"
                label="Active Spell Name"
                required
                :error="!!errors.activeSpell.name"
                :error-messages="errors.activeSpell.name"
            ></v-text-field>
            <v-textarea
                v-model="heroParams.activeSpell.description"
                label="Active Spell Description"
                required
                :error="!!errors.activeSpell.description"
                :error-messages="errors.activeSpell.description"
            ></v-textarea>
            <v-select
                v-model="heroParams.activeSpell.type"
                :items="Object.values(spellsTypes)"
                label="Active Spell Type"
                required
            ></v-select>
            <v-select
                v-model="heroParams.activeSpell.target"
                :items="Object.values(spellsTarget)"
                label="Active Spell Target"
                required
            ></v-select>
            <v-select
                v-model="heroParams.activeSpell.duration"
                :items="Object.values(spellsDuration)"
                label="Active Spell Duration"
                required
            ></v-select>
            <v-select
                v-model="heroParams.activeSpell.effect"
                :items="Object.values(spellsEffect)"
                label="Active Spell Effect"
                required
            ></v-select>
            <v-number-input
                :reverse="false"
                v-model="heroParams.activeSpell.value"
                controlVariant="default"
                label=""
                :hideInput="false"
                :inset="false"
                variant="outlined"
                >
            </v-number-input>
        </template>
        </v-stepper>
        <div class="d-flex justify-space-evenly">
            <v-btn @click="closeForm" class="my-5" color="white">Cancel</v-btn>
            <v-btn class="my-5" type="submit" color="primary">Submit</v-btn>    
        </div>
        </v-form>
        <alert :show="alertContent.show" :message="alertContent.message" :type="alertContent.type" />
    </section>
</template>

<style scoped>
</style>