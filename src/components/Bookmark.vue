<template>
  <a
    class="bookmark"
    :href="href"
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    {{ name }}
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Bookmark extends Vue {
  @Prop() href!: string;
  @Prop() name!: string;
}
</script>

<style lang="sass" scoped>
.bookmark
  color: cornflowerblue
</style>
