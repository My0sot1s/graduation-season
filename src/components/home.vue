<template>
  <div id="home" v-cloak>
      <div id="head">
          <div id="title">菁华于初，再见未央</div>
          <div id="more" @touchstart="goToRankingList()">查看更多祝福></div>
      </div> 
      <div id="barrage" >
          <div class="label" id="l1" @animationiteration="updateBarrage(1)">
              <div class="circle" id="circle1"></div>
              <div class="content" id="c1">
                  <div class="h" id="h1">{{texts[1].grade}}·{{texts[1].labelType}}</div>
                  <div class="b" id="b1">{{texts[1].text}}</div>
                  <div class="f" id="f1" @touchstart.stop="favor(1)">
                    <div class="fav" id="fav1" :style="{backgroundImage:`url(${img[1]})`}"></div>
                      {{texts[1].favorNum}}
                  </div>
              </div>
          </div>
          
          <div class="label" id="l2" @animationiteration="updateBarrage(2)">
              <div class="circle" id="circle2"></div>
              <div class="content" id="c2">
                  <div class="h" id="h2">{{texts[2].grade}}·{{texts[2].labelType}}</div>
                  <div class="b" id="b2">{{texts[2].text}}</div>
                  <div class="f" id="f2" @touchstart.stop="favor(2)">
                    <div class="fav" id="fav2" :style="{backgroundImage:`url(${img[2]})`}"></div>
                      {{texts[2].favorNum}}
                  </div>
              </div>
          </div>
      </div>
      
      
      <div id="bottom">
          <div id="write" @touchstart.stop="goToMyWish()">送出你的祝福 </div>
      </div>
  </div>    
</template>

<script>
import like from '../assets/pictures/like.png'
import liked from '../assets/pictures/liked.png'

