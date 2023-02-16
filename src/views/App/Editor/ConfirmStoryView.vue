<script setup>
import { ref } from 'vue';
import { postStory } from '@/services/functions'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

let tags = ref('')
let image = ref('');
let title = localStorage.getItem("title")
let story = localStorage.getItem("content")

const isButtonDisabled = ref('')
isButtonDisabled.value = false

const onFileChange = (e) => {
    image.value = e.target.files[0];
};

const postContent = () => {
    if (tags.value.trim().length === 0) {
        isButtonDisabled.value = false
        alert('Tags field dont be null')
    } else {
        event.preventDefault()
        isButtonDisabled.value = true
        let formdata = new FormData();
        formdata.append('tags', tags.value);
        formdata.append('image', image.value);
        formdata.append('title', title);
        formdata.append('content', story);

        postStory(formdata)
    }

    
}
</script>

<template>
    <nav class="bg-white px-2 sm:px-4 py-1 rounded">
        <div class="max-w-full flex flex-wrap items-center justify-between mr-36">
            <p></p>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul
                    class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                    <li>
                        <router-link to="/new-story">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-36 mt-20 mb-20">
            <div class="bg-white overflow-hidden sm:rounded-lg">

                <div class="grid grid-cols-2 gap-7">
                    <div>
                        <p class="font-semibold">Story Preview</p>

                        <div class="w-96 h-48 my-2">
                            <div class="flex items-center justify-center">
                                <label for="dropzone-file"
                                    class="flex flex-col items-center justify-center w-96 h-48 rounded-lg cursor-pointer bg-gray-50">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                            </path>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                            800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" @change="onFileChange" class="hidden" />
                                </label>
                            </div>
                        </div>

                        <div class="container-confirm">
                            <div class="">
                                <QuillEditor v-model:content="title" contentType="html" readOnly="true" theme="bubble"
                                    :toolbar="[[{ 'header': 2 }]]" />
                            </div>
                            <hr class="h-px -m-2 bg-gray-200 border-0 dark:bg-gray-700">
                            <div class="">
                                <QuillEditor v-model:content="story" contentType="html" readOnly="true" theme="bubble"
                                    :toolbar="[['bold', 'italic', 'link'], [{ 'header': 1 }, { 'header': 2 }, 'blockquote'], ['image']]" />

                            </div>
                            <hr class="h-px -m-2 bg-gray-200 border-0 dark:bg-gray-700">
                        </div>
                        <p class="mt-5">
                            Note: Changes here will affect how your story appears in public places like Medium’s
                            homepage and in subscribers’ inboxes — not the contents of the story itself.
                        </p>
                    </div>

                    <div class="ml-8">
                        <p>Publishing to: <span class="font-semibold">{{ userName }}</span></p>

                        <p class="my-2"> Add or change topics (up to 5) so readers know what your story is about</p>

                        <div>
                            <input type="text" id="search-navbar" v-model="tags"
                                class="block w-full py-4 pl-3 text-sm mt-3 text-gray-900 bg-gray-50 border border-gray-300"
                                placeholder="Add a topic...">
                        </div>

                        <template v-if="!isButtonDisabled">
                            <button :disabled="isButtonDisabled" @click="postContent" class="mt-4 bg-green-600 rounded-full p-3 text-white text-sm">
                                Publish now
                            </button>
                        </template>

                        <template v-else>
                            <button disabled type="button"
                                class="mt-4 bg-green-400 rounded-full p-3 text-white text-sm">
                                <svg aria-hidden="true" role="status"
                                    class="inline w-4 h-4 mx-1 text-white animate-spin" viewBox="0 0 100 101"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>
                                Loading...
                            </button>
                        </template>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<style>
.container-confirm .ql-editor p {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 19px;
    max-height: 70px;
    max-width: 500px;
    line-height: 24px;
    letter-spacing: -.003em;
}
</style>