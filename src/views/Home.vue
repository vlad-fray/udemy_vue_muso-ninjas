<template>
  <div class="home">
    <p>Homepage</p>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">
        <ListView :playlists="{ doc }" />
      </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";
export default {
  name: "Home",
  components: { ListView },
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
