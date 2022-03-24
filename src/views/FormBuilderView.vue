<template>
    <section class="container form-builder-page">
        <article class="form-builder-container">
            <div class="form-builder-title">
                Field Builder
            </div>
            <div class="form-builder-content">
                <div class="form-row">
                    <div class="form-label">
                        <label for="label">A Value is required</label>
                    </div>
                    <div class="form-field">
                        <div>
                            <input
                                id="label"
                                type="text"
                                v-model="form.label"
                                :class="{ error: !is_valid_label }" />
                            </div>
                        <div v-if="!is_valid_label" class="form-error">
                            The label field is required!
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label">Type</div>
                    <div class="form-field">
                        Multi-select 
                        <input type="checkbox" v-model="form.required" id="is-required" />
                        <label for="is-required">A Value is required</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label">
                        <label for="default">Default Value</label>
                    </div>
                    <div class="form-field">
                        <input type="text" v-model="form.default" id="default" />
                    </div>
                </div>
                <div class="form-row align-top">
                    <div class="form-label">Choices</div>
                    <div class="form-field">
                        <choice-editor-component
                            :key="rerender"
                            :choices="form.choices"
                            :is_ordered="!!form.choices_order"
                            :class="{ error: !is_valid_choices }"
                            @changed="updateFormChoices" />
                        <div v-if="!is_valid_choices" class="form-error">
                            The maximum number of choices you can add is {{ valid_choice_max }}
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label">
                        <label for="choices_order">Order</label>
                    </div>
                    <div class="form-field">
                        <input type="checkbox" v-model="form.choices_order" id="choices-order" />
                        <label for="choices-order">Display choices in alphabetical order</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label">
                    </div>
                    <div class="form-field actions">
                        <button-component :text="'Save changes'" @click="handleFormSave" />
                        <a @click="handleFormReset" class="reset-form-btn"> Reset form </a>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
    import { mapActions } from 'vuex'
    import ButtonComponent from '@/components/utils/ButtonComponent'
    import ChoiceEditorComponent from '@/components/forms/ChoiceEditorComponent'
    import mockedFormFields from '@/api/mocks/mockedFormFields'
    import { USE_MOCK_DATA, MAXIMUM_NUMBER_OF_CHOICES } from '@/api/config'
    
    const TEST_ID = 1

    export default {
        name: 'form-builder-view',
        components: {
            ButtonComponent,
            ChoiceEditorComponent
        },
        data() {
            return {
                form: {},
                rerender: 0,
                valid_choice_max: MAXIMUM_NUMBER_OF_CHOICES,
                is_form_reset: false
            }
        },
        computed: {
            is_valid_choices() {
                return !this.form.choices || this.form.choices.length <= this.valid_choice_max
            },
            is_valid_label() {
                return !!this.form.label
            }
        },
        methods: {
            ...mapActions(['getFormBuilder', 'saveFormBuilder']),
            updateFormChoices(choices) {
                this.form.choices = [...choices]
            },
            validateForm() {
                return this.is_valid_label && this.is_valid_choices
            },
            handleFormSave() {
                if (this.validateForm()) {
                    if (!this.form.choices.includes(this.form.default)) {
                        this.form.choices.unshift(this.form.default)
                    }
                    this.saveFormBuilder(this.form).then(response => {
                        this.loadFormBuilder(this.form)
                        console.log('SUCCESS! Backend responded with:', response)
                    }).catch((err) => {
                        console.log('REQUEST ERROR CAUGHT:', err)
                    })
                }
            },
            handleFormReset() {
                this.is_form_reset = true
                this.form.choices = []
                this.form.label = ''
                this.form.required = false
                this.form.default = ''
                this.form.displayAlpha = false
                this.form.choices_order = false
                this.rerender++
                localStorage.clear()
            },
            loadFormBuilder(data) {
                this.form = { ...data }
                this.rerender++
            },
            fetchFormBuilder() {
                this.getFormBuilder(TEST_ID).then((response) => {
                    this.loadFormBuilder(response.data)
                }).catch((err) => {
                    console.log('REQUEST ERROR CAUGHT:', err)
                })
            },
            saveBuilderFormLocally(data) {
                localStorage.setItem('field-builder-form', JSON.stringify(data))
            },
            getBuilderFormLocally() {
                let formJSON = localStorage.getItem('field-builder-form')
                if (formJSON) {
                    return JSON.parse(formJSON)
                }
                return null
            }
        },
        watch: {
            "form.choices_order"() {
                this.rerender++
            },
            form: {
                handler(newValue, oldValue) {
                    if (!this.is_form_reset) {
                        this.saveBuilderFormLocally(newValue)
                    }
                    this.is_form_reset = false
                },
                deep: true
            }
        },
        mounted() {
            const data = this.getBuilderFormLocally()
            if (data) {
                this.loadFormBuilder(data)
            } else if (USE_MOCK_DATA) {
                this.fetchFormBuilder()
            } else {
                // there is no endpoint for fetching any initial data
                this.loadFormBuilder(mockedFormFields[0])
            }
            
        }
    }
</script>

<style lang="scss" scoped>
    .form-builder-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--black);
        margin: 1rem auto;
        font-size: 1.1em;
        .form-builder-container {
            min-width: 70%;
            border-radius: 5px;
            border: 1px solid var(--color1);
            .form-builder-title {
                font-size: 1.3em;
                font-weight: bold;
                padding: 1rem 1.5rem;
                color: var(--color1);
                background: var(--color2);
                border-bottom: 1px solid var(--color1);
            }
            .form-builder-content {
                padding: 1.5rem;
                background-color:rgba(255, 255, 255, 0.7);
                .form-row {
                    margin-top: 1.5rem;
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    &.align-top {
                    align-items: flex-start;
                    }
                    label {
                        cursor: pointer;
                    }
                    .form-label {
                        font-weight: bold;
                        width: 30%;
                    }
                    .form-field {
                        flex: 1;
                        input[type=checkbox] {
                            display: inline-block;
                            margin-left: 1rem;
                        }
                        input[type=text] {
                            padding: 0.3rem 0.5rem;
                            color: var(--black);
                            border-radius: 5px;
                            border: 1px solid gray;
                            width: calc(100% - 1.2rem);
                        }
                        .error {
                            border: 1px solid red !important;
                            &:focus{
                                outline: none;
                            }
                        }
                    }
                    .form-error {
                        margin-top: 0.5rem;
                        font-size: 0.8em;
                        color: red;
                    }
                }
                .reset-form-btn {
                    display: inline-block;
                    cursor: pointer;
                    margin-left: 1rem;
                    color: red;
                }
            }
        }
    }

    @media (max-width: 576px) {
        .form-builder-page {
            justify-content: flex-start;
            .form-builder-container {
                width: 90%;
                .form-builder-content {
                    .form-row {
                        flex-direction: column;
                        .form-label, .form-field {
                            width: 100%;
                        }
                        .form-field.actions a {
                            margin-top: 1.5rem;
                        }
                    }
                }
            }
        }
    }
</style>
