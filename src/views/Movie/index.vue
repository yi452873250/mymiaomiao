<template>
    <div id="main">
       <Header  title="喵喵电影"/>
       <Footer/>
    </div>
</template>
<script>

import Header from '@/components/Header'
import Footer from '@/components/TabBar'

export default {
    name:'Movie',
    components:{
        Header,
        Footer
    }
}
</script>

<style>

</style>