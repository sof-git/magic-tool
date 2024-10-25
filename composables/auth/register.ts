import { useNuxtApp } from "#app";
import { useUsersStore } from "~/stores/user";
import { useAlert } from "@/composables/alert";
import type { IUserParams,INewUser } from "@/types/user";

export function useRegisterUser() {
    const { $registerSchema } = useNuxtApp();
    const usersStore = useUsersStore();
    const {alertContent, showAlert} = useAlert();
    const errors: Record<string, string> = reactive({});

    const submitUser = async(user: IUserParams) => {

        //clear previous errors 
        Object.keys(errors).forEach(key => (errors[key] = ''));

        const {error} = $registerSchema.validate(user, {abortEarly: false});
        if (error) {
            error.details.forEach(detail => {
                // TypeScript now understands this correctly
                errors[detail.context?.key || ''] = detail.message; 
            });
            showAlert("Please fix the errors in the form", "error");
            return;
        }

        try {
            const newUser:INewUser = {
                username: user.username,
                email: user.email,
                role: user.role,
                password: user.password
            };
            const response = await usersStore.createUser(newUser);
            if(response.statusCode === 201) {
                showAlert('User created successfully', 'success');
            }
        } catch(error: any) {
            console.log(error.message);
            showAlert(error.message, 'error');
        }
    }
    return {
        submitUser,
        alertContent,
        errors
    };
}