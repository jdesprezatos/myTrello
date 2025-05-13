<template>
    <div id="card-view-test">
        <div id="create-div">
            <input id="new-tag-text" v-model.trim="newTagName">
            <input id="new-tag-color" v-model="newTagColor" type="color">
            <button v-on:click="addTag()">Add New Tag</button>
        </div>
        <div id="card-div">
            <CardView :tags="this.listTags"></CardView>
        </div>

    </div>
</template>

<script>

import CardView from "../CardView.vue"

export default {
    name: 'CardViewTest',
    components : {
        CardView
    },
    data : function() {
        return {
            newTagName : '',
            newTagColor : '',
            // listTags : [
            //     'tag 1', 'tag 2'
            // ]
            listTags : 
            [
                {
                    name : 'tag 1',
                    color: '#dfe2a0'
                },
                {
                    name : 'tag 2',
                    color : '#ffa3f9'
                },
                {
                    name : 'tag 3',
                    color : '#a3baff'
                }
            ]
        }
    },
    methods : {
        addTag() {
            let newTag = {
                name : this.newTagName,
                color : this.newTagColor
            }
            this.listTags.push(newTag);
            this.newTagName = ''
        },
        removeTag(tagToRemove) {

            for (let i = 0; i < this.listTags.lenght; ++i) {
                if (this.listTags[i] == tagToRemove){
                    this.listTags.splice(i, 1);
                }
            }
        }
    }
}

</script>

<style scoped>

#card-view-test {
    text-align: left;
    
    width: fit-content;

    padding: 5px;
    margin: 5px;
    
    /* display: flex; */

    border: 2px dashed #efefef;
}

#new-tag-color {
    border: 0;
    background-color: transparent;

    width: 24px;
    height: 24px;
}

#create-div {
    /* display: flex; */
    /* flex-direction: row; */
    color: #dfe2a0;
}

#card-div {

}

</style>