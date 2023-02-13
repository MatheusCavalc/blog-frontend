<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { ref, onMounted } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import axios from "axios";

const route = useRoute()

let id = route.params.id
let title = ref('')
let content = ref('')
let editor_name = ref('')
let created_at = ref('')

const getStory = () => {
    axios.get('http://localhost/api/stories/' + id).then((response) => {
        title.value = response.data['title']
        content.value = response.data['content']
        editor_name.value = response.data['editor_name']
        created_at.value = response.data['created_at']
    })
}

onMounted(getStory)

</script>

<template>
    <AuthLayout>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-16 mt-16">
            <div class="bg-white overflow-hidden sm:rounded-lg">

                <div class="grid grid-cols-3 gap-4 mt-12">
                    <div class="col-span-2">
                        <div class="flex flex-row items-left">
                            <p class="ml-4 block">
                                <img class="h-12 w-12 rounded-full"
                                    src="https://avatars.githubusercontent.com/u/105112560?v=4" alt="sexmaster" />
                            </p>
                            <div class="absolute ml-20">
                                <p class="block">{{ editor_name }}</p>
                                <p class="mt-0.5 text-gray-500">{{ moment(created_at).format('MMMM D, YYYY') }}</p>
                            </div>
                        </div>
                        <div class="my-7">
                            <div class="">
                                <QuillEditor v-model:content="title" contentType="html" readOnly="true" theme="bubble"
                                    :toolbar="[[{ 'header': 2 }]]" />
                            </div>

                            <div id="text" class="session-read -mt-1 my-5">
                                <QuillEditor v-model:content="content" contentType="html" readOnly="true" theme="bubble"
                                    :toolbar="[['bold', 'italic', 'link'], [{ 'header': 1 }, { 'header': 2 }, 'blockquote'], ['image']]" />
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
.session-read .ql-editor p {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 22px;
    line-height: 1.58;
    letter-spacing: -.003em;
}
</style>