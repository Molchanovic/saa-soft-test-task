<script setup lang="ts">
import { Button } from '@/components/ui/button'

const emit = defineEmits(['create'])
</script>

<template>
  <div class="account-header flex items-center mb-7">
    <h1 class="text-4xl lg:text-1xl">Учетные записи</h1>
    <Button
      @click="emit('create')"
      class="ml-5 size-10 text-1xl cursor-pointer"
      variant="outline"
    >
      +
    </Button>
  </div>
</template>

<style lang="scss"></style>
