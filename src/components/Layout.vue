<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link
          v-for="link in navigationLinks"
          :key="link.name"
          :to="link.to"
          class="navigation-link"
        >
          <v-list-item link>
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Bookmarks</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    navigationLinks: [
      { name: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
      { name: 'Settings', to: '/settings', icon: 'mdi-cog' },
    ],
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style lang="sass" scoped>
.navigation-link
    text-decoration: none
</style>
