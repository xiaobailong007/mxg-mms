<template>
  <div class="main">
    <app-link v-show="$route.path !=='/home'" separator="/"></app-link>
    <router-view></router-view>
  </div>
</template>
<script>
import AppLink from './Link'
export default {
  components: {
    AppLink
  }
}
</script>