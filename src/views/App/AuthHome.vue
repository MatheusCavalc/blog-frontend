<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import moment from 'moment';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

let stories = ref('')

const getStories = () => {
    axios.get('http://localhost/api/stories')
        .then((response) => {
            stories.value = response.data
        })
}

onMounted(getStories)
</script>

<template>
    <AuthLayout>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-16 mt-16">
            <div class="bg-white overflow-hidden sm:rounded-lg">

                <div class="grid grid-cols-3 gap-4 mt-12">
                    <div class="col-span-2">

                        <div v-for="story in stories" :key="story.id" class="border-b border-b-gray-200 my-7">
                            <div class="flex flex-row items-left">
                                <p class="ml-4 block">
                                    <img class="h-6 w-6 rounded-full"
                                        src="https://avatars.githubusercontent.com/u/105112560?v=4" alt="sexmaster" />
                                </p>
                                <p class="block ml-2">{{ story.editor_name }}</p>
                                <p class="block mx-1 -my-1 text-gray-500">.</p>
                                <p class="block">{{ moment(story.created_at).format('MMMM D, YYYY') }}</p>
                            </div>

                            <div class="flex overflow-hidden">

                                <div class="flex-initial">
                                    <div class="container-home">
                                        <router-link :to="{ path: 'story/' + story.slug + '/' + story.id }"
                                            class="cursor-pointer">
                                            <QuillEditor v-model:content="story.title" contentType="html"
                                                readOnly="true" theme="bubble" :toolbar="[[{ 'header': 2 }]]" />
                                        </router-link>

                                        <div id="text" class="session-content -mt-3 my-5">
                                            <router-link :to="{ path: 'story/' + story.slug + '/' + story.id }">
                                                <QuillEditor v-model:content="story.content" contentType="html"
                                                    readOnly="true" theme="bubble"
                                                    :toolbar="[['bold', 'italic', 'link'], [{ 'header': 1 }, { 'header': 2 }, 'blockquote'], ['image']]" />
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex-initial ml-20">
                                    <router-link :to="{ path: 'story/' + story.slug + '/' + story.id }">
                                        <img class="object-scale-down w-20 h-20"
                                            :src="`http://localhost/api/image/${story.image}`" />
                                    </router-link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="">09</div>
                </div>

            </div>
        </div>
    </AuthLayout>
</template>

<style>
.container-home .ql-editor p {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 19px;
    height: 70px;
    width: 480px;
    line-height: 24px;
    letter-spacing: -.003em;
    overflow: hidden;
    cursor: pointer;
}

.container-home .ql-bubble .ql-editor h2 {
    cursor: pointer;
}

.container-home {
    cursor: pointer;
    max-width: 500px;
}
</style>
