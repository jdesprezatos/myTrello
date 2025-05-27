<template>
    <div class="main-create-tag-view-div">
        <div class="existing-tags-div">
            <TagView v-for="tag in availableTags" v-bind:key="tag.id"
            :tagId="tag.id"
            :name="tag.name"
            :bgColor="tag.color"
            :canRemove="false"
            :isClickable="true"
            @tag-clicked="onTagClicked"
            ></TagView>
        </div>

        <div class="create-new-tag-div">
            <div v-if="displayAddTag">
                <span v-on:click="labelAddTagClicked" style="cursor: pointer;">Create new tag</span>
            </div>
            <div v-if="!displayAddTag">
                <div id="create-tag-input-div">
                    <div style="width: 100%;">
                        <input style="width: 100%;box-sizing: border-box;"  ref="new-tag-name-ref" @keydown.enter.prevent="createNewTag" @keyup.enter:="createNewTag" v-model.trim="tagName">
                    </div>
                    <div>
                        <input id="input-color" v-model="color" type="color">
                    </div>
                </div>
                <div>
                    <button type="button" @click="createNewTag">Create Tag</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import TagView from './TagView.vue';
import {mapGetters, mapState} from "vuex"


export default {
    name: 'CreateTagView',
    components : {TagView},
    data : function() { return {
            tagName : '',
            displayAddTag : false,
            color : '#73c55a'
    }},

    computed : {
        ...mapState({
            tags : 'tags',
        }),
        ...mapGetters({
            getAvailableTagsForCardId : 'getAvailableTagsForCardId'
        }),
        notYetSelectedTags : function() {
            return this.existingTags;
        },
        availableTags : function() {
            const doTrace = false;
            
            doTrace ? console.log('######################################################################') : {};
            if (doTrace) {
                const listIdTagNotInCard = Object.keys(this.tags).filter(k => {
                    console.log(k)
                    console.log(this.existingTags)
                    console.log(this.existingTags.includes(Number(k)))
                    return !this.existingTags.includes(Number(k));
                })
                console.log(listIdTagNotInCard);
            }

            return Object.keys(this.tags).filter(k => !this.existingTags.includes(Number(k))).map(tagId => this.tags[tagId])
        }
    },

    props : {
        cardId : -1,
        existingTags : [],
    },

    methods : {
        labelAddTagClicked : function() {
            console.log('clicked');
            this.displayAddTag = true;

            this.$nextTick(() => {
                this.$refs['new-tag-name-ref'].focus();  
            });
        },
        onTagClicked : function(payload) {
            this.$emit('tag-clicked', payload);
        },

        createNewTag : function() {
            if (this.tagName && this.tagName != '') {
                console.log(this.color);
                let createdTag = {'name': this.tagName, 'color' :this.color };
                this.$emit('tag-created', createdTag)

                this.$store.dispatch('createTag', createdTag);
                console.log(this.$store.tags)
                this.tagName = '';
                this.$refs['new-tag-name-ref'].focus();
            }
        }
    },
}

</script>

<style lang="scss" scoped>

.main-create-tag-view-div {
    // border: 1px solid red;
    box-sizing: border-box;

    width: 300px;
    max-height: 250px;

    position: fixed;

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

    // border: 1px solid green;
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