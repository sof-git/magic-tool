import { useNuxtApp } from '#app';
import { useAuthStore } from '~/stores/auth';
import { useAlert } from '@/composables/alert';  // Reuse alert logic
import type { ICredentials } from '@/types/user';

export function useSubmitCredentials() {
  const { $authSchema } = useNuxtApp();  // Get schema validator
  const authStore = useAuthStore();      // Pinia auth store
  const { alertContent, showAlert } = useAlert();  // Alert composable

  const submitCredentials = async (credentials: ICredentials) => {
    const { error } = $authSchema.validate(credentials, { abortEarly: false });
    if (error) {
      showAlert(error.message, 'error');
      return;
    }

    try {
      const response = await authStore.login(credentials);
      showAlert(response.message, 'success');
    } catch (error: any) {
      showAlert(error.message, 'error');
    }
  };

  return {
    submitCredentials,  // Expose the function
    alertContent,       // Expose alert content for UI binding
  };
}