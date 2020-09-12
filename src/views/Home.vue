<template>
  <div class="home">
    <BookmarkCollection name="Sean collection" :bookmarks="bookmarks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookmarkCollection from "@/components/BookmarkCollection.vue"; // @ is an alias to /src
import Bookmark from "@/components/Bookmark.vue";

@Component({
  components: {
    BookmarkCollection
  }
})
export default class Home extends Vue {
  data() {
    return { bookmarks: [{ name: "Sean", href: "https://google.com" }] };
  }
}
</script>
