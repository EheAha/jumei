<template>
    <div>
        
        <main>
            <router-view></router-view>
        </main>
        <TabBar></TabBar>  
    </div> 
</template>

<script>
    import TabBar from 'components/layout/TabBar.vue'
    export default {
        components:{
            TabBar
        }
    }
</script>

<style lang='stylus' scoped>
    div
        position relative
        width 100%
        height 100%
        main 
            width 100%
            height 100%
</style>