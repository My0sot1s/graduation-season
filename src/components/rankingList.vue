<template>
  <div id="rankingList">
      <div id="head">
          <div id="title">菁华于初，再见未央</div>
      </div>
      <div id="back" @click="backToHome()">
        <div id="backImg" :style="{backgroundImage:`url(${back})`}"></div>
        <div id="backText">大家的愿望树</div>
      </div>
      <div class="text" id="myWishTitle" v-if="this.myWishes.length>1">我的祝福：</div>
      <div v-if="this.myWishes.length>1" id="m1" class="myWishes" @click="show(1)">{{this.myWishes[1].text}}
        <div class="delete" v-if="showDelete[1]" @click="deletem(1)">删除</div>
      </div>
      <div v-if="this.myWishes.length>2" id="m2" class="myWishes" @click="show(2)">{{this.myWishes[2].text}}
        <div class="delete" v-if="showDelete[2]" @click="deletem(2)">删除</div>
      </div>
      <div v-if="this.myWishes.length>3" id="m3" class="myWishes" @click="show(3)">{{this.myWishes[3].text}}
        <div class="delete" v-if="showDelete[3]" @click="deletem(3)">删除</div>
      </div>
      <div v-if="this.myWishes.length>4" id="m4" class="myWishes" @click="show(4)">{{this.myWishes[4].text}}
        <div class="delete" v-if="showDelete[4]" @click="deletem(4)">删除</div>
      </div>

      <div id="mostPopular" class="listBox">
          <div class="text">最受大家欢迎的祝福：</div>
          <ul id="rankList" class="list" :style="{height:`${40 + 7*(5-this.myWishes.length)}vh`}">
              <li id="r1" v-if="this.mostPopularWishes.length>1">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[1].text}}</div>
                      <div class="fav" @touchstart.stop="favor(1)">
                          <div class="icons" :style="{backgroundImage:`url(${img[1]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[1].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[1].grade}}·{{this.mostPopularWishes[1].labelType}}</div>
              </li>
              <li id="r2" v-if="this.mostPopularWishes.length>2">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[2].text}}</div>
                      <div class="fav" @touchstart.stop="favor(2)">
                          <div class="icons" :style="{backgroundImage:`url(${img[2]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[2].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[2].grade}}·{{this.mostPopularWishes[2].labelType}}</div>
              </li>
              <li id="r3" v-if="this.mostPopularWishes.length>3">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[3].text}}</div>
                      <div class="fav" @touchstart.stop="favor(3)">
                          <div class="icons" :style="{backgroundImage:`url(${img[3]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[3].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[3].grade}}·{{this.mostPopularWishes[3].labelType}}</div>
              </li>
              <li id="r4" v-if="this.mostPopularWishes.length>4">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[4].text}}</div>
                      <div class="fav" @touchstart.stop="favor(4)">
                          <div class="icons" :style="{backgroundImage:`url(${img[4]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[4].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[4].grade}}·{{this.mostPopularWishes[4].labelType}}</div>
              </li>
              <li id="r5" v-if="this.mostPopularWishes.length>5">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[5].text}}</div>
                      <div class="fav" @touchstart.stop="favor(5)">
                          <div class="icons" :style="{backgroundImage:`url(${img[5]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[5].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[5].grade}}·{{this.mostPopularWishes[5].labelType}}</div>
              </li>
              <li id="r6" v-if="this.mostPopularWishes.length>6">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[6].text}}</div>
                      <div class="fav" @touchstart.stop="favor(6)">
                          <div class="icons" :style="{backgroundImage:`url(${img[6]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[6].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[6].grade}}·{{this.mostPopularWishes[6].labelType}}</div>
              </li>
              <li id="r7" v-if="this.mostPopularWishes.length>7">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[7].text}}</div>
                      <div class="fav" @touchstart.stop="favor(7)">
                          <div class="icons" :style="{backgroundImage:`url(${img[7]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[7].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[7].grade}}·{{this.mostPopularWishes[7].labelType}}</div>
              </li>
              <li id="r8" v-if="this.mostPopularWishes.length>8">
                  <div class="row1">
                      <div>{{this.mostPopularWishes[8].text}}</div>
                      <div class="fav" @touchstart.stop="favor(8)">
                          <div class="icons" :style="{backgroundImage:`url(${img[8]})`}"></div>
                          <div class="num">{{this.mostPopularWishes[8].favorNum}}</div>
                      </div>
                  </div>
                  <div class="types">-{{this.mostPopularWishes[8].grade}}·{{this.mostPopularWishes[8].labelType}}</div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
