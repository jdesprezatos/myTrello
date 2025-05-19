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
        isTableVisible : true
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
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.one-icon-button-div {
    display: flex;
    // border: 1px solid red;
    // border: 1px solid black;

    right: 0px;
    top: 0px;
}

.one-icon-button-div button {
    cursor: pointer;

    margin: 0;
    padding: 0;

    border: 0;
    background-color:transparent;

    // border: 1px solid orange;

    box-sizing: border-box;

    height: 30px;
    width: 30px;
    
    display: flex;
    justify-content: center;
    align-items: center;  
}

.one-icon-button-div button div {
    // display: flex;

    // /* align-items: flex-start; */
    // /* justify-content: right; */
    // align-self: flex-start;
    // box-sizing: border-box;

    // border: 1px solid green;



    background-color: #f5fafe;
    border: 2px solid rgb(175, 190, 200);
    border-radius: 6px;

    display: flex;
    justify-content: center;
    align-items: center;  

    height: 100%;
    width: 100%;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* height: 30px; */

    // cursor: pointer;
}

.one-icon-button-div button span.board-option-dot {
    display: flex;

    align-items: center;
    justify-content: center;

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    /* border: 1px solid green; */

    line-height: 0;
    margin-top: -18px;
    letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    font-size: 9em;
    color: rgb(110, 131, 146);

    font-size: 30px;
}

.one-icon-button-div button span.board-close-x {
    display: flex;

    align-items: center;
    justify-content: center;

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid green;

    line-height: 0;
    margin-top: 9px;
    letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    font-size: 9em;
    color: rgb(110, 131, 146);

    font-size: 30px;

    width: 70px;
}

.one-icon-button-div button span.board-close-x-inner {
    
    display: flex;

    justify-content: center;
    align-items: center;  

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid blue;

    margin: 0px;
    padding:0px;

    // line-height: 0;
    margin-top: -7px;
    // letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    color: rgb(110, 131, 146);

    font-size: 30px;
    width: 70px;
}

.one-icon-button-div button span.board-add-plus {
    
    display: flex;

    justify-content: center;
    align-items: center;  

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid blue;

    margin: 0px;
    padding:0px;

    // line-height: 0;
    margin-top: -7px;
    // letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    color: rgb(110, 131, 146);

    font-size: 30px;
    width: 70px;
}

// .one-icon-button-div button div span.board-add-plus::after {
//     //content: '+';
//     // content: '\002B';
//     font-family: 'Leelawadee UI';
//     font-size: 30px;
//     color: black;
// }



.one-icon-button-div-other {
    display: flex;
    // border: 1px solid red;

    right: 0px;
    top: 0px;

    margin: 3px;
}


.one-icon-button-div-other button {
    border: 0;
    background-color:transparent;

    background-color: #f5fafe;
    border: 2px solid rgb(175, 190, 200);
    border-radius: 6px;

    display: flex;
    justify-content: center;
    align-items: center;  

    cursor: pointer;
}

.one-icon-button-div-other button span.board-add-plus {
    
    display: flex;

    justify-content: center;
    align-items: center;  

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid blue;

    margin: 0px;
    padding:0px;

    // line-height: 0;
    margin-top: -7px;
    // letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    color: rgb(110, 131, 146);

    font-size: 30px;
}

</style>
