<template>
    <div id="main">
         <Header title="我的喵喵"/>
       <Footer/>
    </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/TabBar'

export default {
     components:{
        Header,
        Footer
    },
    name:'Mine'
}
</script>

<style>

</style>