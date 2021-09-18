<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="cover image" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button @click="deletePlaylist" v-if="ownership">Delete playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet
      </div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button @click="() => deleteSong(song.id)" v-if="ownership">
          Delete
        </button>
      </div>
      <AddSond :playlist="playlist" v-if="ownership" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocuments from "@/composables/useDocuments";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getUser";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import AddSond from "@/components/AddSong.vue";

export default {
  props: ["id"],
  components: { AddSond },
  setup(props) {
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { deleteDoc, updateDoc } = useDocuments("playlists", props.id);
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId
      );
    });

    const deletePlaylist = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    const deleteSong = async (id) => {
      const newSongsList = playlist.value.songs.filter(
        (song) => song.id !== id
      );
      const res = await updateDoc({ songs: newSongsList });
    };

    return { playlist, error, ownership, deletePlaylist, deleteSong };
  },
};
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>