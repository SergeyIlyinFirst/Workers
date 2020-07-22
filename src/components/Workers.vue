<template>
  <v-app>
    <v-content>
      <v-card>
        <v-card-title>
          <v-layout align-center>
            <v-checkbox v-model="isArchive" hide-details class="shrink mr-2" label="В архиве"></v-checkbox>
            <v-flex xs10 sm6>
              <v-select
                v-model="select"
                :hint="`${select.state}`"
                :items="role"
                item-text="state"
                item-value="abbr"
                label="Должность"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-flex>
          </v-layout>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="success" class="box">Добавить</v-btn>
            <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-title>
                  <span class="headline">Новый сотрудник</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <p>Имя и фамилия:</p>
                        <v-text-field :rules="nameRules" required v-model="editedItem.name" label="Имя Фамилия"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          required
                          :rules="roleRules"
                          v-model="editedItem.role"
                          :items="addRole"
                          item-text="state"
                          item-value="abbr"
                          label="Должность"
                          persistent-hint
                          single-line
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <p>Номер телефона:</p>
                        <v-text-field required :rules="phoneRules" v-model="editedItem.phone" label="+7 (000) 000-0000"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <p>Дата рождения:</p>
                        <v-text-field required :rules="birthdayRules" v-model="editedItem.birthday" label="DD.MM.YYYY"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-checkbox v-model="editedItem.isArchive" hide-details class="shrink mr-2" label="В архиве" ></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="box" color="blue darken-1" flat @click.native="close">Отмена</v-btn>
                  <v-btn :disabled="!valid" class="box" color="blue darken-1" flat @click.native="addWorker">Сохранить</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialog2"
            width="500"
          >
            <v-btn
              class="box"
              slot="activator"
              color="red lighten-2"
              dark
            >
              Vue
            </v-btn>
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Инструменты
              </v-card-title>
              <v-card-text>
                <transition enter-active-class="animated jello">
                  <h3 v-if="dialog2"> При разработке приложения использованы такие инструменты, как
                  Vue.js, Vue-cli, Vue Router, Vuex, и Vuetify.</h3>
                </transition>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="box"
                  color="primary"
                  flat
                  @click="dialog2 = false"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="filteredWorker"
          :search="search"
          hide-actions
          no-data-text
        >
          <template slot="items" slot-scope="props">
            <td class="line"><router-link class="line" :to="'/edit/'+ props.item.id">{{ props.item.name }}</router-link></td>
            <td class="text-xs-left">{{ props.item.birthday }}</td>
            <td class="text-xs-left">{{ props.item.role }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
          <template slot="no-data">
            <v-flex>
                <h3>Нет данных!</h3>
            </v-flex>
          </template>
        </v-data-table>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import('animate.css')
var id = 18
export default {
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  data () {
    return {
      info: false,
      search: '',
      valid: true,
      isArchive: false,
      editedIndex: -1,
      dialog: false,
      dialog2: false,
      roleRules: [
        v => !!v || 'Не выбрана должность'
      ],
      nameRules: [
        v => !!v || 'Не указано имя',
        v => /^[а-яА-Я][а-яА-Я \\.]{1,20}$/.test(v) || 'Не корректные имя и фамилия'
      ],
      phoneRules: [
        v => !!v || 'Не указан номер телефона',
        v => /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{4}){1,20}$/.test(v) || 'Не корректный номер телефона'
      ],
      birthdayRules: [
        v => !!v || 'Не указана дата рождения',
        v => /(0[1-9]|[12][0-9]|3[01])[- ..](0[1-9]|1[012])[- ..](19|20)\d\d/.test(v) || 'Не корректная дата рождения'
      ],
      editedItem: {
        id: id,
        name: '',
        isArchive: false,
        role: '',
        phone: '',
        birthday: ''
      },
      defaultItem: {
        id: ++id,
        name: '',
        isArchive: false,
        role: '',
        phone: '',
        birthday: ''
      },
      select: { state: 'Все', abbr: '' },
      role: [
        { state: 'Все', abbr: '' },
        { state: 'Повар', abbr: 'cook' },
        { state: 'Официант', abbr: 'waiter' },
        { state: 'Водитель', abbr: 'driver' }
      ],
      addRole: [
        { state: 'Повар', abbr: 'cook' },
        { state: 'Официант', abbr: 'waiter' },
        { state: 'Водитель', abbr: 'driver' }
      ],
      headers: [
        { text: 'Имя', align: 'left', value: 'name', sortable: true },
        { text: 'Дата рождения', value: 'birthday', sortable: true },
        { text: 'Должность', value: 'role', sortable: false },
        { text: 'Номер телефона', value: 'phone', sortable: false },
        { text: 'Удалить', align: 'left', value: 'add', sortable: false }
      ]
    }
  },
  methods: {
    deleteItem (item) {
      const index = this.$store.state.workers.indexOf(item)
      confirm('Вы уверены, что хотите удалить сотрудника?') && this.$store.state.workers.splice(index, 1)
      console.log('Сотрудник удалён!')
    },
    addWorker () {
      if (this.$refs.form.validate()) {
        this.$store.commit('addWorker', this.editedItem)
        this.close()
        console.log('Сотрудник добавлен!')
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  },
  computed: {
    filteredWorker () {
      if (this.select.abbr !== '') {
        console.log('Фильтрация по должности!')
        return this.$store.state.workers.filter(worker => worker.role.includes(this.select.abbr) && worker.isArchive === this.isArchive)
      } else {
        return this.$store.state.workers.filter(worker => worker.isArchive === this.isArchive)
      }
    }
  }
}
</script>

