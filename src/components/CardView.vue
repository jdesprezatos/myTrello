<template>
    <div ref="mainBox" id="mainBox"  >
        <div id="title-div">{{title}}</div>
        <!-- <div id="tag-div">
            <span class="span-tag" v-for="t in cardTags" :key="t">{{ t }} <button id="remove-tag-button"></button></span>
        </div> -->
        <div ref="tagDiv" id="tag-div">
            <TagView v-for="tag in tags" :key="tag.name" :name="tag.name" :bgColor="tag.color"></TagView>
            <!-- <TagView v-for="(name, bgColor) in tagsTest" :key="name" :name="tag.name" :bgColor="bgColor"></TagView> -->
        </div>
        <div id="small-desc-div">{{ smallDescription }}</div>
    </div>
</template>

<script>

import TagView from './TagView.vue'

export default {
    name:'TableView', 
     components: {
        TagView
    },
    data : function() {
        return {
            // title : 'Card Title',
            description : 'Card Description',
            tagBgColorRedefined : '#aeaeae',
            tagsTest : [
                {
                    name : 'tag name 1',
                    bgColor : '#121212'
                },
                {
                    name : 'tag name 2',
                    bgColor : '#341212'
                }
            ]
        }
    },
    updated : function() {
        this.checkOverFlow()
    },
    methods : {
        checkOverFlow : function() {
            // const domDiv = this.$refs.tagDiv;
            // const mainDiv = this.$refs.mainBox;

            // console.log('Main div : h = ' + domDiv.clientHeight + ' w = ' + mainDiv.clientWidth)
            // console.log('checkOverFlow ' + domDiv.scrollHeight + ' ' + domDiv.scrollWidth )
            return false;
        }
    },
    props : {
        tags : Array,
        title : {
            Type: String,
            default : 'Card Title'
        },
        smallDescription : {
            type: String,
            default : 'small description but not to small either (at least one more line to see)'
        }
    }
}
</script>

<style scoped>


#mainBox {
    border: 2px solid black;
    border-radius: 6px;
    max-width: 270px;
    min-width: 150px;

    background-color: #c5f7c8;

    padding: 6px;
    margin: 3px;

    /* display: block;
    margin-left: auto;
    margin-right: auto; */
}

#title-div{
    border-bottom: solid 1px #b4b4b4;
    font-weight: bold;
    padding: 6px;

    text-align: center;
}

#tag-div {
    display: flex;
    justify-content: center;

    
    padding: 1px;
    margin: 5px;

    flex-wrap: wrap;
}

#small-desc-div {
    font-size: 0.9em;
}

/*.span-tag {
    display: flex;
    flex-direction: row;
    font-size: 0.75em;

    margin: 2px;
    padding: 3px;
    border: solid 2px  #656565; 
    border-radius: 6px;

    background-color: #f9bd9f;
}*/

/*#remove-tag-button {
    background-color: transparent;
    border: 0;
    margin: -2px;
}*/

/*#remove-tag-button:after{
  display: inline-block;
  background-color: transparent;
  content: "\00d7";
  border: 1 solid #fefefe;
}*/

/*
#remove-tag-button:hover{
    cursor: pointer;
}*/

/* .card {
    border: 1px solid red
} */

</style>