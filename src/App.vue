<script setup lang="ts">
import { onMounted } from 'vue'
import AccountHeader from '@/components/account/AccountHeader.vue'
import AccountUser from '@/components/account/AccountUser.vue'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { CircleHelp } from 'lucide-vue-next'

import { useUserStore } from './stores/usersStore'
const userStore = useUserStore()

onMounted(() => {
  userStore.getUsersForLocalStorage()
})
</script>

<template>
  <div class="container">
    <main class="main">
      <AccountHeader @create="userStore.addUser" />
      <Alert class="mb-10">
        <CircleHelp />
        <AlertDescription>
          Для указания нескольких меток для одной пары логин/пароль используйте
          разделитель ;
        </AlertDescription>
      </Alert>
      <div>
        <div
          class="grid grid-cols-[1fr_140px_1fr_1fr_40px] gap-4 mb-3 text-gray-500"
        >
          <p>Метки</p>
          <p>Тип записи</p>
          <p>Логин</p>
          <p>Пароль</p>
        </div>

        <AccountUser
          @update:modelValue="userStore.updateUser"
          @delete="userStore.deleteUser"
          v-for="user of userStore.users"
          :key="user.id"
          :modelValue="user"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.container {
  max-width: 980px;
  margin: 0px auto;
}

.main {
  padding: 80px 0px;
}
</style>
