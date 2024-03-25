<template>
  <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
    <h3 class="font-bold text-gray-800 dark:text-gray-200">
      <slot name="title"></slot>
    </h3>
    <button type="button"
            class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-overlay="#hs-bg-gray-on-hover-cards" @click="$emit('close')">
      <span class="sr-only">Close</span>
      <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
    </button>
  </div>
</template>