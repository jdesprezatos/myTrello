<template>
    <div id="board-main-div">
    <!-- <div> -->
        <div class="board-item">
            <div class="board-header">
                <div class="board-title">
                    <span v-if="!doEditName">{{boardTitle}}</span>
                    <!-- <input v-if="doEditName" id="board-input-name" v-model="boardName" @focusout="onNameChanged"> -->


                    <!-- <form v-if="doEditName" @submit.prevent="onNameChanged">
                        <input id="board-input-name" ref="board-input-name" @focusout="onNameChanged" v-model="boardName" >
                    </form> -->


                    <input v-if="doEditName" id="board-input-name" ref="board-input-name" @focusout="onNameChanged" @keyup.enter="onNameChanged" v-model.trim="boardName" >

                </div>
                <!-- <div class="board-header-param"><span>&#10242;&#10242;&#10242;</span></div>   -->
                 <div v-if="displayOptions" class="board-header-param">
                    <button><div><span class="board-option-dot">...</span></div></button>
                </div>
                 <!-- <div class="board-header-param">
                    <button @click="onDeleteBoard">
                        <div>
                            <span class="board-x">&#xD7;</span>
                        </div>
                    </button>
                </div> -->

                <div class="one-icon-button-div">
                    <button @click="onDeleteBoard">
                        <!-- <div> -->
                            <span class="board-x-inner">&#xD7;</span> 
                        <!-- </div> -->
                    </button>
                </div>
            </div>
            <div id="board-content-id" class="board-content drop-board" ref="contentDiv"
                @drop.prevent="onDrop"
                @dragover.prevent>   
                <!-- <CardView></CardView>  -->

                <!-- <div class="content-centered-div"> -->
                    <!-- <CardView v-for="card in cards" v-bind:key="card.id" 
                        :cardId="card.id"
                        :title="card.title"
                        :tags="card.tags"
                        :small-description="card.smallDescription"></CardView> -->
                    <CardView v-for="card in cards" v-bind:key="card.id" 
                        :cardId="card.id"
                        :title="card.title"
                        :small-description="card.smallDescription"></CardView>

                        <!-- <div class="alacon" style="background-color: brown; width: 100px; height: 100px; border: 1px solid black;"></div>
                        <div class="alacon" style="background-color: brown; width: 100px; height: 100px; border: 1px solid black;"></div> -->


                <!-- </div> -->
            </div>
            <div class="board-add-card">   
                <button @click="addCard()"> + Add new card</button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import CardView from './CardView.vue'

export default {
    name:'BoardItem',
    components: {
        CardView
    },
    data: function() {
        return {
            displayOptions : false,
            boardName : '',
            // doEditName : true,
        }
    },
    props : {
        boardTitle : {
            type: String,
            default : 'TITLE',
        },
        boardId : {
            type: Number,
            default : -1,
        },
        // cards : {
        //     type : Array,
        //     default : () => [
        //         {
        //         id : 0,
        //         tags : [
        //             {
        //                 name : 'tag 1',
        //                 color: '#dfe2a0'
        //             },
        //         {
        //             name : 'tag 2',
        //             color : '#ffa3f9'
        //         }],
        //         title : 'Card Title 1',
        //         smallDescription : 'A small description for the card 1'
        //     },
        //     {
        //         id : 1,
        //         tags : [],
        //         title : 'Card Title 2',
        //         smallDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare semper elit eu dictum. Aliquam id blandit lacus.'
        //     }]
        // },


        // doEditName : {
        //     type : Boolean,
        //     default : false
        // }
    },
    computed : {
        ...mapGetters[{
            // getCardsByBoardId : 'getCardsByBoardId',
            getCardsForBoard : 'getCardsForBoard'
        }],
        doEditName() {
            return this.boardTitle === '';
        },
        cards : function() {
           
            // console.log('############################################')
            // const cards = this.$store.getters.getCardsForBoard(this.boardId);
            // console.log(cards)
            // console.log('############################################')
            return this.$store.getters.getCardsForBoard(this.boardId);
        }
    },
    methods : {
        addCard : function () {
            // // console.log(this.$el);
            // const content = this.$refs.contentDiv;
            // console.log(content); // C'est un élément DOM
            // // Tu peux faire ce que tu veux avec, par exemple :
            // content.innerHTML = ;
            this.$emit('new-card-event', {'boardId' : this.boardId});
        },
        onDrop : function (event) {
            console.log(event)
            console.log('id = ' + event.target.id)

            const cardId = event.dataTransfer.getData('cardId');
            console.log (this.boardTitle);

            
            console.log(this.$store.getters.getAvailableTagsForCardId(cardId))

            //this.$emit('onCardDropped', {'cardId' : cardId, 'targetBoard' : this.boardTitle});
            // this.$emit('onCardDropped', {'cardId' : cardId, 'boardId' : this.boardId});
            this.$store.dispatch('moveCardToBoard', {
                'boardIdSrc' : undefined,
                'boardIdDest' : this.boardId,
                'cardId' : cardId
            })
        },
        onDeleteBoard : function () {
            console.log('onDeleteBoard')
            this.$emit('delete-board-event', {'boardId' : this.boardId})
        },
        onNameChanged : function(e) {
            //this.doEditName = false;
            console.log('onNameChanged ' + this.boardName);
            console.log(e);
            // this.$emit('name-changed-event', {
            //     'boardId' : this.boardId,
            //     'newName' : this.boardName
            // });

            this.$store.dispatch('renameBoard', {
                boardId : this.boardId,
                newBoardName : this.boardName
            })
        },
        enableEdit() {
            this.doEditName = true;
            this.$nextTick(() => {
                this.$refs['board-input-name']?.focus();
            });
        },
    },
    mounted : function() {
        // console.log('mounted this.doEditName = ' + this.doEditName)
        if (this.doEditName) {
            this.$refs['board-input-name'].focus();
            // document.getElementById('board-input-name').focus();
        }
    }
}
</script>

