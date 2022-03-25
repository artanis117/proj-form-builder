<template>
    <div class="choices-container noselect">
        <div class="choices-form">
            <input type="text" v-model="new_choice" placeholder="Enter a new choice..." />
            <button-component :text="'Add'" @click="addChoice" :size="'small'" />
        </div>
        <div v-if="all_choices.length" class="choices-list">
            <div v-for="(choice, index) in all_choices"
                :key="index">
                <span v-character-detector="max_choice_length">{{ choice }}</span>
                <a @click="removeChoice(choice)">remove</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { CharacterDetector } from '@/directives/directives'
    import ButtonComponent from '@/components/utils/ButtonComponent'
    import { MAX_CHOICE_LENGTH } from '@/api/config'

    export default {
        name: 'choice-editor-component',
        components: {
            ButtonComponent
        },
        directives: {
            CharacterDetector: CharacterDetector
        },
        props: {
            choices: {
                type: Array,
                default: () => ([])
            },
            is_ordered: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                all_choices: [],
                new_choice: '',
                max_choice_length: MAX_CHOICE_LENGTH
            }
        },
        methods: {
            addChoice() {
                if(this.new_choice && !this.all_choices.includes(this.new_choice)) {
                    this.all_choices.unshift(this.new_choice)
                    this.sortChoices()
                    this.$emit('changed', this.all_choices)
                    this.new_choice = ''
                }
            },
            removeChoice(choice) {
                this.all_choices = this.all_choices.filter(i => i !== choice)
                this.$emit('changed', this.all_choices)
            },
            sortChoices() {
                if (this.is_ordered) { 
                    this.all_choices.sort((a, b) => {
                        return a.toLowerCase().localeCompare(b.toLowerCase())
                    })
                }
            }
        },
        created() {
            this.all_choices = [...this.choices]
            this.sortChoices()
        }
    }
</script>

<style lang="scss">
    .choices-container {
        color: var(--black);
        border-radius: 5px;
        border: 1px solid gray;
        .choices-form {
            display: flex;
            align-items: center;
            input[type=text] {
                padding: 0.3rem 0.5rem;
                color: var(--black);
                border: 0px;
                border-bottom: 1px solid gray;
                width: 90%;
            }
        }
        .choices-list {
            & > div {
                position: relative;
                padding: 0.5rem;
                &:hover {
                    background: silver;
                    a {
                        display: inline-block;
                    }
                }
                a {
                    display: none;
                    position: absolute;
                    font-size: 0.8em;
                    color: red;
                    right: 0.5rem;
                    cursor: pointer;
                }
            }
        }
    }
</style>
