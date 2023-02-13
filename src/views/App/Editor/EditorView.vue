<script setup>
import EditorLayout from '@/layouts/EditorLayout.vue';
import { ref } from 'vue';
import { postStory } from '@/services/functions'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

const title = ref('')
const story = ref('')
let userName = localStorage.getItem("userName")
let userId = localStorage.getItem("userId")

const postContent = () => {
    event.preventDefault()
    let parameters = {
        title: title.value,
        content: story.value,
        editor_id: userId,
        editor_name: userName
    }
    postStory(parameters)
}
</script>

<template>
    <EditorLayout>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-28 mt-2">
            <div class="bg-white overflow-hidden sm:rounded-lg pt-10 pb-32 px-32">

                <div class="title">
                    <QuillEditor v-model:content="title" contentType="html" theme="bubble" placeholder="Title"
                        :toolbar="[[{ 'header': 2 }]]" />
                </div>

                <div id="text" class="session-write mt-6">
                    <QuillEditor v-model:content="story" contentType="html" theme="bubble"
                        placeholder="Tell your story…"
                        :toolbar="[['bold', 'italic', 'link'], [{ 'header': 1 }, { 'header': 2 }, 'blockquote'], ['image']]" />
                </div>
            </div>

            <button @click="postContent" class="bg-green-600 text-white text-sm font-bold ml-9 py-2 px-5 rounded-full">
                Publish
            </button>
        </div>
    </EditorLayout>

</template>

<style>
.title .ql-editor p {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
}

.session-write .ql-editor p {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
}
</style>