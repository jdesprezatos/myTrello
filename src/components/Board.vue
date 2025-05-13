<template>
    <div id="board-main-div">
    <!-- <div> -->
        <div class="category">
            <div class="cat-title">
                <span>{{categoryTitle}}</span>       
            </div>
            <div id="cat-content-id" class="cat-content" ref="contentDiv">   
                <!-- <CardView></CardView>  -->

                <div class="content-centered-div">
                    <CardView v-for="card in cards" v-bind:key="card.id" 
                        :title="card.title"
                        :tags="card.tags"
                        :small-description="card.smallDescription"></CardView>

                        <!-- <div class="alacon" style="background-color: brown; width: 100px; height: 100px; border: 1px solid black;"></div>

                        <div class="alacon" style="background-color: brown; width: 100px; height: 100px; border: 1px solid black;"></div> -->


                </div>
            </div>
            <div class="cat-add-card">   
                <button @click="addCard()"> + Add new card</button>
            </div>
        </div>
    </div>
</template>

<script>

import CardView from './CardView.vue'

export default {
    name:'BoardView',
    components: {
        CardView
    },
    data: function() {
        return {
            // cards : [
            // {
            //     id : 0,
            //     tags : [
            //         {
            //             name : 'tag 1',
            //             color: '#dfe2a0'
            //         },
            //     {
            //         name : 'tag 2',
            //         color : '#ffa3f9'
            //     }],
            //     title : 'Card Title 1',
            //     smallDescription : 'A small description of the card 1'
            // },
            // {
            //     id : 1,
            //     tags : [],
            //     title : 'Card Title 2',
            //     smallDescription : 'A small description of the card 2'
            // },
            // {
            //     id : 2,
            //     tags : [],
            //     title : 'Card Title 3',
            //     smallDescription : 'A small description of the card 3'
            // }
            // ]
        }
    },
    props : {
        categoryTitle : {
            type: String,
            default : 'TITLE',

        },
        cards : {
            type : Array,
            default : () => [
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
                title : 'Card Title 1',
                smallDescription : 'A small description for the card 1'
            },
            {
                id : 1,
                tags : [],
                title : 'Card Title 2',
                smallDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare semper elit eu dictum. Aliquam id blandit lacus.'
            }]
        }
    },
    methods : {
        addCard : function () {
            // // console.log(this.$el);
            // const content = this.$refs.contentDiv;
            // console.log(content); // C'est un élément DOM
            // // Tu peux faire ce que tu veux avec, par exemple :
            // content.innerHTML = ;
        }
    }
}
</script>

<style>

#board-main-div {
    width: 100%;    
    margin: 6px;

    /* DEBUG */
    /* border: 1px solid blue; */
    /* END DEBUG */
}

.category {
    background-color: #e3f0fa;
    /* border: 2px solid black; */
    border-radius: 8px;

    /* margin: 3px; */

    width: 100%;

    box-sizing: border-box;

    /* text-align: center; */
    /* align-items: center; */
    /* justify-content: center; */

    
    flex-direction: column;

    min-height: 180px;
}

.cat-title {

    /* background-color: #a6acee;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px; */
    border-bottom: 2px solid green;

    padding: 8px;
    text-align: center;
    font-weight: bold;
}

.cat-content {
    padding: 9px;

    /* text-align: center; */
    
    width: 100%;

    display: flex;

    justify-content: center;
    flex-direction: column;
    
    text-align: center;
box-sizing: border-box;
}

.content-centered-div {
    display: block;

    margin-left: auto;
    margin-right: auto;
}

.cat-add-card{

    border-top: 1px #cacaca solid;

    display: flex;
    /* align-items: left; */

    padding: 3px;
}

.cat-add-card button{
    border: 0;
    background-color: transparent;
    cursor: pointer;
}

</style>