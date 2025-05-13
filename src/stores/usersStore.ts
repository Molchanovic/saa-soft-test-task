
import type { IUser } from './types'
import { defineStore } from "pinia";

const defaultData = [
  {
    id: 1,
    password: '',
    login: 'Ilya',
    type: 'ldap',
    tags: [{ text: 'kasd' }, { text: '12313' }],
  },
  {
    id: 2,
    password: '',
    login: 'Matvey',
    type: 'ldap',
    tags: [{ text: '333' }, { text: '666' }],
  },
  {
    id: 3,
    password: '123456',
    login: 'Picheneg',
    type: 'local',
    tags: [{ text: '2122kasd' }, { text: 'kas2321d' }],
  },
  {
    id: 4,
    password: '123456',
    login: 'Agent007',
    type: 'local',
    tags: [{ text: 'ka123123123231sd' }, { text: 'ka23123sd' }],
  },
]

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: [] as IUser[]
    }
  },
  getters: {
    userLength: (state) => state.users.length
  },
  actions: {
    saveUsersForLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    getUsersForLocalStorage() {
      const data = localStorage.getItem('users')
      const users = JSON.parse(data)
      if (users) {
        this.$patch({ users: [...users] })
      }
      else {
        this.$patch({ users: [...defaultData] })
        this.saveUsersForLocalStorage()
      }

    },

    deleteUser(id: number) {
      this.$patch({ users: this.users.filter((user: IUser) => user.id !== id) })
      this.saveUsersForLocalStorage()
    },
    updateUser(user: IUser) {
      const index = this.users.findIndex((item: IUser) => item.id === user.id)
      this.$patch(() => {
        this.users.splice(index, 1, user)
      })
      this.saveUsersForLocalStorage()
    },
    addUser() {
      this.users.push({
        id: this.userLength + 1,
        password: '',
        login: '',
        type: 'ldap',
        tags: [],
      },)
      this.saveUsersForLocalStorage()
    },
  },
})