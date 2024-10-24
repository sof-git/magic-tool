import { reactive } from 'vue'

export function useAlert() {
  const alertContent = reactive({
    message: '',
    type: <'success' | 'info' | 'warning' | 'error' | undefined>(undefined),
    show: false,
  });

  const showAlert = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    alertContent.message = message;
    alertContent.type = type;
    alertContent.show = true;
  };

  const hideAlert = () => {
    alertContent.show = false;
  };

  return {
    alertContent,
    showAlert,
    hideAlert,
  };
}
