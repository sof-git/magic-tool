import { useNuxtApp } from '#app';
import { useAuthStore } from '~/stores/auth';
import { useAlert } from '@/composables/alert';  // Reuse alert logic
import type { ICredentials } from '@/types/user';

export function useSubmitCredentials() {
  const { $authSchema } = useNuxtApp();  // Get schema validator
  const authStore = useAuthStore();      // Pinia auth store
  const { alertContent, showAlert } = useAlert();  // Alert composable
  const errors: Record<string, string> = reactive({});


  const submitCredentials = async (credentials: ICredentials) => {
    
    //clear previous errors 
    Object.keys(errors).forEach(key => (errors[key] = ''));

    const { error } = $authSchema.validate(credentials, { abortEarly: false });
    if (error) {
      error.details.forEach(detail => {
          // TypeScript now understands this correctly
          errors[detail.context?.key || ''] = detail.message; 
      });
      showAlert("Please fix the errors in the form", "error");
      return;
  }

    try {
      const response = await authStore.login(credentials);
      showAlert(response.message, 'success');
    } catch (error: any) {
      showAlert(error.message, 'error');
    }
  };

  const logout = () => {
    authStore.logout();
    showAlert('You have been logged out', 'info');
  }

  return {
    submitCredentials,  // Expose the function
    alertContent,       // Expose alert content for UI binding
    errors,             // Expose errors for UI binding
    logout,             // Expose errors for UI binding
  };
}