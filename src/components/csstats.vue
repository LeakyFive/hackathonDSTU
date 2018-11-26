<template>
    <ul>
        <li v-if="info != ''"><p>Общее количество убийств: {{info[1].value}}</p></li>
        <li v-if="info != ''"><p>Отношение убийств к смертям: {{Math.round(info[0].value/info[1].value*100)/100}}</p></li>
        <li v-if="info != ''"><p>Любимое оружие: {{ favouriteGun }}</p></li>
        <li v-if="info != ''"><p>Всего матчей сыграно в рейтинговых играх: {{info[105].value}}</p></li>
        <li v-if="info != ''"><p>Часов в рейтинговой игре: {{Math.round(info[2].value/60/60)}}</p></li>
      <h1 v-if="status == '400'">Пользователь не найден</h1>
      <h1 v-if="status == '500'">Ваш профиль закрыт</h1>
    </ul>
</template>
<script>
import axios from 'axios'

export default {
  name: 'csstats',
  props: ['id'],
  data () {
      return {
        login: this.id,
        numId: '',
        info: '',
        status: '', 
        favouriteGun: '',
        favouriteMap: '',
        boolStatus: false
      }
  },
  mounted() {
      this.info = '';
      this.boolStatus = false;
        axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=DB76B93679C3B95CF1251002336AAE3E&vanityurl=${this.login}`)
        .then((response) => {
          this.numId = response.data.response.steamid;
          return axios.get(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=DB76B93679C3B95CF1251002336AAE3E&steamid=${this.numId}`)
          })
        .then(response => { this.info = response.data.playerstats.stats; this.searchFavourite(); })
        .catch(error => {
          if (error.response) {
           this.status = error.response.status;
           this.boolStatus = true;
          } 
        })
  },
  methods: {
    searchFavourite: function() {
      let iter = 0;
      for (let i = 8; i < 23; i++) {
        if (parseInt(this.info[i].value) > this.favouriteGun) { this.favouriteGun = this.info[i].value; iter = i; }
      }
      let str = this.info[iter].name;
      this.favouriteGun = str.substr(12).toUpperCase();
    }
  }
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
