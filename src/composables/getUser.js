import { ref } from '@vue/reactivity';
import { projectAuth } from '../firebase/config';

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((_user) => {
  console.log('User state changes. Current user is: ', _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
