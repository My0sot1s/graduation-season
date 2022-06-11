<template>
  <div id="backstage">
      <div id="head">
          <div id="title">后台管理</div>
      </div>
      <input type="text" class="input" placeholder="输入以搜索" v-model="param">
      <ul id="myWishes">
        <li v-for="wish in wishes" :key="wish.messageId">
            {{ wish.text }}
            <div class="delete" @click="deletem(wish)">删除</div>
            <div class="types">{{ wish.createTime }}</div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            originWishes:[
                
            ],
            param:""
        }
    },
    computed: {
        wishes: function() {
            return this.originWishes.filter( (wish) => {
                return wish.text.match(this.param)
            })
        }
    },
    methods:{
        deletem(wish){
            console.log(wish)
            this.$axios.post('/delete',
                    {
                        'id':wish.messageId
                    },
                    {headers:{
                        'Token':localStorage.getItem('token')
                    }})
                    .then((response) => {
                        if(response.data.code == 200){
                            this.originWishes.splice(this.originWishes.findIndex(owish => owish.messageId == wish.messageId), 1)
                        }
                })
        },
    },
    mounted(){
        this.$axios.get('/info/allMessage',{
            headers:{
                'Token':localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.originWishes = response.data.data.reverse()
                for(let i = 0; i < this.originWishes.length; i++){
                    console.log(i)
                    let now = new Date(this.originWishes[i].createTime)
                    let nian = now.getFullYear()
                    let yue = (now.getMonth() + 1).toString().padStart(2, '0')
                    let ri = now.getDate().toString().padStart(2, '0')
                    let shi = now.getHours().toString().padStart(2, '0')
                    let fen = now.getMinutes().toString().padStart(2, '0')
                    let miao = now.getSeconds().toString().padStart(2, '0')
                    this.originWishes[i].createTime = `${nian}-${yue}-${ri} ${shi}:${fen}:${miao}`
                }
            })
            .catch((response) => {
                console.log(response);
            })
    }
}
</script>

<style scoped>
    #head{
        color:rgb(77,65,95);
        width: 100vw;
        height: 10vh;
        line-height: 10vh;
        display: grid;
        place-items: center;
    }
    #title{
        height: 7vh;
        line-height: 7vh;
        font-size: 4vh;
        position: absolute;
        text-align: center;
        margin:0 7vw 1vh 7vw;
        font-family: HYYiHeXianJingW;
    }
    input {
        margin: 0 10vw;
        width: 80vw;
        height: 5vh;
        text-align: center;
        opacity: 0.9;
    }
    .delete {
        display: inline-block;
        position: absolute;
        right: 4vw;
        font-size: 1.5vh;
        color: rgb(245,108,108);
    }
    #myWishes{
        height: 75vh;
        position: relative;
        overflow: scroll;
        background-color: white;
        margin: 5vh 10vw 10vh 10vw;
        opacity: 0.9;
        border: 1px solid gray;
    }
    #myWishes>li {
        height: 10vh;
        line-height: 10vh;
        border-bottom: 1px solid gray;
        text-align: center;
        padding: 2vh 2vw;
    }
    .types {
        font-size: 1.5vh;
        height: 2vh;
        line-height: 2vh;
        position: absolute;
        right: 2vw;
    }
</style>