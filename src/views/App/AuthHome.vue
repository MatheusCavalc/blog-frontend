<script setup>
import { ref, onMounted } from 'vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import axios from 'axios';
import moment from 'moment';

let stories = ref('')

let loading = ref('')
loading.value = true

const getStories = () => {
    axios.get('http://localhost/api/stories')
        .then((response) => {
            stories.value = response.data
            loading.value = false
        })
}

onMounted(getStories)
</script>

<template>
    <AuthLayout>
        <div class="mx-auto mt-16 max-w-7xl sm:px-6 lg:px-16">
            <div class="overflow-hidden bg-white sm:rounded-lg">

                <template v-if="loading">
                    <LoadingSpinner />
                </template>

                <template v-else>
                    <div class="grid grid-cols-3 gap-4 mt-12">
                        <div class="col-span-2">
                            <div v-for="story in stories" :key="story.id" class="border-b border-b-gray-200 my-7">
                                <div class="flex flex-row items-left">
                                    <p class="block ml-4">
                                        <img class="w-6 h-6 rounded-full"
                                            src="https://avatars.githubusercontent.com/u/105112560?v=4" alt="sexmaster" />
                                    </p>
                                    <p class="block ml-2">{{ story.editor_name }}</p>
                                    <p class="block mx-1 -my-1 text-gray-500">.</p>
                                    <p class="block">{{ moment(story.created_at).format('MMMM D, YYYY') }}</p>
                                </div>

                                <router-link :to="{ path: 'story/' + story.slug + '/' + story.id }" class="cursor-pointer">
                                    <div class="flex mt-2 mb-5 overflow-hidden">
                                        <div class="flex-initial">
                                            <div class="container-home">
                                                <div class="my-3 ml-4 session-title">
                                                    <h1 class="font-bold">{{ story.title_preview }}</h1>
                                                </div>

                                                <div class="my-3 ml-4 session-content">
                                                    <p class="">{{ story.content_preview }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <template v-if="story.image">
                                            <div class="flex-initial ml-20">
                                                <img class="object-scale-down w-32 h-32"
                                                    :src="`http://localhost/api/image/${story.image}`" />
                                            </div>
                                        </template>
                                    </div>
                                </router-link>
                            </div>
                        </div>

                        <div class="">09</div>
                    </div>
                </template>

            </div>
        </div>
    </AuthLayout>
</template>

<style>
.session-title {
    font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: rgb(41, 41, 41);
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0px;
    overflow: hidden;
}

.session-content {
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
}
</style>
