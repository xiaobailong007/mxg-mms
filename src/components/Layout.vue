<template>
  <div>
    <app-header></app-header>
    <app-main></app-main>
    <app-navbar></app-navbar>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppNavbar from './AppNavbar'
export default {
  components: {
    AppHeader,
    AppMain,
    AppNavbar
  }

}
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  background-color: #2d3a4b;
  top: 0%;
  left: 0;
  right: 0;
}
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow: auto;
  background-color: #545c64;
}
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  padding: 10px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>