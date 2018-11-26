<template>
  <main>
    <!-- <label for="game">Выберите игру</label>
    <label for=""></label> --><div class="wrapper">
        <div class="chooseGame">
            <h2>Выберите игру</h2>
            <ul>
                <router-link :to="{ name: 'searchplayer'}"><li @click="setComponentInRoute" name='csstats'><img name="csstats" src="../assets/img/games/csgo.png" alt="csgo"></li></router-link>
                <router-link :to="{ name: 'searchplayer'}"><li @click="setComponentInRoute" name='dotastats'><img name="dotastats" src="../assets/img/games/dota2.png" alt="dota2"></li></router-link>
            </ul>
        </div>
    </div>

    <div v-bind:class="classObject" class="search-cont">
        <div class="search">
            <div class="wrapper">
                <div class="search-form">
                    <input type="text" v-model="id" placeholder="Введите свой ник или логин стим" required>
                    <router-link :to="{ name: this.routeComponent, params: { id: id }}"><button>Поиск</button></router-link>
                </div>
                <router-view :key="$route.fullPath"></router-view>
            </div>
        </div>
    </div>
  </main>


</template>
<script>
import axios from 'axios'

export default {
  name: 'searchplayer',
  data () {
    return {
      id: '',
      routeComponent: 'csstats',
      classObject: {
        'search-bg-csgo': true,
        'search-bg-dota': false
      },
      changeComponent: true,
    };
  },
  methods: {
    setComponentInRoute: function (event) {
      this.routeComponent = event.target.name;
      if (event.target.name == 'dotastats') {
        this.classObject['search-bg-csgo'] = false;
        this.classObject['search-bg-dota'] = true;
      } else {
        this.classObject['search-bg-csgo'] = true;
        this.classObject['search-bg-dota'] = false;
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.chooseGame ul{
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
}
.chooseGame li{
    transition: all .3s ease-in;
}
.chooseGame li:hover{
    background: #646060;
}
.chooseGame li > a{
    box-sizing: border-box;
    display: block;
    padding: 10px;
    border-radius: 5px;
}

.chooseGame li > a > img {
    width: auto;
    height: 100px;
} 
.search-cont{
    margin-top: 15px;
}
.search-bg-csgo{
  background: url(../assets/img/games/csgobg.jpg);
  background-size: cover;
}
.search-bg-dota{
  background: url(../assets/img/games/dotabg.jpg);
  background-size: cover;
}
.search {
    padding-top: 60px;
    width: 100%;
    height: 500px;
    background-color: rgba(0,0,0,0.3);
}

.search button{
    width: 15%;
    border-radius: 5px;
    border: 3px solid white;
    color: #777;
    background-color: white;
    font-size: 18px;
    cursor: pointer;
    transition: .25s;
    font-family: 'Calibri';
    font-weight: bold;
    transition: .3s all ease-in;
}
.search button:hover{
    color: #fff;
    background-color: #777;
}
.search button, .search input{
    border: 2px solid #284c7e;
    margin-bottom: 40px;
    height: 60px;
}


input {
    border-radius: 10px;
    font-size: 20px;
    padding-left: 35px;
    width: 80%;
    font-family: 'Calibri';
    font-weight: bold;
}
</style>
