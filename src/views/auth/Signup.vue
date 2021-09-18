<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign in</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup.js";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);

      if (!error.value) router.push("/");
    };
    return { displayName, email, password, error, handleSubmit, isPending };
  },
};
</script>

<style>
</style>