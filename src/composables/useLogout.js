import { ref } from '@vue/reactivity';
import { projectAuth } from '../firebase/config';
const error = ref(null);

const logout = async (email, password) => {
  error.value = null;

  try {
    const res = await projectAuth.signOut();

    if (res) throw new Error('Couldn`t logout');

    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = 'Something went wrong';
  }
};

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
