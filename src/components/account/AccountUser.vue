<script setup lang="ts">
import type { IUser } from './types'
import { ref, watch } from 'vue'

import * as zod from 'zod'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { UserType } from './types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-vue-next'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const emit = defineEmits(['delete', 'update:modelValue'])
const props = defineProps<{
  modelValue: IUser
}>()

const validationSchema = toTypedSchema(
  zod.object({
    tags: zod.string().max(50, { message: 'Слишком много символов' }),
    login: zod
      .string()
      .min(1, { message: 'Поле обязательно' })
      .max(100, { message: 'Слишком много символов' }),
    password:
      props.modelValue.type === UserType.local
        ? zod
            .string()
            .min(1, { message: 'Поле обязательно' })
            .max(100, { message: 'Слишком много символов' })
        : zod.string(),
  })
)

const { handleSubmit, errors, setFieldError } = useForm({
  validationSchema,
})

const { value: login } = useField('login', null, {
  initialValue: props.modelValue.login,
})
const { value: password } = useField('password', null, {
  initialValue: props.modelValue.password,
})
const { value: tags } = useField('tags', null, {
  initialValue: props.modelValue.tags.map((item) => item.text).join(';'),
})

const changeUserType = (value: string) => {
  const user = JSON.parse(JSON.stringify(props.modelValue))
  user.type = value
  login.value = ''
  password.value = ''
  setFieldError('login', undefined)
  setFieldError('password', undefined)

  emit('update:modelValue', user)
}

const onSubmit = handleSubmit(() => {
  const user = JSON.parse(JSON.stringify(props.modelValue))
  user.tags = tags.value.split(';').map((item) => {
    return { text: item }
  })
  user.login = login.value
  user.password = password.value

  emit('update:modelValue', user)
})
</script>

<template>
  <form
    @change="onSubmit"
    class="user-item grid grid-cols-[1fr_140px_1fr_1fr_40px] gap-4 mb-2"
  >
    <FormField name="tags">
      <FormItem>
        <FormControl>
          <Input
            type="text"
            placeholder="Значение"
            name="tags"
            v-model="tags"
          />
        </FormControl>
        <FormMessage /> </FormItem
    ></FormField>

    <FormItem>
      <Select
        :modelValue="modelValue.type"
        @update:modelValue="changeUserType"
        :defaultValue="modelValue.type"
        class="w-full"
      >
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Тип пользователя" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="UserType.ldap"> LDAP </SelectItem>
            <SelectItem :value="UserType.local"> Локальная </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>

    <FormField name="login">
      <FormItem :class="{ 'col-span-2': modelValue.type === UserType.ldap }">
        <FormControl>
          <Input
            v-model="login"
            name="login"
            type="text"
            placeholder="Значение"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="password">
      <FormItem v-if="modelValue.type !== UserType.ldap">
        <FormControl>
          <Input
            v-model="password"
            name="password"
            type="password"
            placeholder="Значение"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      @click="emit('delete', modelValue.id)"
      class="size-10 text-1xl cursor-pointer"
      variant="ghost"
    >
      <Trash2 class="size-5" />
    </Button>
  </form>
</template>
<style lang="scss"></style>
