<template>
    <div class="table-view-main-container">
        <div class="table-view-table-container">
            <BoardItem v-for="board in boardsWithCards" :key="board.boardId" 
            :boardTitle="board.boardTitle"
            :boardId="board.boardId" 
            :cards="board.cards"
            :doEditName="board.doEditName"
            @onCardDropped="onCardDroppedEventHandler"
            @delete-board-event="onDeleteBoardEventHandler"
            @name-changed-event="onBoardNameChanged">
            </BoardItem>

            <div class="add-board-div">
                <!-- <div style="border: 1px solid red;">
                <button @click="onAddBoard">+</button>
                </div> -->
                <div class="one-icon-button-div">
                    <button @click="onAddBoard"><div><span class="board-add-plus">+</span></div></button>
                </div>

                <!-- <div class="one-icon-button-div-other">
                    <button><span class="board-add-plus">+</span></button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>

import BoardItem from './Board.vue'

    export default {
        name:'TableView',
        components : {
            BoardItem
        },
        prop : {},
        data: function() {
            return {
                defaultBoard: 'Undefined',
                categories : ['To Do', 'Doing', 'Done'],
                ladtBoardId : 3,

                boardsWithCards : [
                    {
                        boardId : 0,
                        boardTitle : 'To Do',
                        cards : [
                            {
                            id : 0,
                            tags : [
                                {
                                    name : 'tag 1',
                                    color: '#dfe2a0'
                                },
                                {
                                    name : 'tag 2',
                                    color : '#ffa3f9'
                                }],
                            title : 'Test Card Title in Data',
                            smallDescription : 'A small description for the card 1'
                        },
                        {
                            id : 1,
                            tags : [],
                            title : 'Card Title 2',
                            smallDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare semper elit eu dictum. Aliquam id blandit lacus.'
                        }]
                    },


                    {
                        boardId : 1,
                        boardTitle : 'Doing',
                        cards : [
                        {
                            id : 2,
                            tags : [],
                            title : 'Aliquam pellentesque',
                            smallDescription : 'Nulla elit augue, bibendum ut erat non, imperdiet faucibus ipsum. Sed facilisis mollis odio sit amet fermentum.'
                        }]
                    },


                    {
                        boardId : 2,
                        boardTitle : 'Done',
                        cards : [
                            {
                            id : 3,
                            tags : [
                                {
                                    name : 'tag 3',
                                    color: '#b3ddff'
                                }],
                            title : 'Card Title 1',
                            smallDescription : 'A small description for the card 3'
                        }]
                    },

                    {
                        boardId : 3,
                        boardTitle : 'TEST nom assez long pour avoir une autre ligne',
                        cards : []
                    },

                    // {
                    //     boardId : 4,
                    //     boardTitle : 'TEST 2',
                    //     cards : []
                    // },
                ],
                
                newBoardName : '<NEW_BOARD_NAME>',
            }
        },
        computed: {},
        methods: {
            onCardDroppedEventHandler : function (data) {
                console.log ('onCardDroppedEventHandler data.cardId = ' + data.cardId + ' data.targetBoard = ' + data.targetBoard)

                let cardToMove = null;

                // First, search the card id in the current board to remove it
                for (let board of this.boardsWithCards) {
                    // for (let card of board.cards) {
                    for (let i = 0; i < board.cards.length; ++i) {
                        if (board.cards[i].id == data.cardId) {
                            cardToMove = board.cards[i];
                            console.log('found mf')
                            board.cards.splice(i, 1);
                        }
                    }
                }

                // Search for the receiving category
                for (let i = 0; i< this.boardsWithCards.length; ++i) {
                    if (this.boardsWithCards[i].boardTitle == data.targetBoard) {
                        this.boardsWithCards[i].cards.push(cardToMove)
                    }
                }

            },
            onDeleteBoardEventHandler : function (data) {
                let boardId = data.boardId;
                let deleteIdx = -1;

                console.log('onDeleteBoardEventHandler boardId = ' + boardId);

                for (let i = 0; i < this.boardsWithCards.length; ++i) {
                    if (this.boardsWithCards[i].boardId == boardId) {
                        deleteIdx = i;
                    }
                }

                console.log('deleteIdx = ' + deleteIdx);

                if (deleteIdx != -1) {
                    this.boardsWithCards.splice(deleteIdx, 1);
                }

                console.log(this.boardsWithCards)
            },
            onAddBoard : function (/*e*/) {
                console.log('add board clicked'/* + e*/)

                this.boardsWithCards.push({
                    'boardId' : ++this.ladtBoardId,
                    'boardTitle' : '',
                    'cards' : [],
                    'doEditName' : true
                })
            },
            onBoardNameChanged : function(data) {
                console.log('Board id = ' + data.boardId + ' new Board Name = ' + data.newName);

                let board = undefined;
                for (let i = 0; i < this.boardsWithCards.length; ++i) {
                    if (this.boardsWithCards[i].boardId === data.boardId) {
                        board = this.boardsWithCards[i];
                    }
                }

                if (!board) {
                    return;
                }

                if (!data.newName) {
                    console.log('new name is empty');
                    // if name is edited revert the edit

                    // if name is the name of a new board, delete the board
                    //if (th)
                    console.log('board.boardTitle = ' + board.boardTitle)
                    if (!board.boardTitle) {
                        console.log('LETS DELETE THE NEW ADDED BOARD THAT HAS NO NAME')
                        this.onDeleteBoardEventHandler({'boardId' : data.boardId});
                    }
                }

                for (let i = 0; i < this.boardsWithCards.length; ++i) {
                    if (this.boardsWithCards[i].boardId === data.boardId) {
                        this.boardsWithCards[i].boardTitle = data.newName;
                        this.boardsWithCards[i].doEditName = false;
                    }
                }
            }

        },
        watch:{}
    }
</script>

<style>

.table-view-main-container {
    display: flex;

    justify-content: center; /* centre horiwonaltement*/
    /*align-items: center; /*centre verticalement */

    margin-top: 10%;

    /* DEBUG */
    border: 1px red solid;
    margin: 3px;
    padding: 3px;
    /* END DEBUG */
}

.table-view-table-container {

    /* DEBUG */
    border: 3px purple solid;
    /* margin: 3px; */
    /* padding: 3px; */
    /* END DEBUG */

    width: 80%;
    display: flex;  

}

 .category-wtf-is-needed-to-center-this-fucking-div {
    width: 100%;    
    margin: 10px;
    /* border: 1px solid blue; */
}

.add-board-div {
    border: 1px solid green;

    display: flex;

    padding: 6px;

    box-sizing: border-box;

    flex-direction: column;

}

.add-board-div button {
    /* background-color: #e3f0fa;
    border: 2px solid rgb(175, 190, 200);

    border-radius: 6px;

    height: 30px;
    width: 30px;
    
    cursor: pointer;

    box-sizing: border-box;
    
    display: flex;
    justify-content: center;
    align-items: center;   */
}

.add-board-div input {
    width: 200px;
    right:0;
    box-sizing: border-box;
    /* float: left; */
    position: absolute;
}

.add-board-name-div {
    border: 1px solid yellow;
    position: relative;
}

/*
.cat-title {
    background-color: #a6acee;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 2px solid green;

    padding: 10px;
}

.cat-content {
    padding: 9px;
}

.card {
    padding: 9px;
    margin: 15px;

    border: 1px solid black;
    border-radius: 9px;
} */

</style>