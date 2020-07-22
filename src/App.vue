<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-icon>group</v-icon>
      <v-toolbar-title>Сотрудники</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="redirect"><v-icon>home</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import('animate.css')
export default {
  created () {
    this.$store.dispatch('getWorkers')
    console.log('Информация выведена на экран!')
  },
  methods: {
    redirect () {
      this.$router.push('/')
    }
  }
}
</script>

<style scope lang="scss">
  $line: none;
  $color: white;
  .line {
    text-decoration: $line
  }
  .color {
    color: $color
  }
  @mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
  }
  .box { @include border-radius(10px); }
</style>
