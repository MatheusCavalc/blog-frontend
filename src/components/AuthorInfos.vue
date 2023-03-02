<script setup>
import { defineProps } from 'vue';

const props = defineProps(['name']);
</script>

<template>
    <div class="mt-28 ml-10 mr-3">
        <div class="">
            <p>
                <img class="h-24 w-24 rounded-full" src="https://avatars.githubusercontent.com/u/105112560?v=4"
                    alt="sexmaster" />
            </p>

            <p class="mt-4 font-medium">
                {{ props.name }}
            </p>

            <p class="mt-1 text-gray-500">
                744 Followers
            </p>

            <p class="mt-3 text-gray-500 text-sm tracking-tight">
                Front End Engineer @ Glovo // Vue.js Athens Meetup Coorganizer
            </p>

            <div class="flex mt-5">
                <button class="block px-4 py-2 text-base tracking-tighter text-white bg-gray-500 rounded-full">
                    Follow
                </button>

                <button class="block ml-2 px-2.5 py-1 text-base tracking-tight text-white bg-gray-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </button>
            </div>

        </div>
    </div>
</template>