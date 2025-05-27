<template>
    <div class="table-view-main-container">
        <div class="table-view-table-container">
            <BoardItem v-for="board in wtfDudde" :key="board.boardId" 
            :boardTitle="board.boardTitle"
            :boardId="board.boardId" 
            :doEditName="board.doEditName"
            @onCardDropped="onCardDroppedEventHandler"
            @delete-board-event="onDeleteBoardEventHandler"
            @name-changed-event="onBoardNameChanged"
            @new-card-event="onNewCardEventHandler"
            >
            </BoardItem>

            <div class="add-board-div">
                <div class="one-icon-button-div">
                    <button @click="onAddBoard"><div class="one-icon-button-border-div"><span class="board-plus"></span></div></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import BoardItem from './BoardItem.vue'

    export default {
        name:'BoardView',
        components : {
            BoardItem,// CreateCardPanel
        },
        prop : {},
        data: function() {
            return {
                defaultBoard: 'Undefined',
                categories : ['To Do', 'Doing', 'Done'],
                ladtBoardId : 3,
                lastCardId : 3,
                newBoardName : '<NEW_BOARD_NAME>',
                cardCreationMode : {
                    isActive : false,
                    boardId : -1
                }
            }
        },
        computed: {
            ...mapState({
                boards : 'boards'
            }),
            ...mapGetters([
                {
                    getBoards : "getBoards",
                    getCard : "getCard"
                }
            ]),
            wtfDudde () {
                let trace = false;
                trace ? console.log(this.$store.getters.getBoards()) : {};
                return this.$store.getters.getBoards();

            }
        },
        methods: {
            onCardDroppedEventHandler : function (data) {
                console.log ('onCardDroppedEventHandler data.cardId = ' + data.cardId + ' data.boardId = ' + data.boardId)
                console.log(this.boards)
                this.$store.dispatch('moveCardFromBoard', {
                    boardIdSrc : data.boardId,
                    boardIdDest : this.boardId,
                    cardId : data.cardId
            });

            },
            onDeleteBoardEventHandler : function (data) {
                this.$store.dispatch('removeBoard', data.boardId)
            },
            onAddBoard : function (/*e*/) {
                console.log('add board clicked'/* + e*/)
                this.$store.dispatch('addBoard', {
                    'boardId' : ++this.ladtBoardId,
                    'boardTitle' : '',
                    'cards' : [],
                    'doEditName' : true
                })
            },
            onBoardNameChanged : function(data) {
                console.log('onBoardNameChanged Board id = ' + data.boardId + ' new Board Name = ' + data.newName);
                this.$store.dispatch('renameBoard', {'boardId' : data.boardId, 'newBoardName' : data.newName});
            },

            onNewCardEventHandler : function(data) {
                this.cardCreationMode.boardId = data.boardId;
                this.cardCreationMode.isActive = true;

                
                this.$emit('new-card-event', {'boardId' : data.boardId});
            },

            getBoardById(boardId) {
                let board = undefined;
                for (let i = 0; i < this.boardsWithCards.length; ++i) {
                    if (this.boardsWithCards[i].boardId === boardId) {
                        board = this.boardsWithCards[i];
                    }
                }

                return board;
            },

            onCreateCardEventHandler : function(data) {
                console.log ('onCreateCardEventHandler : ')
                console.log(data)

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
                        'description' : cardDescription,
                        'tags' : cardTags
                    })
                }

                this.cardCreationMode.isActive = false;
            },

            onCancelCreateCard : function () {
                console.log('board');
                this.cardCreationMode.isActive = false;
            },


        },
        watch:{}
    }
</script>

<style>

.table-view-main-container {
    display: flex;

    justify-content: center;

    margin-top: 10%;

    /* DEBUG */
    /* border: 1px red solid; */
    margin: 3px;
    padding: 3px;
    /* END DEBUG */
}

.table-view-table-container {

    /* DEBUG */
    /* border: 3px purple solid; */
    /* margin: 3px; */
    /* padding: 3px; */
    /* END DEBUG */

    overflow-y: auto;
    /* width: 80%; */
    display: flex;

}

 .category-wtf-is-needed-to-center-this-fucking-div {
    width: 100%;    
    margin: 10px;
    /* border: 1px solid blue; */
}

.add-board-div {
    /* border: 1px solid green; */

    display: flex;

    padding: 6px;

    box-sizing: border-box;

    flex-direction: column;

}

.add-board-div input {
    width: 200px;
    right:0;
    box-sizing: border-box;
    position: absolute;
}

.add-board-name-div {
    /* border: 1px solid yellow; */
    position: relative;
}

</style>