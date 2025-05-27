
<template>
    <!-- <div class="main-create-card-panel-div" > -->
        <div id="create-card-main-div" ref="main-create-card-panel-div">
            <div id="ccp-nav-bar">
                <div class="one-icon-button-div">
                    
                    <button @click="onCancel">
                        <!-- <div> -->
                            <span class="board-x-inner">&#xD7;</span>
                        <!-- </div> -->
                    </button>
                </div> 
            </div>
            <!-- <form id="ccp-form" v-on:submit.prevent="onSubmitNewCard"> -->
            <div  id="ccp-form">
                <div id="ccp-name-div">
                    <span class="ccp-label-span">Name : </span>
                    <div class="ccp-input-div">
                    <input v-model="cardName" ref="cardNameInputRef"></div>
                </div>
                <div id="ccp-tags-div">
                    <span class="ccp-label-span">Tags : </span>
                    <div id="ccp-tags-content-div" class="flex-h-center" style="position: relative;">
                        <TagView v-for="tag in realTag" 
                        :key="tag.id" 
                        :tagId="tag.id" 
                        :name="tag.name" 
                        :bgColor="tag.color"
                        @tag-close="onTagClose"
                        ></TagView>
                        <div class="one-icon-button-div" >
                            <button @click="addTagClicked" type="button" class="ccp-small-button" >
                                <div>
                                    <span class="board-plus ccp-small-icon" style="font-size: 21px;"></span>
                                </div>
                            </button>
                        </div> 
                        <!-- <div style="position: absolute;" ref="justForTest"> -->
                            <CreateTagView ref="create-tag-view-ref" v-if="showSelectTag"
                            :existingTags="tags"
                            :style="{ top: selectTagDivYStart + 'px', left: selectTagDivXStart + 'px' }"
                            @tag-clicked="onTagClicked"
                            ></CreateTagView>
                        <!-- </div> -->
                    </div>
                </div>
                <div id="ccp-description-div">
                    <span class="ccp-label-span">Description : </span>
                    <div id="ccp-description-ta-div">
                        <textarea id="ccp-description-ta" v-model="description"></textarea>
                    </div>
                </div>
                <div id="ccp-submit-div">
                    <button type="submit" v-on:submit.prevent="onSubmitNewCard" @click="onSubmitNewCard" >Save</button>
                    <button type="button" @click="onCancel" v-on:submit.prevent>Cancel</button>
                </div>
            </div>
            <!-- </form> -->
        </div>
    <!-- </div> -->
</template>

<script>
import TagView from './TagView.vue';
import CreateTagView from './CreateTagView.vue';