<style lang="scss">

#board-main-div {
    width: 100%;    
    margin: 6px;

    display: flex;

    /* DEBUG */
    /* border: 1px solid blue; */
    /* END DEBUG */
}

.board-item {
    background-color: #e3f0fa;
    border: 2px solid rgb(175, 190, 200);
    /* border: 2px solid black; */
    border-radius: 9px;

    /* margin: 3px; */

    width: 100%;

    box-sizing: border-box;

    /* text-align: center; */
    /* align-items: center; */
    /* justify-content: center; */

    
    flex-direction: column;

    min-height: 180px;

    display: flex;
    /* grid-template-rows: auto 1fr auto; */

}

.board-header {
    display: flex;
    flex-direction: row;
    /* border: 1px solid purple; */
}

.board-title {
    border: 1px solid green;

    /* background-color: #a6acee;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px; */
    /* border-bottom: 2px solid green; */

    padding: 6px;
    text-align: center;
    text-align: left;
    font-weight: bold;

    flex-grow: 1;

    font-size: 17px;
    
    font-family: 'Leelawadee UI';
    /* font-family: 'Comic sans ms'; */
}

#board-input-name {
    /* background-color: #ffffff; */
    /* border: 2px solid rgb(175, 190, 200); */
    border-radius: 3px;

    height: auto;


    background-color: transparent;
    border: none;
    
    outline: none;

    width: 100%;
    box-sizing: border-box;

    font-weight: bold;
    font-style: italic;
    font-size: 18px;
    padding: 0px;
    margin: 0px;

    color : #2c3e50;
    font-family: 'Leelawadee UI';
}

/* #board-input-name :focus{
    background-color: #ebf1f7;
    border: 2px solid rgb(175, 190, 200);
} */

.board-header-param {
    display: flex;
    /* border: 1px solid red; */

    right: 0px;
    top: 0px;

    margin: 3px;
}

/* .board-header-param span:after {
  content: '\20DB';
  font-size: 40px;
  border: 1px solid red;
} */

//.board-header-param button {
//     border: 0;
//     background-color:transparent;

//     border: 1px solid black;

//     /* background-color: #f5fafe;
//     border: 2px solid rgb(175, 190, 200);
//     border-radius: 6px; */

//     display: flex;
//     align-items: center;

//     /* height: 30px; */

//     cursor: pointer;
// }

// .board-header-param button div {
//     display: flex;

//     /* align-items: flex-start; */
//     /* justify-content: right; */
//     align-self: flex-start;

//     box-sizing: border-box;

//     border: 1px solid yellow;
// }

// .board-header-param button div span.board-option-dot {
//     display: flex;

//     align-items: center;
//     justify-content: center;

//     align-self: center;

//     /* height: 9px; */

//     box-sizing: border-box;
//     /* border: 1px solid green; */

//     line-height: 0;
//     margin-top: -18px;
//     letter-spacing: 1px;

//     font-family: 'Leelawadee UI';
//     font-weight: bold;
//     font-size: 9em;
//     color: rgb(110, 131, 146);

//     font-size: 30px;
// }

// .board-header-param button div span.board-x {
//     display: flex;

//     align-items: center;
//     justify-content: center;

//     align-self: center;

//     /* height: 9px; */

//     box-sizing: border-box;
//     border: 1px solid green;

//     line-height: 0;
//     margin-top: 9px;
//     letter-spacing: 1px;

//     font-family: 'Leelawadee UI';
//     font-weight: bold;
//     font-size: 9em;
//     color: rgb(110, 131, 146);

//     font-size: 30px;
// }

.board-content {
    padding: 9px;
    /* margin: 9px; */
    width: 100%;

    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    
    /* text-align: center; */
    box-sizing: border-box;

    flex: 1;
    /* overflow: auto; */
    

    /* border: 1px solid blue;  */

    height: 100%;
    width: 100%;
}

/* .content-centered-div {
    display: flex;
    flex-direction: column;

    height: 100%;

    align-items: center;

    width: 100%;
    box-sizing: border-box; */

    /* margin-left: auto;
    margin-right: auto; */

    /* border: 1px solid yellow;  */

/* } */

.board-add-card{

    border-top: 1px #cecece solid;

    /* display: flex; */
    /* align-items: left; */

    padding: 3px;

    
    /* border: 1px solid yellow;  */
}

.board-add-card button{
    border: 0;
    background-color: transparent;
    cursor: pointer;
}

</style>