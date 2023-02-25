<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import HeaderHome from '@/components/HeaderHome.vue';
import { ref } from 'vue';

const loading = ref('')
loading.value = false
</script>

<template>
    <AuthLayout>
        <div class="mx-auto mt-5 max-w-7xl sm:px-6 lg:px-16">
            <div class="bg-white sm:rounded-lg">

                <template v-if="loading">
                    <LoadingSpinner />
                </template>

                <template v-else>
                    <div class="grid grid-cols-3 gap-11">
                        <div class="col-span-2">

                            <HeaderHome />
                        
                            <div class="overflow-hidden">
                                
                            </div>
                        </div>

                        <div class="border-l border-l-gray-200">
                        </div>
                    </div>
                </template>

            </div>
        </div>
    </AuthLayout>
</template>