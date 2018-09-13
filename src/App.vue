<template>
  <div id="app">
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>  
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/> -->
    <router-view/>
    <popup :show="$store.state.isShow"></popup>
  </div>
</template>

<script>
import popup from "comm/popup.vue";
export default {
  name: 'App',
   components: {
       popup
   }
}
</script>

<style>
</style>
