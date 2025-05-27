<template>
    <div id="board-main-div">
    <!-- <div> -->
        <div class="board-item">
            <div class="board-header">
                <div class="board-title">
                    <span v-if="!doEditName">{{boardTitle}}</span>
                    <input v-if="doEditName" id="board-input-name" ref="board-input-name" @focusout="onNameChanged" @keyup.enter="onNameChanged" v-model.trim="boardName" >

                </div>
                 <div v-if="displayOptions" class="board-header-param">
                    <button><div><span class="board-option-dot">...</span></div></button>
                </div>
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
                    <CardView v-for="card in cards" v-bind:key="card.id" 
                        :cardId="card.id"
                        :title="card.title"
                        :description="card.description"></CardView>
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
    },
    computed : {
        ...mapGetters[{
            getCardsForBoard : 'getCardsForBoard'
        }],
        doEditName() {
            return this.boardTitle === '';
        },
        cards : function() {
            return this.$store.getters.getCardsForBoard(this.boardId);
        }
    },
    methods : {
        addCard : function () {
            this.$emit('new-card-event', {'boardId' : this.boardId});
        },
        onDrop : function (event) {
            console.log(event)
            console.log('id = ' + event.target.id)

            const cardId = event.dataTransfer.getData('cardId');
            console.log (this.boardTitle);          
            console.log(this.$store.getters.getAvailableTagsForCardId(cardId))

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
            console.log('onNameChanged ' + this.boardName);
            console.log(e);

            if (!this.boardName) {
                this.onDeleteBoard();
            }
            else {
                this.$store.dispatch('renameBoard', {
                    boardId : this.boardId,
                    newBoardName : this.boardName
                })
            }
        },
        enableEdit() {
            this.doEditName = true;
            this.$nextTick(() => {
                this.$refs['board-input-name']?.focus();
            });
        },
    },
    mounted : function() {
        if (this.doEditName) {
            this.$refs['board-input-name'].focus();
        }
    }
}
</script>

<style lang="scss">

#board-main-div {
    width: 100%;    
    margin: 6px;

    display: flex;
    min-width:210px;

    /* DEBUG */
    /* border: 1px solid blue; */
    /* END DEBUG */
}

.board-item {
    background-color: #e2f2ff;
    border: 2px solid rgb(175, 190, 200);
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
    // border: 1px solid green;

    padding: 6px;
    text-align: center;
    text-align: left;
    font-weight: bold;

    flex-grow: 1;

    font-size: 17px;
    
    font-family: 'Leelawadee UI';
}

#board-input-name {
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

.board-header-param {
    display: flex;

    right: 0px;
    top: 0px;

    margin: 3px;
}

.board-content {
    padding: 9px;
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
    
    box-sizing: border-box;

    flex: 1;

    height: 100%;
    width: 100%;
}

.board-add-card{

    border-top: 1px #cecece solid;
    padding: 3px;
}

.board-add-card button{
    border: 0;
    background-color: transparent;
    cursor: pointer;
}

</style>