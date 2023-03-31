import { toast } from 'react-hot-toast';

function toastPromise(promise, notifications) {
  toast.promise(
    promise,
    {
      loading: notifications.loading,
      success: notifications.success,
      error: (error) => error.response.data.message || '',
    },
    {
      style: {
        right: '0px',
        minWidth: '300px',
        fontSize: '20px',
        fontWeight: '500',
        zIndex: '9999',
      },
    }
  );
}

export { toastPromise };