export default {
    name:'home',
    data(){
        return{
            texts:[
                {
                    labelType:"",
                    createTime:0,
                    favorNum:0,
                    messageId:0,
                    openId:"string",
                    text:"tess",
                    grade:""
                },
                {
                    labelType:"",
                    createTime:0,
                    favorNum:0,
                    messageId:0,
                    openId:"",
                    text:"test1",
                    grade:""
                },
                {
                    labelType:"",
                    createTime:0,
                    favorNum:0,
                    messageId:0,
                    openId:"",
                    text:"222",
                    grade:""
                },
            ],
            wishes:[
                
            ],
            favored:[
                
            ],
            img:[
                '',
                like,
                like
            ],
            startx:0,
            endx:0,
        }
    },
    methods: {
        favor(index){
            if(this.img[index] == like){
                this.$set(this.img, index, liked)
                this.texts[index].favorNum++
                this.$axios.post('/favor',
                    {
                        'id':this.texts[index].messageId
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
        pause(num){
            document.getElementById('l'+num).style.animationPlayState="paused";
        },
        goToMyWish(){
            this.$router.push('/myWish')
        },
        goToRankingList(){
            this.$router.push('/rankingList')
        },
        initBarrage(num){
            if(this.favored.find(id => id == this.texts[num].messageId && id !== undefined)){
                //点赞过时
                this.$set(this.img, num, liked)
            }else{
                this.$set(this.img, num, like)
            }
        },
        updateBarrage(num){
            document.getElementById('l'+num).style = `top:${Math.round(Math.random()*20)}vh`
            if(this.wishes.length){
                this.$set(this.texts,num,{
                    createTime:this.wishes[0].createTime,
                    favorNum:this.wishes[0].favorNum,
                    messageId:this.wishes[0].messageId,
                    openId:this.wishes[0].openId,
                    picture:this.wishes[0].picture,
                    text:this.wishes[0].text,
                    grade:this.wishes[0].grade,
                    labelType:this.wishes[0].labelType,
                });

                this.initBarrage(num)
                
                console.log("弹幕"+num+"更新了")

                this.wishes.shift()
            }
        },
        getRandom(){
            this.$axios.get('/info/random',{
                headers:{
                    'Token':localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response)
                    for(let i=0;i<8;i++){
                        this.wishes.push(
                            {
                                color:0,
                                createTime:0,
                                favorNum:0,
                                messageId:0,
                                openId:"string",
                                picture:0,
                                text:"This is a wish",
                            },
                        )
                        this.$set(this.wishes,this.wishes.length-1,{
                            createTime:response.data.data[i].createTime,
                            favorNum:response.data.data[i].favorNum,
                            messageId:response.data.data[i].messageId,
                            openId:response.data.data[i].openId,
                            text:response.data.data[i].text,
                            grade:response.data.data[i].grade,
                            labelType:response.data.data[i].labelType,
                        });
                        /* console.log("响应对象：")
                        console.log(this.wishes[i]) */
                    }
                })
                .catch((response) => {
                    console.log(response);
                })
        },
        touch0(event){
            var movex, nx, touch;
            //开始触摸函数，event为触摸对象
            var box = document.getElementById('box');//获取DOM标签
            if(event.type=="touchstart"){//通过if语句判断event.type执⾏了哪个触摸事件
                console.log('开始');
                touch = event.touches[0];//获取开始的位置数组的第⼀个触摸位置
                this.startx = Math.floor(touch.pageX);//获取第⼀个坐标的X轴
                console.log(this.startx)
            }else if(event.type=="touchmove"){//触摸中的坐标获取
                console.log('滑动中');
                touch = event.touches[0];
                movex = Math.floor(touch.pageX);
            }else if(event.type == "touchend" || event.type == "touchcancel"){//当⼿指离开屏幕或系统取消触摸事件的时候
                this.endx = Math.floor(event.changedTouches[0].pageX);//获取最后的坐标位置
                console.log(this.startx+";"+this.endx)
                console.log('结束');
                nx = this.endx-this.startx;//获取开始位置和离开位置的距离
                console.log(nx)
                //判断滑动⽅向
                if(nx > 66){
                    alert('右滑动');
                    return false;
                }else if(nx < -66){
                    alert('左滑动');
                    return false;
                }
            }
        }
    },
    mounted(){
        //添加触摸事件的监听，并自行⾃定义触摸函数
        /* document.body.addEventListener('touchstart',this.touch0);
        document.body.addEventListener('touchmove',this.touch0);
        document.body.addEventListener('touchend',this.touch0); */

        document.getElementById('background0').style.opacity = 1
        //获取已点赞愿望的id
        this.$axios.get('/info/mySubmit',{
            headers:{
                'Token':localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.favored=response.data.data
            })
            .catch((response) => {
                console.log(response);
            })
        //获取随机愿望
        this.$axios.get('/info/random',{
            headers:{
                'Token':localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response)
                //更新愿望列表
                for(let i=0;i<response.data.data.length;i++){
                    this.wishes.push(
                        {
                            createTime:0,
                            favorNum:0,
                            messageId:0,
                            openId:"string",
                            picture:0,
                            text:"This is a wish",
                            grade:"",
                            labelType:"",
                        },
                        )
                        this.$set(this.wishes,this.wishes.length-1,{
                            createTime:response.data.data[i].createTime,
                            favorNum:response.data.data[i].favorNum,
                            messageId:response.data.data[i].messageId,
                            openId:response.data.data[i].openId,
                            picture:response.data.data[i].picture,
                            text:response.data.data[i].text,
                            grade:response.data.data[i].grade,
                            labelType:response.data.data[i].labelType,
                        });
                }
                //对初始两条愿望赋值
                for(let j=1;j<=2;j++){
                    if(this.wishes.length > 0){
                        this.$set(this.texts,j,{
                            createTime:this.wishes[0].createTime,
                            favorNum:this.wishes[0].favorNum,
                            messageId:this.wishes[0].messageId,
                            openId:this.wishes[0].openId,
                            text:this.wishes[0].text,
                            grade:response.data.data[0].grade,
                            labelType:response.data.data[0].labelType,
                        }
                        );
                        this.initBarrage(j)
                        this.wishes.shift()
                        /* console.log("读取对象:") */
                        console.log(this.texts[j])
                        document.getElementById('l'+j).style.animationPlayState="running"
                    }
                }
                setInterval(() => {
                    this.getRandom()
                    console.log("定时刷新了弹幕库")
                }, 20000);
            })
            .catch((response) => {
                console.log(response);
            })
    },
    beforeDestroy(){
        /* document.body.removeEventListener('touchstart',this.touch0)
        document.body.removeEventListener('touchmove',this.touch0)
        document.body.removeEventListener('touchend',this.touch0) */
    }
}
</script>

<style scoped>
    *{
        overflow: hidden;
    }
    @keyframes label{
        0%{
            opacity: 0;
        }
        25%{
            opacity: 1;
        }
        66%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    #home{
        width: 100vw;
        height: 100vh;
    }
    #head{
        color:rgb(15,75,111);
        position: relative;
        top: 8vh;
        width: 100vw;
        height: 12vh;
        line-height: 10vh;
        font-family: HYYiHeXianJingW;
    }
    #title{
        height: 7vh;
        line-height: 7vh;
        font-size: 4vh;
        position: absolute;
        text-align: center;
        margin:0 7vw 1vh 7vw;
    }
    #title > span{
        font-size: 5vh;
    }
    #more{
        position: absolute;
        bottom: 0%;
        right: 0%;
        font-size: 1.7vh;
        margin:0 5vw;
        height: 3vh;
        line-height: 3vh;
        color:rgb(77,65,95);
        font-family: HYMingChanKeBenW;
    }
    #barrage{
        position: relative;
        top: 10vh;
        width: 100vw;
        height: 43vh;
        font-family: HYMingChanKeBenW;
    }
    .label {
        width: 38vw;
        height: 23vh;
        background-color: white;
        border-radius: 4vw;
        opacity: 0;
    }
    #l1 {
        position: absolute;
        left: 8vw;
        top: 15vh;
        animation: label 5s linear 1s infinite;
        animation-play-state: paused;
    }
    #l2 {
        position: absolute;
        right: 8vw;
        top: 10vh;
        animation: label 5s linear 2s infinite;
        animation-play-state: paused;
    }
    .circle {
        width: 1.5vh;
        height: 1.5vh;
        border-radius: 50%;
        position: absolute;
        top: 0.7vh;
        left: 50%;
        transform: translate(-50%, 0);
    }
    #circle1 {
        background-color: rgb(47,148,176);
    }
    #circle2 {
        background-color: rgb(15,75,111);
    }
    .content {
        height: 19vh;
        width: 36vw;
        position: absolute;
        top: 2.2vh;
        display: flex;
        flex-direction: column;
        padding: 1vh 1vw;
        text-align: center;
    }
    .h {
        height: 3vh;
        margin: 0 8vw;
        border-bottom: 1px solid black;
    }
    .b {
        flex-grow: 1;
        display: grid;
        place-items: center;
        font-size: 3vh;
    }
    .f {
        margin: 0 8vw;
        padding-top: 1vh;
        border-top: 1px solid black;
        height: 3vh;
    }
    .fav {
        display: inline-block;
        width: 2vh;
        height: 1.8vh;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    #background {
        width: 100vw;
        height: 45vh;
        position: absolute;
        top:0;
        left: 0;
        margin:0;
        padding:0;
    }
    .icons{
        width: 7vh !important;;
        height: 7vh !important;
        display: inline-block;
        position: absolute;
        top:50%;
        right:0%;
        transform: translate(0,-50%);
    }
    #bottom{
        position: relative;
        top: 10vh;
        width:100vw;
        height: 35vh;
        font-family: HYYiHeXianJingW;
    }
    #write{
        width: 76vw;
        height: 7vh;
        line-height: 7vh;
        margin: 0 12vw;
        position: absolute;
        bottom: 13%;
        text-align: center;
        color: rgb(77,65,95);
        font-size: 2.5vh;
        background-color: white;
        font-weight: 100;
    }
    #write:after{
       content:url(../assets/pictures/pen.png);
    }
</style>