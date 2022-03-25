<template>
    <section class="container about-page">
        <article class="about-content">
            <div class="about-title"> About this app </div>
            <div class="about-info">
                <div>
                    This application was created in response to a job application to Quickbase.
                </div>
                <div><strong>Time it took:</strong> a few hours</div>
                <div><strong>Technologies used:</strong> vuejs, vuex, vue-router</div>
                <div><strong>External libraries:</strong> axios (used for AJAX requests) and axios-mock-adapter</div>
                <div>
                    <strong>Configuration:</strong> You can change values in config.js to achieve different results:
                    <ul>
                        <li>
                            POST_API_URL - you can change the api to which you want to make real requests to
                        </li>
                        <li>
                            USE_MOCK_DATA_BY_DEFAULT - You can choose whether to mock the requests or not by default.
                            You can still switch between mocked and not mocked in the application.
                            There are 3 preloaded Form Fields that are always mocked. 
                            When using mocks the data can actually change with real requests that is not the case, 
                            because such requests do not exist yet.
                        </li>
                        <li>
                            MAXIMUM_NUMBER_OF_CHOICES - You can choose another value for maximum number of choices. By default it is 50.
                        </li>
                        <li>
                            MAX_CHOICE_LENGTH - You can change the maximum length of the choice text before it gets marked with red.
                        </li>
                        <li>
                            MOCK_DELAY - You can choose how long the mock adapter should wait before returning the mocked response.
                        </li>
                    </ul>
                </div>
                <div>
                    <strong>Besides the core requirements the following additional ones were completed:</strong>
                    <ul>
                        <li>Handling of responsiveness for smaller screens.</li>
                        <li>Saving of form progress in case of browser refreshing or closing.</li>
                        <li>Choices longer than 40 characters are mar<span style="color: red">ked with red</span>.</li>
                        <li>Button component is reusable.</li>
                    </ul>
                </div>
                <div><strong>Link to github:</strong>
                    <a href="https://github.com/artanis117/proj-form-builder" target="_blank">
                        https://github.com/artanis117/proj-form-builder
                    </a>
                </div>
                <div><strong>App developer:</strong> <em>Kiril Stoev</em></div>
            </div>
        </article>
    </section>
</template>

<script>
    export default {
        name: 'about-view'
    }
</script>

<style lang="scss" scoped>
    .about-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--black);
        margin: 1rem auto;
        .about-content {
            min-width: 50%;
            border-radius: 10px;
            padding: 1.5rem;
            border: 1px solid white;
            background-color:rgba(255, 255, 255, 0.7);
            .about-title {
                text-align: center;
                font-weight: bold;
                font-size: 1.2rem;
            }
            .about-info {
                margin-top: 1.5rem;
                div {
                    margin-top: 1rem;
                }
            }
        }
    }
</style>
