<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="ninja img" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninja</router-link></h1>
      <div class="links">
        <button v-if="!isPending" @click="handleLogout">Logout</button>
        <button v-if="isPending" disabled>Logging out...</button>
        <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { logout, isPending } = useLogout();
    const router = useRouter();
    const handleLogout = async () => {
      await logout();
      router.push("/login");
    };

    return { isPending, handleLogout };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>