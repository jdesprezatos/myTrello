<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <div>
        <button @click="onDisplayTable"><span v-if="!isTableVisible">DISPLAY</span><span v-if="isTableVisible">HIDE</span></button>
        <TableView v-if="isTableVisible"></TableView>
    </div>
     <div>
        <CardView></CardView>
     </div>
     <div>
        <CardViewT></CardViewT>
     </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TableView from './components/TableView.vue'
import CardView from './components/CardView.vue'
import CardViewT from './components/test/CardViewTest.vue'

export default {
  name: 'App',
  components: {
    TableView, CardView, CardViewT
  },
  data : function() {
    return {
        isTableVisible : false
    }
  },
  methods : {
    onDisplayTable : function() {
        console.log('onDisplayTable  ' + this.isTableVisible);
        this.isTableVisible = !this.isTableVisible
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
