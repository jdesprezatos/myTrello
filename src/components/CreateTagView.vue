<template>
    <div class="main-create-tag-view-div">

        <!-- <div>
            <input ref="new-tag-name-ref"  v-model="tagName">
        </div> -->

        <div class="existing-tags-div">
            <TagView v-for="tag in existingTags" v-bind:key="tag.name"
            :name="tag.name"
            :bgColor="tag.color"
            :canRemove="false"
            ></TagView>
        </div>

        <div class="border-red create-new-tag-div">
            <div v-if="displayAddTag">
                <span v-on:click="labelAddTagClicked" style="cursor: pointer;">Create new tag</span>
            </div>
            <div v-if="!displayAddTag">
                <div id="create-tag-input-div">
                    <div>
                        <input ref="new-tag-name-ref" v-model="tagName">
                    </div>
                    <div>
                        <input id="input-color" v-model="color" type="color">
                    </div>
                </div>
                <div>
                    <button type="button" @click="createNewTag">Add Tag</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import TagView from './TagView.vue';


export default {
    name: 'CreateTagView',
    components : {TagView},
    data : function() { return {
            tagName : '',
            displayAddTag : false,
            color : '#73c55a',
    }},
    props : {
        existingTags : {
            Type: Array,
            default : function() {return [
                {
                    name : 'consectetur',
                    color: '#dfe2a0'
                },
                {
                    name : 'adipiscing',
                    color : '#ffa3f9'
                },
                {
                    name : 'Aliquam',
                    color : '#a3baff'
                },
                {
                    name : 'ornare semper',
                    color : '#8fe98b'
                },
                {
                    name : 'ornare dqsdsq',
                    color : '#8fe98b'
                },
                {
                    name : 'ornare aaezae',
                    color : '#8fe98b'
                },
                {
                    name : 'ornare semcccxwcxper',
                    color : '#8fe98b'
                }
            ]}
        }
    },

    methods : {
        labelAddTagClicked : function() {
            console.log('clicked');
            this.displayAddTag = true;

            this.$nextTick(() => {
                this.$refs['new-tag-name-ref'].focus();  
            });
        },

        // handleClickOutside(event) {
        //     console.log(event)

        //     const createTagViewDomElement = this.$el;

        //     console.log(createTagViewDomElement)
        //     if (createTagViewDomElement && !createTagViewDomElement.contains(event.target)) {
        //         //this.showSelectTag = false;
        //         console.log('empty if')
        //     }
        //     else {
        //         console.log('else')
        //         this.showSelectTag = false;
        //     }
        // },

        createNewTag : function() {
            if (this.tagName && this.tagName != '') {
                console.log(this.color);
                this.$emit('tag-created', {'name': this.tagName, 'color' :this.color })
            }
        }
    },

    // mounted() {
    //     document.addEventListener('click', this.handleClickOutside);
    // },
    // beforeDestroy() {
    //     document.removeEventListener('click', this.handleClickOutside);
    // }

}

</script>

<style lang="scss" scoped>

.main-create-tag-view-div {
    border: 1px solid red;
    box-sizing: border-box;

    width: 300px;
    max-height: 250px;

    position: fixed;
    // inset: auto auto auto auto;

    // position: absolute;
    // top: 15px;
    // left: 0px;
    // inset: auto auto auto auto;

    background-color: white;
    border-radius: 12px;

    box-shadow: 2px 2px 12px black;

    padding: 12px;
}

.existing-tags-div {
    display: flex;
    flex-direction: row;
    
    flex-wrap: wrap;

    max-height: 150px;

    overflow: auto;

    border: 1px solid green;
}

.create-new-tag-div {
    padding: 6px;
}

#create-tag-input-div{
    display: flex;

}

#input-color {
    border: none;
    background-color: transparent;

    width: 24px;
    height: 24px;
}

</style>