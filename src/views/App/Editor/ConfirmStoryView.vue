<script setup>
import { ref } from 'vue';
import { postStory } from '@/services/functions'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

let title = localStorage.getItem("title")
let story = localStorage.getItem("content")
let userName = localStorage.getItem("userName")
let userId = localStorage.getItem("userId")
let tags = ref('')

const postContent = () => {
    event.preventDefault()
    let parameters = {
        tags: tags.value,
        title: title,
        content: story,
        editor_id: userId,
        editor_name: userName
    }
    postStory(parameters)
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
                                    <input id="dropzone-file" type="file" @change="previewFiles" class="hidden" />
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

                        <button @click="postContent" class="mt-4 bg-green-600 rounded-full p-3 text-white text-sm">
                            Publish now
                        </button>
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