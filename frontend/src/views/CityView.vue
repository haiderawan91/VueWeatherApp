<template>
    <div>
    <Suspense>
    <AsyncCityView/>
    <template #fallback>
    <p>
    Loading...
    </p>
    </template>
    </Suspense>
  
    </div>
</template>
<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue';
// const AsyncCityView = defineAsyncComponent(() => import('@/components/AsyncCityView.vue'));
</script>