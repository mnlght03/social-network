<script setup lang="ts">
import {
  BellIcon,
  BookmarkIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  PencilIcon,
  UserIcon,
} from '@heroicons/vue/16/solid'
import IconLogo from '~/public/logo.svg'

const darkMode = useDarkMode()

const { defaultTransition } = useTailwindConfig()

const tabs = [
  {
    icon: HomeIcon,
    text: 'Home',
    to: '/',
  },
  {
    icon: HashtagIcon,
    text: 'Explore',
    to: '/',
  },
  {
    icon: BellIcon,
    text: 'Notifications',
    to: '/',
  },
  {
    icon: InboxIcon,
    text: 'Messages',
    to: '/',
  },
  {
    icon: BookmarkIcon,
    text: 'Bookmarks',
    to: '/',
  },
  {
    icon: DocumentTextIcon,
    text: 'Lists',
    to: '/',
  },
  {
    icon: UserIcon,
    text: 'Profile',
    to: '/',
  },
  {
    icon: EllipsisHorizontalCircleIcon,
    text: 'More',
    to: '/',
  },
]
</script>

<template>
  <div class="hidden md:block xs:col-span-1 xl:col-span-2">
    <div class="sticky top-0">
      <div class="flex flex-col ">
        <div
          class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20"
          :class="defaultTransition"
        >
          <NuxtLink
            to="/"
            @click.prevent="darkMode = !darkMode"
          >
            <IconLogo
              class="w-6 h-6"
              :class="darkMode ? 'text-dim-600' : 'text-dim-100'"
              :font-controlled="false"
            />
          </NuxtLink>
        </div>

        <nav class="mt-2 flex flex-col gap-3">
          <LayoutNavbarTab
            v-for="(tab, i) in tabs"
            :key="i"
            :to="tab.to"
          >
            <template #icon>
              <component :is="tab.icon" />
            </template>
            {{ tab.text }}
          </LayoutNavbarTab>

          <UiButton class="xl:hidden">
            <PencilIcon class="w-6 h-6 font-bold" />
          </UiButton>
        </nav>
      </div>
    </div>
  </div>
</template>
