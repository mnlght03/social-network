<script setup lang="ts">
const whatsHappening = [
  {
    title: 'Bitcoin new ATH',
    sub: '70000 USD',
  },
  {
    title: 'SpaceX',
    sub: '18.8k posts',
  },
]

const whoToFollow = [
  {
    name: 'Josh Woods',
    handle: '@joshwoods',
    image: 'https://picsum.photos/200/200',
  },
]
</script>

<template>
  <div class="col-span-12 md:block md:col-span-3 xl:col-span-4 bg-blue-500">
    <aside>
      <WidgetCard title="What's happening">
        <WidgetCardItem v-for="item, i in whatsHappening" :key="i">
          <h3 class="font-bold text-base dark:text-white text-gray-800">
            {{ item.title }}
          </h3>
          <div class="text-xs text-gray-400">
            {{ item.sub }}
          </div>
        </WidgetCardItem>
      </WidgetCard>

      <WidgetCard title="Who to follow">
        <WidgetCardItem v-for="item, i in whoToFollow" :key="i">
          <div class="flex items-center p-2">
            <img class="w-10 h-10 rounded-full" :src="item.image" alt="">

            <div class="ml-2">
              <h1 class="text-base font-bold text-gray-900 dark:text-white">
                {{ item.name }}
              </h1>
              <div class="text-xs text-gray-400">
                {{ item.handle }}
              </div>
            </div>

            <button class="ml-auto px-4 py-2 text-xs font-bold text-white dark:text-black bg-black dark:bg-white rounded-full h-fit">
              Follow
            </button>
          </div>
        </WidgetCardItem>
      </WidgetCard>
    </aside>
  </div>
</template>

<style module lang="scss"></style>
