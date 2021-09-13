import { ref } from '@vue/reactivity';
import { projectAuth } from '../firebase/config';
const error = ref(null);
const isPending = ref(false);

const logout = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.signOut();

    if (res) throw new Error('Couldn`t logout');

    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = 'Something went wrong';
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
