<template>
  <div id="app">
    <div id="ccp-background-div" v-if="cardCreationMode.isActive" >

    </div>
     <!-- <div>
        <CreateCardPanel @create-new-cart-event="onCreateCardEventHandler"></CreateCardPanel>
     </div> -->

    <div class="create-card-panel-div">
        <CreateCardPanel v-if="cardCreationMode.isActive"
        @create-new-cart-event="onCreateCardEventHandler"
        :boardId="cardCreationMode.boardId"
        @cancel-create-card="onCancelCreateCard"></CreateCardPanel>
    </div>

    <CreateTagView v-if="false"></CreateTagView>

     <div class="blur">
        <div>
            <button @click="onDisplayTable"><span v-if="!isTableVisible">DISPLAY</span><span v-if="isTableVisible">HIDE</span></button>
            <BoardView v-if="isTableVisible" @new-card-event="onNewCardEventHandler"></BoardView>
        </div>
        <div>
            <CardView></CardView>
        </div>
        <div>
            <CardViewT></CardViewT>
        </div>
     </div>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import BoardView from './components/BoardView.vue'
import CardView from './components/CardView.vue'
import CardViewT from './components/test/CardViewTest.vue'
import CreateCardPanel from './components/CreateCardPanel.vue'
import CreateTagView from './components/CreateTagView.vue'


export default {
  name: 'App',
  components: {
    BoardView, CardView, CardViewT, CreateCardPanel, CreateTagView
  },
  data : function() {
    return {
        isTableVisible : true,
                cardCreationMode : {
                    isActive : false,
                    boardId : -1
                }
    }
  },
  methods : {
    onDisplayTable : function() {
        console.log('onDisplayTable  ' + this.isTableVisible);
        this.isTableVisible = !this.isTableVisible
    },

                onNewCardEventHandler : function(data) {
                this.cardCreationMode.boardId = data.boardId;
                this.cardCreationMode.isActive = true;

                
                this.$emit('new-card-event', {'boardId' : this.boardId});
            },

            onCancelCreateCard : function() {
                // console.log(data)
                this.cardCreationMode.isActive = false;
            },

    onCreateCardEventHandler : function(data) {
            console.log ('onCreateCardEventHandler : ' + data)

                let boardId = data.boardId;
                let newCardName = data.name;
                let cardDescription = data.description;
                let cardTags = data.tags;

                let board = this.getBoardById(boardId);

                console.log(board);

                if (board) {
                    board.cards.push({
                        'id' : ++this.lastCardId,
                            'title' : newCardName,
                            'smallDescription' : cardDescription,
                            'tags' : cardTags
                    })
                }

                this.cardCreationMode.isActive = false;
            },
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

.create-card-panel-div {
    display: flex;

    justify-content: center;
}

#ccp-background-div {
    position: absolute;
    top: 0px;
    left: 0px;

    overflow: hidden;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
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

    height: 33px;
    width: 33px;
    
    display: flex;
    justify-content: center;
    align-items: center;  
}

//.one-icon-button-div button 
.one-icon-button-border-div {
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
    flex-direction: row;
    justify-content: center;
    align-items: center;  

    height: 100%;
    width: 100%;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* height: 30px; */

    // cursor: pointer;
    color: #6e8392;
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

.one-icon-button-div button span.board-x {
    display: flex;

    align-items: center;
    justify-content: center;

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid green;

    line-height: 0;
    // margin-top: 9px;
    letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    font-size: 9em;
    color: #6e8392;

    font-size: 30px;

    width: 30px;
}

.one-icon-button-div button span.board-x-inner {
    
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

.one-icon-button-div button span.board-plus {
    
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
    // margin-top: -7px;
    // letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    color: rgb(110, 131, 146);

    margin-top: -6px;
    font-size: 30px;
    line-height: 18px
}

.one-icon-button-div button span.board-plus-empty {
    
    display: flex;

    justify-content: center;
    align-items: center;  

    align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid green;

    margin: 0px;
    padding:0px;

    // line-height: 0;
    // margin-top: -7px;
    // letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    color: rgb(110, 131, 146);

    // margin-top: -15px;
    font-size: 30px;
}

div.board-plus-empty {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    // justify-content: center;
    // align-items: center;  

    // align-self: center;

    /* height: 9px; */

    box-sizing: border-box;
    // border: 1px solid blue;

    margin: 0px;
    padding:0px;

    // line-height: 0;
    // margin-top: -7px;
    // letter-spacing: 1px;

    font-family: 'Leelawadee UI';
    font-weight: bold;
    color: rgb(110, 131, 146);


    width: fit-content;
    // height: 100%;
    // margin-top: -300%;
    font-size: 30px;
}


.one-icon-button-div button span.board-plus::before {
    content: '\FF0B';
}

// .one-icon-button-div button div span.board-plus::after {
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

.one-icon-button-div-other button span.board-plus {
    
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



.border-red {
    border: 1px solid red;
}

.flex-h-center {
    align-items: center;
}

</style>
