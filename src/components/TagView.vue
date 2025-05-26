<template>
    <!-- <span class="tag-span" :style="{'background-color':bgColor, color:textColor}">{{ shortName }}<button id="remove-tag-button" :style="{color:textColor}"></button></span> -->
    <div>
        <span class="tag-span" 
        :class="{clickable: isClickable }" 
        :style="{'background-color':bgColor, color:textColor}"
        @click="onTagClicked"
        >
        {{ shortName }}
        <button v-if="canRemove" id="remove-tag-button"></button>
    </span>
    </div>
</template>

<script>
    export default {
        name:'TagView',
        data: function() {
            return { 
                tagName : 'TAGNAME',
            }
        },
        computed : {
            shortName() {
                let sname = this.name
                if (this.name.length > 13) {
                    sname = sname.slice(0, 9);
                    sname += ' ...'
                }

                return sname;
            },
            textColor : function() {

                let retTextColor = '#000000';
                if (this.bgColor) {
                    let r = this.bgColor.slice(1,3);
                    let g = this.bgColor.slice(3,5);
                    let b = this.bgColor.slice(5);
                    r = Number('0x'+r);
                    g = Number('0x'+g);
                    b = Number('0x'+b);
                    r = Number((r * 0.75).toFixed());
                    b = b / 2;
                    let colors = [r, g, b]

                    let min = 255
                    let minIdx = -1;
                    for (let i = 0; i < colors.length; ++i) {
                        if (colors[i] < min) {
                            min = colors[i]
                            minIdx = i;
                        }
                    }
                    colors.splice(minIdx, 1);
                    let moy = (colors[0] + colors[1]) / 2;
                    if (moy < 125 )
                    {
                        retTextColor = '#efefef'
                    }
                }

                return retTextColor
            }
        },
        props : {
            tagId : Number,
            name : String,
            canRemove : {
                type : Boolean,
                default : true
            },
            bgColor : {
                type : String,
                default : '#f9bd9f'
            },
            isClickable : {
                type : Boolean,
                default : false
            }
        },
        methods: {
            onTagClicked : function(/*event*/) {
                console.log('onTagClicked tagId : ' + this.tagId + ' tag name : ' + this.name)
                this.$emit('tag-clicked', {'tagId' : this.tagId});
            }
        }
    }
</script>

<style lang="scss">

.tag-span {
    display: flex;
    flex-direction: row;
    font-size: 0.75em;

    margin: 2px;
    padding: 3px;
    border: solid 1px  #656565; 
    border-radius: 6px;

    background-color: #f9bd9f;

    cursor: auto; 
    user-select: text;

    width: fit-content;
}

.clickable {
    cursor: pointer;
}

#remove-tag-button {
    background-color: transparent;
    border: 1px #9e9e9e solid;
    border: 0;
    margin: -2px;
    cursor: pointer;
}

#remove-tag-button:after{
  display: inline-block;
  background-color: transparent;
  content: "\00d7";
//   border: 1 solid #fefefe;
}


#remove-tag-button:hover{
    cursor: pointer;
}
</style>