var like = "https://wish-1309039959.file.myqcloud.com/graduate/assets/pictures/like.png"
var liked = "https://wish-1309039959.file.myqcloud.com/graduate/assets/pictures/liked.png"
var back = "https://wish-1309039959.file.myqcloud.com/graduate/assets/pictures/back.png"

export default {
    name:'rankingList',
    data(){
        return{
            showDelete:[
                0,0,0,0,0
            ],
            myWishes:[
                {},
            ],
            mostPopularWishes:[
                {
                    labelType:"",
                    createTime:0,
                    favorNum:0,
                    messageId:0,
                    openId:"",
                    text:"",
                    grade:""
                },
            ],
            favored:[
                
            ],
            back,
            img:[
                '',
                like,
                like,
                like,
                like,
                like,
                like,
                like,
                like
            ]
        }
    },
    methods:{
        backToHome(){
            this.$router.push('/home')
        },
        show(index){
            this.showDelete[index] == 1? (this.$set(this.showDelete, index, 0)) : (this.$set(this.showDelete, index, 1))
        },
        deletem(index){
            this.$axios.post('/delete',
                    {
                        'id':this.myWishes[index].messageId
                    },
                    {headers:{
                        'Token':localStorage.getItem('token')
                    }})
                    .then((response) => {
                        if(response.data.code == 200){
                            this.myWishes.splice(index, 1)
                            let deleteIndex = this.mostPopularWishes.findIndex(owish => owish.messageId == this.myWishes[index].messageId)
                            if(index != -1){
                                this.originWishes.splice(deleteIndex, 1)
                            }
                        }
                })
        },
        favor(index){
            console.log(this.mostPopularWishes[index].messageId)
            if(this.img[index] == like){
                this.$set(this.img, index, liked)
                this.mostPopularWishes[index].favorNum++
                this.$axios.post('/favor',
                    {
                        'id':this.mostPopularWishes[index].messageId
                    },
                    {headers:{
                        'Token':localStorage.getItem('token')
                    }})
                    .then((response) => {
                        console.log("点赞：")
                        console.log(response)
                })
            }
        },
        initListR(num){
            if(this.favored.find(id => id == this.mostPopularWishes[num].messageId && id !== undefined)){
                //点赞过时
                this.$set(this.img, num, liked)
            }else{
                this.$set(this.img, num, like)
            }
        },
    },
    mounted(){
        document.getElementById('background0').style.opacity = 0.4
        //获取我的愿望
        this.$axios.get('/user/wish',{
            headers:{
                'Token':localStorage.getItem('token')
            }
        })
            .then((response) => {
                for(let i=1;i<=response.data.data.length;i++){
                    this.$set(this.myWishes,i,{
                        createTime:response.data.data[i-1].createTime,
                        favorNum:response.data.data[i-1].favorNum,
                        messageId:response.data.data[i-1].messageId,
                        openId:response.data.data[i-1].openId,
                        text:response.data.data[i-1].text,
                        grade:response.data.data[i-1].grade,
                        labelType:response.data.data[i-1].labelType,
                    });
                }
            })
            .catch((response) => {
                console.log(response);
            })
        //获取点赞过的愿望
        this.$axios.get('/info/mySubmit',{
            headers:{
                'Token':localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.favored=response.data.data
                //获取排行榜
                this.$axios.get('/info/rank',{
                    headers:{
                        'Token':localStorage.getItem('token')
                    }
                })
                    .then((response) => {
                        for(let i=1;i<=response.data.data.length;i++){
                            this.$set(this.mostPopularWishes,i,{
                                createTime:response.data.data[i-1].createTime,
                                favorNum:response.data.data[i-1].favorNum,
                                messageId:response.data.data[i-1].messageId,
                                openId:response.data.data[i-1].openId,
                                text:response.data.data[i-1].text,
                                grade:response.data.data[i-1].grade,
                                labelType:response.data.data[i-1].labelType,
                            });
                            this.initListR(i)
                        }
                    })
                    .catch((response) => {
                        console.log(response);
                    })
            })
            .catch((response) => {
                console.log(response);
            })
    }
}
</script>

<style scoped>
    @keyframes delete{
        0%{
            transform: scale(0);
            opacity: 0;
        }
        100%{
            transform: scale(100%);
            opacity: 1;
        }
    }
    #back {
        position: absolute;
        top:3vh;
        right: 0vw;
        width: 20vw;
        height: 17vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #backImg {
        flex-grow: 9;
        background-repeat: no-repeat;
        background-position:center;
    }
    #backText {
        flex-grow: 1;
        font-size: 1vh;
        text-align: center;
        color: rgb(77,65,95);
        font-family: HYMingChanKeBenW;
    }
    .row1 {
        display: flex;
        justify-content: space-between;
    }
    .fav {
        display: flex;
        align-items: center;
        font-size: 1.8vh;
        justify-content: space-between;
    }
    .delete {
        display: inline-block;
        position: absolute;
        right: 4vw;
        font-size: 1.5vh;
        color: rgb(245,108,108);
        animation: delete 0.1s linear 0s 1;
    }
    .types {
        font-size: 1.5vh;
        height: 2vh;
        line-height: 2vh;
        position: absolute;
        right: 2vw;
    }
    .icons{
        display: inline-block;
        width: 2vh;
        height: 1.8vh;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 1vw;
    }
    .icons > div{
        font-size: 0.1vh;
    }
    #rankingList{
        width: 100vw;
        height: 200vh;
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
    #head{
        color:rgb(77,65,95);
        position: relative;
        top: 8vh;
        width: 100vw;
        height: 10vh;
        line-height: 10vh;
    }
    #myWishTitle {
        position: relative;
        top:10vh;
        font-family: HYYiHeXianJingW;
    }
    .text{
        width: 86vw;
        margin: 0 7vw 1vh 7vw;
        font-size: 2vh;
        color:rgb(77,65,95);
        font-family: HYYiHeXianJingW;
    }
    .myWishes{
        position: relative;
        top: 10vh;
        margin:0 5vw;
        width: 76vw;
        height: 7vh;
        margin: 0 7vw;
        padding: 0 5vw;
        background-color: white;
        color:rgb(77,65,95);
        font-size: 2.5vh;
        line-height: 7vh;
        border-bottom: 1px solid gray;
        font-family: HYMingChanKeBenW;
    }
    .listBox{
        position: relative;
        top: 10vh;
        margin-top: 2vh;
        height: 72vh;
    }
    .list{
        position: relative;
        width:86vw;
        height: 45vh;
        margin:0 7vw;
        background-color: white;
        overflow: scroll;
    }
    .list > li{
        position: relative;
        list-style-type: none;
        width: 80vw;
        height: 12vh;
        box-sizing: border-box;
        margin: 0 3vw 0.2vh 3vw;
        padding: 1vh 2vw 2vh 2vw;
        border-bottom: 0.2vh solid gray;
        background-color: white;
        color:rgb(77,65,95);
        font-size: 2.5vh;
        line-height: 8vh;
        font-family: HYMingChanKeBenW;
    }
    #rankList {
        height: 40vh;
    }
</style>