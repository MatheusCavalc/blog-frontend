<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import HeaderProfile from '@/components/HeaderProfile.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import axios from 'axios';
import moment from 'moment';
import { ref, onMounted } from 'vue';

let my_stories = ref('')
let user_name = ref('')
let loading = ref('')
loading.value = true

const getStories = () => {
    axios.get('http://localhost/api/profile')
        .then((response) => {
            my_stories.value = response.data.stories
            user_name.value = response.data.user_name
            loading.value = false
        })
}

onMounted(getStories)
</script>

<template>
    <AuthLayout>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-20">
            <div class="bg-white sm:rounded-lg">
                <div class="grid grid-cols-3 gap-12">

                    <div class="col-span-2 mt-14">
                        <template v-if="loading">
                            <LoadingSpinner />
                        </template>

                        <template v-else>
                            <div class="flex justify-between">
                                <p class="block text-5xl font-medium tracking-tight">{{ user_name }}</p>

                                <Menu as="div" class="relative block pr-16">
                                    <MenuButton
                                        class="font-medium tracking-tighter text-2xl text-gray-500 hover:text-black">
                                        ...
                                    </MenuButton>
                                    <div>
                                        <transition enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems
                                                class="absolute right-0 z-10 ml-6 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <MenuItem v-slot="{ active }">
                                                <a href="/profile"
                                                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-center text-sm text-gray-700']">
                                                    Copy link to profile
                                                </a>
                                                </MenuItem>
                                                <MenuItem v-slot="{ active }">
                                                <a href="/profile"
                                                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-center text-sm text-gray-700']">
                                                    Design your profile
                                                </a>
                                                </MenuItem>
                                            </MenuItems>
                                        </transition>
                                    </div>
                                </Menu>
                            </div>

                            <HeaderProfile />

                            <div v-for="story in my_stories" :key="story.id" class="mt-12 border-b border-b-gray-200">
                                <p class="text-gray-500">{{ moment(story.created_at).format('MMMM D,YYYY') }}</p>
                                <router-link :to="{ path: 'story/' + story.slug + '/' + story.id }">
                                    <p class="mt-5 text-3xl font-extrabold tracking-tighter">{{ story.title_preview }}</p>
                                </router-link>
                                <p class="mt-8 mb-24 text-lg">{{ story.content_preview }}</p>
                            </div>
                        </template>
                    </div>

                    <div class="border-l border-l-gray-200 h-screen">
                        <div class="mt-11 ml-10 mr-3">
                            <p>
                                <img class="h-24 w-24 rounded-full"
                                    src="https://avatars.githubusercontent.com/u/105112560?v=4" alt="sexmaster" />
                            </p>

                            <p class="mt-4 mb-5 font-medium">
                                {{ user_name }}
                            </p>

                            <router-link to="/me/settings/account" class="text-sm text-green-700">
                                Edit profile
                            </router-link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </AuthLayout>
</template>