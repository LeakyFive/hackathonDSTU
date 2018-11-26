<template>
  <div id="app">
    <header>
        <div class="wrapper">
            <a href="index.html"></a>
            <ul>
                <li><a href="#stream">Стримы</a></li>
                <li><a href="#tournament">Турниры</a></li>
                <li><a href="#news">Новости</a></li>
                <li><a href="#comands">Команды</a></li>
    
                <li><a href="login.html">войти</a></li>
            </ul>
        </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/styles/app.css';
</style>