export default {



    name : 'CreateCardPanel',
    components : {
        TagView, CreateTagView
    },
    data : function () { return {
        cardName : '',
        tags : [],
        description : '',
        showSelectTag : false,
        selectTagDivXStart : 0,
        selectTagDivYStart : 0,
    }},
    computed : {
        realTag : function() {
            return this.tags.map(this.$store.getters.getTag);
        }
    },
    props : {
        boardId : Number
    },
    methods : {
        onSubmitNewCard : function() {
            console.log("onSubmitNewCard");

            //
            if (!this.cardName) {
                // error
                console.log("name can't be empty");
            }

            console.log(this.tags)
            this.$emit('create-new-cart-event', {
                'boardId' : this.boardId,
                'name': this.cardName,
                'description' : this.description,
                'tags' : this.tags
            })
        },

        addTagClicked : function(event) {
            event.stopPropagation(); // or else, the event will be re-cath and close the drop down instantly

            const rectButton = event.target.getBoundingClientRect();
            const rectWindow = this.$refs['main-create-card-panel-div'].getBoundingClientRect();
            console.log(rectButton)
            console.log(rectWindow)
            const l = (rectButton.left)
            const t = (rectButton.bottom)
            this.selectTagDivXStart = (l);
            console.log(l)
            //this.selectTagDivYStart = rect.bottom;
            this.selectTagDivYStart = t + 5;
            this.showSelectTag = true;

            this.$nextTick(() => {
                document.addEventListener('mousedown', this.handleClickOutside);
            });
        },

        onCancel : function() {
            console.log('onCancel');

            this.$emit('cancel-create-card');
        },

        handleClickOutside(event) {
            console.log(event)
            const createTagView = this.$refs['create-tag-view-ref'];
            const rectDiv = createTagView.$el.getBoundingClientRect();
            console.log('*****************************************************')
            console.log(rectDiv)
            console.log('*****************************************************')
            if (createTagView) {
                const createTagViewDomElement = createTagView.$el;
                console.log(createTagViewDomElement)


                    if (event.clientX < rectDiv.left || event.clientX > rectDiv.right ||
                        event.clientY < rectDiv.top || event.clientY > rectDiv.bottom)
                    {
                        this.showSelectTag = false;
                        console.log('Click inside')
                        document.removeEventListener('mousedown', this.handleClickOutside);
                    }
                    else {
                        console.log('Click outside')
                    }
            }
        },
        onTagClicked : function(payload) {
            console.log(payload.tagId);
            this.tags.push(payload.tagId)
        },
        onTagClose : function(payload) {
            console.log(payload);
            console.log(this.tags.indexOf(42));
            if (this.tags.indexOf(payload.tagId) != -1) {
                this.tags.splice(this.tags.indexOf(payload.tagId), 1);
            }
        },
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    mounted() {
        this.$refs.cardNameInputRef.focus();
    }
}
</script>

<style lang="scss" scoped>

span.ccp-label-span {
    font-weight: bold;
    flex: 0 0 auto;
}

#create-card-main-div {
    position: absolute;
    background-color: white;
    border-radius: 12px; 

    box-sizing: border-box;
    padding: 9px;
}

#ccp-form {
    display: flex;
    flex-direction: column;

    justify-content: left;

    box-sizing: border-box;

    width: 600px;
    // height: 240px;
    min-height: 240px;
}

#ccp-name-div {
    // border: 1px solid red;
    box-sizing: border-box;
    
    display: flex;
    flex-direction: row;

    // flex: 0 1 auto;
    margin-bottom: 5px;
}

#ccp-tags-div {
    // border: 1px solid green;
    box-sizing: border-box;
    
    display: flex;
    flex-direction: column;
    align-items: start; 
    
    margin-bottom: 5px;

    flex: 1 1 auto;
}

#ccp-tags-content-div {
    // border: 1px solid red;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;

    overflow-y: auto;
    max-height: 150px;
}

#ccp-description-div {
    // border: 1px solid blue;
    box-sizing: border-box;
    
    display: flex;
    flex-direction: column;
    align-items: start;
    
    flex: 1 1 100%;
    min-height: 45px;
}

#ccp-description-ta-div {
    // border: 1px solid yellow;
    box-sizing: border-box;
    
    width: 100%;
    height: 100%;

    flex: 1 1 100%;
    min-height: 90px;
}

#ccp-description-ta {
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    resize: none;
}

#ccp-submit-div {
    // border: 1px solid yellow;
    box-sizing: border-box;
    
    display: flex;
    flex-direction: row;

    align-items: end;
    justify-content: right;
    
    // min-height: 120px;

    // flex: 0 1 auto;
}

#ccp-submit-div button{
    box-sizing: border-box;
    margin-top: 6px;
    margin-left: 6px;

    width: 60px;
}

#ccp-nav-bar {
    // border: 1px solid purple;

    display: flex;
    flex-direction: row-reverse;
}

.ccp-small-button {
    width: 21px;
    height: 21px;
}

.ccp-input-div {
    // width: 100%;

    // border: 1px solid green;
    box-sizing: border-box;

    flex: 1 1 auto;

    display: flex;
    flex-direction: row;

    justify-content: start;

    padding-left: 5px ;
}

input {
    border: 0;

    border-bottom: 1px solid gray;


    box-sizing: border-box;
    width: 90%;
    outline: none;
    // width: auto;
}


</style>