<template>
    <ul>
        <li><p>Процент побед: {{ winProcent }}%</p></li>
        <li><p>Любимый герой: {{ heroes[lovedHeroId-2].localized_name }}  </p></li>
        <li><p>Количество побед: {{ winLose.win }}</p></li>
        <li><p>Количество поражений: {{ winLose.lose }} </p></li>
        <li><p>Одиночный рейтинг: {{ soloMMR }} </p></li>
        <li><p>Рейтинг в группе: {{ partyMMR }}</p></li>
        <h1 v-if="status == '400'">Пользователь не найден</h1>
        <h1 v-if="status == '500'">Ваш профиль закрыт</h1>
    </ul>
</template>
<script>
import axios from 'axios'

export default {
  name: 'dotastats',
  props: ['id'],
  data () {
      return {
        login: this.id,
        numId: '',
        lovedHeroId: 0,
        winLose: {},
        heroes: [],
        soloMMR: '',
        partyMMR: '',
        status: '', 
        boolStatus: false
      }
  },
  computed: {
      winProcent: function () {
          return Math.round(this.winLose.win/(this.winLose.win+this.winLose.lose)*100);
      },
  },
  mounted() {
      this.info = '';
      this.boolStatus = false;
        axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=DB76B93679C3B95CF1251002336AAE3E&vanityurl=${this.login}`)
        .then((response) => {
          this.numId = response.data.response.steamid;
          this.numId = Number(this.numId.substr(-16,16)) - 6561197960265728;
          return axios.get(`https://api.opendota.com/api/players/${this.numId}/wl`)
        })
        .then((response) => { 
            this.winLose = response.data;
            return axios.get(`https://api.opendota.com/api/players/${this.numId}/heroes`)
        })
        .then((response) => {
            this.lovedHeroId = parseInt(response.data[0].hero_id);
            return axios.get(`https://api.opendota.com/api/heroes`)
        })
        .then((response) => {
            this.heroes = response.data;
             return axios.get(`https://api.opendota.com/api/players/${this.numId}`)
        })
        .then((response) => {
            this.soloMMR = response.data.solo_competitive_rank;
            this.partyMMR = response.data.mmr_estimate.estimate;
        })
        .catch(error => {
          if (error.response) {
           this.status = error.response.status;
           this.boolStatus = true;
          } 
        })
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-form {
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
}
.search ul{
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
h1{
    font-size: 2rem;
    color: #fff;
}
.search ul li{
    margin-top: 15px;
    font-size: 20px;
    padding: 7px 15px;
    background-color: rgba(255,255,255,.6);
    border-radius: 5px;
    box-shadow: 4px 4px 50px rgba(0,0,0,.3);
}
</style>
