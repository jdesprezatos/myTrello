<template>
    <div ref="mainBox" id="mainBox"
        draggable=true
        @dragstart="onDragstart"
        @dragend="onDragEnd"
        >
        <div id="title-div"> <span draggable="false" @drag.stop @dragstart.stop @dragend.stop>{{title}}</span></div>
        <div ref="tagDiv" id="tag-div">
            <TagView v-for="tag in tags" :key="tag.name" :name="tag.name" :bgColor="tag.color" :canRemove="false"></TagView>
        </div>
        <div id="small-desc-div"><span>{{ smallDescription }}</span></div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import TagView from './TagView.vue'

export default {
    name:'TableView', 
     components: {
        TagView
    },
    data : function() {
        return {
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
    computed : {  
        ...mapGetters[{
            getTagsByCardId : 'getTagsByCardId'
        }],
        tags() {
            return this.$store.getters.getTagsByCardId(this.cardId)
        },
        smallDescription : function() {
            if (this.description.length > 252) {
                return this.description.slice(0,248) + ' [...]';
            }
            return this.description;
        }
    },
    methods : {
        checkOverFlow : function() {
            return false;
        },
        onDragstart : function(event) {
            let t = event.target;
            event.dataTransfer.setData('cardId', this.cardId)
            
            setTimeout(() => {
                //t.style.display = "none";
                t.style.visibility = "hidden";
            }, 0);

        },
        onDragEnd : function(event) {
            event.target;
            console.log('onDragEnd called');
            
            event.target.style.visibility = "visible";
            // event.target.style.display = "block";

        }
    },
    props : {
        cardId : Number,
        title : {
            Type: String,
            default : 'Card Title'
        },
        description : {
            type: String,
            default : 'Mais p*****, c\'est quoi ce language de con sans aucun check et du coup on ne sais pas où il faut modifier dès qu\'il y a un changement'
        }
    }
}
</script>

<style scoped>


#mainBox {
    border: 1px solid transparent;
    border-radius: 6px;
    max-width: 370px;
    min-width: 120px;

    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 6px rgb(162, 162, 162);

    padding: 3px;
    margin: 3px;

    width: 100%;
    
    box-sizing: border-box;

    /* cursor: grab; */

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
    
    pointer-events : none;
}
</style>