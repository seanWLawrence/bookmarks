<template>
  <div class="bookmark-collection">
    <h2>{{ name }}</h2>

    <ul class="bookamrk-collection__bookmarks">
      <li
        class="bookmark-collection__bookmark"
        v-for="bookmark in bookmarks"
        :key="bookmark.name"
      >
        <Bookmark :name="bookmark.name" :href="bookmark.href" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Bookmark from "@/components/Bookmark.vue";

@Component({ components: { Bookmark } })
export default class BookmarkCollection extends Vue {
  @Prop() name!: string;
  @Prop() bookmarks!: Bookmark[];
}
</script>

<style lang="sass" scoped>
.bookmark-collection__bookmarks
</style>
