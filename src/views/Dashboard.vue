<template>
  <div class="home">
    <bookmark-collection name="Sean collection" :bookmarks="bookmarks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookmarkCollection from "@/components/BookmarkCollection.vue"; // @ is an alias to /src

@Component({
  components: {
    BookmarkCollection,
  },
})
export default class Dashboard extends Vue {
  data() {
    return { bookmarks: [{ name: "Sean", href: "https://google.com" }] };
  }
}
</script>
