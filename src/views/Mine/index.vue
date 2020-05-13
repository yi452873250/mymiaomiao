<template>
    <div id="main">
         <Header title="我的喵喵"/>
        <div id="content">
            <Login/>
        </div>
       <Footer/>
    </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/TabBar'
import Login from '@/components/Login'

export default {
     components:{
        Header,
        Footer,
         Login
    },
    name:'Mine'
}
</script>

<style>

</style>