/**
 * Hero composable
 * 
 * @description This composable contains logic for managing heroes.
 * @method createHero - Validate and create a new hero and use the store to send the request to the server.
 * @method updateHero - Validate and update a hero and use the store to send the request to the server.
 */
import { useNuxtApp } from '#app';
import type { INewHero } from "@/types/heroes";
import { useAlert } from "@/composables/alert";
import { useHeroesStore } from "@/stores/heroes";

export const useHero = () => {

    const {alertContent, showAlert} = useAlert();
    const heroesStore = useHeroesStore();
    const errors:any = reactive({
        name: '',
        description: '',
        passiveSpell: {
            name: '',
            description: '',
            type: '',
            target: '',
            duration: '',
            effect: '',
            value: '',
        },
        activeSpell: {
            name: '',
            description: '',
            type: '',
            target: '',
            duration: '',
            effect: '',
            value: '',
        },
    });
    const { $heroSchema } = useNuxtApp();  // Get schema validator
    const setNestedError = (path: string, message: string):void => {
        const keys = path.split('.');
        let current = errors;
    
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (i === keys.length - 1) {
                current[key] = message;
            } else {
                if (!current[key]) current[key] = {}; // Ensure intermediate keys are objects
                current = current[key];
            }
        }
    }
    const submitHero = async (hero: INewHero, file: File | null) => {
        // Clear previous errors
        Object.keys(errors).forEach(key => (errors[key] = ''));
    
        // Validate the hero object
        const { error } = $heroSchema.validate(hero, { abortEarly: false });
        if (error) {
            error.details.forEach(detail => {
                const errorPath = detail.path.join('.'); // Construct the path as a string
                setNestedError(errorPath, detail.message);
            });
            showAlert("Please fix the errors in the form", "error");
            return;
        }
    
        // Create FormData to hold both the hero data and the image file
        const formData = new FormData();
        if(file) {
            formData.append('file', file); // Attach the file
        }
        formData.append('hero', JSON.stringify(hero)); // Attach hero as a JSON string
    
        try {
            const response = await heroesStore.createHero(formData);
            if (response.statusCode === 201) {
                showAlert('Hero created successfully', 'success');
            } else {
                showAlert('Error creating hero', 'error');
            }
        } catch (error: any) {
            showAlert(error.message, 'error');
        }
    };
    const handleFile = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };
    
    return {
        submitHero,
        alertContent,
        errors,
        handleFile,
    }
};

