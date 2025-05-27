import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Store({
    state: {
        lastBoardId: 3,
        lastCardId: 13,
        lastTagId: 103,
        boards : {
            0 : {
                boardId : 0,
                boardTitle : 'To Do',
                cards : [10, 11]
            },
            1:{
                boardId : 1,
                boardTitle : 'Doing',
                cards : [12]
            },

            2:{
                boardId : 2,
                boardTitle : 'Done',
                cards : [13]
            },

            3:{
                boardId : 3,
                boardTitle : 'TEST nom assez long pour avoir une autre ligne',
                cards : []
            },
        },
        cards : {
            10 : {
                id: 10,
                tags : [101,102],
                title: 'Test Card Title in Data',
                description: 'A small description for the card 1'
            },
            11 : {
                id: 11,
                tags: [],
                title: 'Card Title 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare semper elit eu dictum. Aliquam id blandit lacus.'
            },

            12 : {
                id: 12,
                tags: [],
                title: 'Aliquam pellentesque',
                description: 'Nulla elit augue, bibendum ut erat non, imperdiet faucibus ipsum. Sed facilisis mollis odio sit amet fermentum.'
            },

            13:{
                id: 13,
                tags : [103],
                title: 'Card Title 1',
                description: 'A small description for the card 3'
            },
        },

        tags : {
            101:{
                id : 101,
                name: 'tag 1',
                color: '#dfe2a0'
            },
            102:{
                id : 102,
                name: 'tag 2',
                color: '#ffa3f9'
            },
            103:{
                id : 103,
                name: 'tag 3',
                color: '#b3ddff'
            },
        },

    },
    getters: {
        getBoards: function(state) {
            return function( ) {
                return Object.values(state.boards);
            }
        },
        getBoard: state => {
            return function (id) {
                return state.boards[id] || null;
            }
        },
        getCard: state => {
            return function (id) {
                return state.cards[id] || null;
            }
        },
        getTag: state => {
            return function (id) {
                return state.tags[id] || null;
            }
        },
        getCardsByBoardId: function (_ /* state */ , getters) {
            return function (boardId) {
                let trace = false;
                trace ? console.log('boardId : ' + boardId) : {} ;
                const board = getters.getBoard(boardId);
                trace ? console.log('getters.getBoard(boardId) : ') : {} ;
                trace ? console.log(board): {} ;
                return board.cards.map(getters.getCard);
            }
        },
        getCardsForBoard: function (_ /* state */ , getters) {
            return function (boardId) {
                let trace = false;
                trace ? console.log('boardId : ' + boardId) : {} ;
                const board = getters.getBoard(boardId);
                trace ? console.log('getters.getBoard(boardId) : ') : {} ;
                trace ? console.log(board): {} ;
                return board.cards.map(getters.getCard);
            }
        },
        getTagsByCardId: function (state /* state */ , getters) {
            return function (cardId) {
                let trace = false;
                trace ? console.log('cardId : ' + cardId) : {} ;
                const card = getters.getCard(cardId);
                trace ? console.log('getters.getCard(cardId) : ') : {} ;
                trace ? console.log(card): {} ;
                return card.tags.map(getters.getTag);
            }
        },
        getTagsForCard: function (_ /* state */ , getters) {
            return function (card) {
                return card.tags.map(getters.getTag);
            }
        },
        getAvailableTagsForCard : function(state, getters) {
            return function(card) {
                return getters.getAvailableTagsForCardId(card.id)
            }
        },
        getAvailableTagsForCardId : function(state, getters) {
            return function(cardId) {
                let trace = false;
                trace ? console.log('######################################################################') : {} ;
                const card = getters.getCard(cardId)
                if (card) {
                    if (trace) {
                        const listIdTagNotInCard = Object.keys(state.tags).filter(k => {
                            console.log(k)
                            console.log(card.tags)
                            console.log(card.tags.includes(Number(k)))
                            return !card.tags.includes(Number(k));
                        })
                        console.log(listIdTagNotInCard);
                    }
                    return Object.keys(state.tags).filter(k => !card.tags.includes(Number(k))).map(tagId => state.tags[tagId])
                }

                return []
            }
        },
    },
    mutations: {
        REMOVE_BOARD(state, boardId) {
            const board = state.boards[boardId]
            if (board) {
                //delete state.boards[boardId]
                Vue.delete(state.boards, boardId)
            }
        },
        ADD_BOARD(state, newBoard) {
            console.log('store mutation ADD_BOARD with newBoard')
            console.log(newBoard)
            const board = state.boards[newBoard.boardId]
            console.log(board === null)
            console.log(board)
            if (!board) {
                Vue.set(state.boards,newBoard.boardId,newBoard);
                console.log(state.boards)
            }
        },
        INCREMENT_LAST_BOARD_ID(state) {
            state.lastBoardId++;
        },
        RENAME_BOARD(state, {boardId, newBoardName}) {
            console.log('boardId ' + boardId + ', ' + newBoardName + ' newBoardName')
            const board = state.boards[boardId]
            console.log(board === null)
            console.log(board)
            if (board) {
                board.boardTitle = newBoardName;
                board.doEditName = false;
                Vue.set(state.boards,boardId,board);
            }
        },
        UPDATE_BOARD(state, boardId, updatedBoard) {
            Vue.set(state.boards, boardId, updatedBoard)
        },
        CREATE_TAG(state, tag) {
            // state.tags.push(tag);
            Vue.set(state.tags, tag.id, tag);
        },        
        INCREMENT_LAST_TAG_ID(state) {
            state.lastTagId++;
        },
        ADD_CARD_TO_BOARD(state, boardId, cardId) {
            const board = state.boards[boardId]

            board.cards.push(cardId)
        },
        MOVE_CARD_TO_BOARD(state, payload) {
            const { boardIdDest, cardId } = payload;
            // console.log(boardIdDest)
            let cardIdButAsNumberCauseJSisFuckingTrash = Number(cardId);
            Object.keys(state.boards).forEach(boardId => {
                const board = state.boards[boardId];
                // console.log(board.cards)
                let cardIndex = board.cards.indexOf(cardIdButAsNumberCauseJSisFuckingTrash);
                // console.log(cardIndex)
                if (cardIndex !== -1) {
                    Vue.delete(board.cards, cardIndex)
                }
            });
            
            if (state.boards[boardIdDest]) {
                state.boards[boardIdDest].cards.push(cardIdButAsNumberCauseJSisFuckingTrash);
            }
        },
        CREATE_CARD_ON_BOARD(state,payload) {
            const { boardId, title, description, tags } = payload;
            const board = state.boards[boardId];

            if (board) {
                let newCardId = state.lastCardId + 1;
                const newCard = {
                    'id' : newCardId,
                    'title' : title,
                    'description' : description,
                    'tags' : tags
                }

                // console.log(state.cards)
                state.cards[newCardId] = newCard;
                board.cards.push(newCardId);

            }
        },
        ADD_CARD_ON_BOARD(state,payload) {
            const board = state.boards[payload.boardId];

            if (board) {
                board.cards.push(state.lastCardId);
            }
        },
        INCREMENT_LAST_CARD_ID(state) {
            state.lastCardId++;
        },
    },
    actions: {
        removeBoard({commit}, boardId) {
            commit('REMOVE_BOARD', boardId)
        },
        addBoard({commit, state}, newBoardData) {
            const newBoardId = state.lastBoardId + 1;
            const newBoard = {
                boardId: newBoardId,
                boardTitle: newBoardData.boardTitle || '',
                cards: [],
                doEditName: newBoardData.doEditName ?? false
            };
            console.log('store addBoard dispatch called with :')
            console.log(newBoard)
            commit('ADD_BOARD', newBoard);
            commit('INCREMENT_LAST_BOARD_ID');
        },
        renameBoard({commit}, {boardId, newBoardName}) {
            commit('RENAME_BOARD',  {boardId, newBoardName});
        },
        createTag({commit, state}, tag) {
            console.log(tag.name.length)
            // #FF22AA
            if (tag.name[0] == '#' && 
                tag.name.length > 6
            ) {
                let allHexChar = true;
                tag.name.slice(1, 7).split("").forEach(c => allHexChar = allHexChar && (Number('0x'+c) < 17))

                if (allHexChar)
                {
                    console.log('OK color')
                    console.log ('trim :' + tag.name.slice(7).trim())

                    if (tag.name.slice(7).trim()) {
                        tag.color = tag.name.slice(0,7);
                        tag.name = tag.name.slice(8).trim();
                    }
                    else {
                        tag.color = tag.name;
                    }
                }

                const tagNameAlreadyUsed = Object.values(state.tags).map(t => t.name).includes(tag.name)
                console.log('tagNameAlreadyUsed = ' + tagNameAlreadyUsed)
                if (tagNameAlreadyUsed)
                {
                    return;
                }
            }

            tag.id = state.lastTagId + 1;

            commit('CREATE_TAG', tag);
            commit('INCREMENT_LAST_TAG_ID', tag);
        },
        addCardToBoard({ commit, getters }, { boardId, cardId }) {
            const board = getters.getBoard(boardId);
            if (!board.cards.includes(cardId)) {
                commit('ADD_CARD_TO_BOARD', { boardId, cardId });
            }
        },
        moveCardToBoard({commit}, payload) {
            commit('MOVE_CARD_TO_BOARD', payload);
        },
        createCardOnBoard({commit}, payload) {
            console.log('createCardOnBoard')

            console.log(payload.tags);
            if (!payload.title) {
                return;
            }
            commit('CREATE_CARD_ON_BOARD', payload);
            // commit('ADD_CARD_ON_BOARD', payload);
            commit('INCREMENT_LAST_CARD_ID');
        },
    },
    modules: {

    }
})

