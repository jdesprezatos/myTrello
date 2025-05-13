<template>
    <div class="table-view-main-container">
        <div class="table-view-table-container">
            <!-- <table>
                <thead>
                    <td>{{defaultCategory}}</td>
                    <td v-for="cat in categories" v-bind:key="cat">{{ cat }}</td>
                </thead>
                <tbody>
                    <td></td>
                </tbody>
            </table> -->






            <!-- <div class="category">
                <div class="cat-title">
                    <span>Undefined</span>       
                </div>
                <div class="cat-content">   
                    <div class="card">Content 1</div>    
                    <div class="card">Content 2</div>  
                    <div class="card">Content 3</div>  
                    <div class="card">Content 4</div>  
                    <div class="card">Content 5</div>     
                </div>
            </div>

            <div class="category cat-2">
                <div class="cat-title">
                    <span>Undefined</span>       
                </div>
                <div class="cat-content">   
                    <div class="card">Content 1</div>    
                    <div class="card">Content 2</div>  
                    <div class="card">Content 3</div>  
                    <div class="card">Content 4</div>  
                    <div class="card">Content 5</div>     
                </div>
            </div>

            <div class="category cat-3">
                <div class="cat-title">
                    <span>Undefined</span>       
                </div>
                <div class="cat-content">   
                    <div class="card">Content 1</div>    
                    <div class="card">Content 2</div>  
                    <div class="card">Content 3</div>  
                    <div class="card">Content 4</div>  
                    <div class="card">Content 5</div>       
                </div>
            </div> -->

            <!-- <BoardView title='hum'></BoardView>
            <BoardView title='dsqdqsd'></BoardView>
            <BoardView title='dsqdqsd'></BoardView> -->


            <!-- <div class="category-wtf-is-needed-to-center-this-fucking-div"> -->
                <!-- <BoardView
                    v-for="cat in categories" :key="cat" :categoryTitle="cat"></BoardView> -->
            <!-- </div> -->


            <BoardView v-for="cat in categoriesWithCards" :key="cat.categoryTitle" 
            :categoryTitle="cat.categoryTitle" 
            :cards="cat.cards">

            </BoardView>
        </div>
    </div>
</template>

<script>

import BoardView from './Board.vue'

    export default {
        name:'TableView',
        components : {
            BoardView
        },
        prop : {},
        data: function() {
            return {
                defaultCategory: 'Undefined',
                categories : ['To Do', 'Doing', 'Done'],


                categoriesWithCards : [
                    {
                        categoryTitle : 'To Do',
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
                        categoryTitle : 'Doing',
                        cards : [
                        {
                            id : 2,
                            tags : [],
                            title : 'Card Title 2',
                            smallDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare semper elit eu dictum. Aliquam id blandit lacus.'
                        }]
                    },


                    {
                        categoryTitle : 'Done',
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
                ]
            }
        },
        computed: {},
        methods: {},
        watch:{}
    }
</script>

<style>

.table-view-main-container {
    display: flex;

    justify-content: center; /* centre horiwonaltement*/
    align-items: center; /*centre verticalement */

    margin-top: 10%;

    /* DEBUG */
    /* border: 1px red solid; */
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
    border: 1px solid blue;
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