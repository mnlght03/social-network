<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    required?: boolean
    type?: string
    errors?: string[]
  }>(),
  {
    required: false,
    type: 'text',
  },
)

const model = defineModel()

const id = useId()
</script>

<template>
  <div>
    <label
      :for="id"
      class="block ml-4 text-sm font-medium text-gray-700"
    >
      {{ label }} <template v-if="required">*</template>
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      class="mt-1 block px-4 py-2 w-full border border-gray-300 rounded-full shadow-sm sm:text-sm focus:outline-blue-500"
      :placeholder="placeholder"
      :required="required"
    >
    <ui-errors
      v-if="errors?.length"
      class="ml-4"
      :errors="errors"
    />
  </div>
</template>
