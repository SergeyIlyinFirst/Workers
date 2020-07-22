<template>
  <v-app>
    <v-layout justify-space-around row wrap align-content-space-between>
      <v-flex xs11 sm6 md4>
        <br>
        <v-card>
          <v-card-title primary-title>
            <v-form ref="form" v-model="valid" lazy-validation v-if="worker">
              <h3 class="headline mb-3">Редактор</h3>
              <p>Имя и фамилия:</p>
              <v-text-field
                v-model="worker.name"
                :rules="nameRules"
                label="Имя Фамилия"
                required
              ></v-text-field>
              <p>Номер телефона:</p>
              <v-text-field
                v-model="worker.phone"
                :rules="phoneRules"
                label="+7 (000) 000-0000"
                required
              ></v-text-field>
              <p>Дата рождения:</p>
              <v-text-field
                v-model="worker.birthday"
                :rules="birthdayRules"
                label="DD.MM.YYYY"
                required
              ></v-text-field>
              <v-select
                v-model="worker.role"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Должность"
                required
              ></v-select>
              <v-checkbox
                v-model="worker.isArchive"
                label="В архиве"
                required
              ></v-checkbox>
              <v-btn
                class="box"
                :disabled="!valid"
                @click="redirect"
                color="primary"
              >
                Назад
              </v-btn>
            </v-form>
            <div v-else>
              <h3>Не существующий сотрудник!</h3>
              <v-btn class="box" @click="redirect">На главную</v-btn>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs11 sm6 md4>
        <br>
        <v-card>
          <v-card-title primary-title>
            <div v-if="worker">
              <h3 class="headline mb-0">{{worker.name}}</h3>
              <div>
                <br>
                {{worker.phone}}
                <br>
                {{worker.birthday}}
                <br>
                {{worker.role}}
                <br>
                {{worker.isArchive}}
              </div>
            </div>
            <div v-else>
              <h3>Не существующий сотрудник!</h3>
            </div>
          </v-card-title>
        </v-card>
        <br>
        <br>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    nameRules: [
      v => !!v || 'Не указано имя',
      v =>
        /^[а-яА-Я\\.][а-яА-Я \\.]{1,30}$/.test(v) || 'Не корректные имя и фамилия'
    ],
    phoneRules: [
      v => !!v || 'Не указан номер телефона',
      v =>
        /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{4}){1,20}$/.test(v) || 'Не корректный номер телефона'
    ],
    birthdayRules: [
      v => !!v || 'Не указана дата рождения',
      v => /(0[1-9]|[12][0-9]|3[01])[- ..](0[1-9]|1[012])[- ..](19|20)\d\d/.test(v) || 'Не корректная дата рождения'
    ],
    items: [
      { state: 'Повар', abbr: 'cook' },
      { state: 'Официант', abbr: 'waiter' },
      { state: 'Водитель', abbr: 'driver' }
    ]
  }),
  computed: {
    worker () {
      return this.$store.state.workers.find(
        n => n.id === +this.$route.params.id
      )
    }
  },
  methods: {
    redirect () {
      this.$router.push('/')
      console.log('Работа с редактором завершена!')
    }
  }
}
</script>
