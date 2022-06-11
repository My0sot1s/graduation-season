<template>
  <div id=myWish>
      <div id="head">
          <div id="title">菁华于初，再见未央</div>
      </div>

      <div id="edit">
          <div id="myWish">
            <div id="wishText">你的<span>祝福</span>是 ：</div>
            <input type="text" class="input" v-model="wishText">
          </div>

          <div id="icon">
            <div id="iconText">你的<span>入学时间</span>是 ：</div>
            <div class="input" @click="show()">{{grade}}</div>
            <div id="dropdown" v-if="this.showDropdown">
                <div class="choices" @click="updateGrade(`2015级`)">2015级</div>
                <div class="choices" @click="updateGrade(`2016级`)">2016级</div>
                <div class="choices" @click="updateGrade(`2017级`)">2017级</div>
                <div class="choices" @click="updateGrade(`2018级`)">2018级</div>
                <div class="choices" @click="updateGrade(`2019级`)">2019级</div>
                <div class="choices" @click="updateGrade(`2020级`)">2020级</div>
                <div class="choices" @click="updateGrade(`2021级`)">2021级</div>
                <div class="choices" @click="updateGrade(`校友`)">校友</div>
                <div class="choices" @click="updateGrade(`教师`)">教师</div>
            </div>
          </div>

          <div id="color">
            <div id="colorText"><span>愿望签</span>的类型 ：</div>
            <div id="colorChoices" class="input">
                <div class="borders" id="b1" @click="pick(1)">
                    <div class="colorPickers" id="c1">留</div>
                </div>
                <div class="borders" id="b2" @click="pick(2)">
                    <div class="colorPickers" id="c2">赠</div>
                </div>
                <div class="borders" id="b3" @click="pick(3)">
                    <div class="colorPickers" id="c3">愿</div>
                </div>
            </div>
          </div>
      </div>

      <div id="bottom">
          <div id="makeWish" @touchstart="uploadMyWish()">送上祝福 </div>
      </div>
  </div>    
</template>

<script>

export default {
    name:'myWish',
    methods:{
        show(){
            this.showDropdown = !this.showDropdown
        },
        updateGrade(grade){
            this.grade = grade
            this.showDropdown = false
        },
        pick(id){
            for(let i=1;i<=3;i++){
                document.querySelector("#c"+i).style.color='rgb(201,197,206)'
            }
            document.querySelector("#c"+id).style.color='black'
            if(id == 1){
                this.labelType = "留"
            }else if(id == 2){
                this.labelType = "赠"
            }else if(id == 3){
                this.labelType = "愿"
            }
        },
        uploadMyWish(){
            this.$axios.post('/submit',{
                "grade": this.grade,
                "labelType": this.labelType,
                "message": this.wishText
            },
                {headers:{
                    token:localStorage.getItem('token')
                }}
            )
                .then((response) => {
                    alert(response.data.message)
                    if(response.data.code == 200){
                        this.$router.push('./rankingList')
                    }
                })
                .catch((response) => {
                    console.log(response);
                    alert("许愿失败")
                }) 
        }
    },
    data(){
        return{
            wishText:'',
            grade:'',
            labelType:'留',
            showDropdown: false
        }
    },
    mounted(){
        document.getElementById('background0').style.opacity = 0.4
    }
}
</script>

<style scoped>
    *{
        overflow: hidden;
    }
    #myWish{
        width: 100vw;
        height: 100vh;
    }
    #head{
        color:rgb(77,65,95);
        position: relative;
        top: 8vh;
        width: 100vw;
        height: 10vh;
        line-height: 10vh;
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
    #edit{
        position: relative;
        top: 10vh;
        width: 100vw;
        height: 75vh;
    }
    #edit > div{
        width: 86vw;
        height: 15vh;
        margin: 0 7vw;
        font-size: 2vh;
        color:rgb(77,65,95);
        font-family: HYYiHeXianJingW;
    }
    #icon {
        height: 60vh !important;
        z-index: 2;
    }
    #color {
        position: relative;
        top: -45vh;
    }
    #edit > div > div > span{
        font-size: 2.5vh;
    }
    .input {
        font-size: 3vh;
        margin-top: 1vh;
        padding: 0 5vw;
        width: 75vw;
        height: 7vh;
        line-height: 7vh;
        background-color: white;
        outline: none;
        border:1px solid gray;
        font-family: HYMingChanKeBenW;
    }
    #dropdown {
        position: relative;
        background-color: white;
        width: 85vw;
        z-index: 2;
        border:1px solid gray;
    }
    #dropdown > div {
        display: grid;
        place-items: center;
        text-align: center;
        height: 4vh;
    }
    .icons{
        line-height: 100%;
    }
    .background{
        width: 100%;
        height: 100%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    #colorChoices {
        text-align: center;
        display: flex;
        padding-top: 1vh;
        padding-bottom: 1vh;
    }
    .borders{
        flex-grow: 1;
    }
    #c1{
        border-right: 1px solid black;
        color:black;
    }
    #c2{
        color:rgb(201,197,206)
    }
    #c3{
        border-left: 1px solid black;
        color:rgb(201,197,206)
    }

    #bottom{
        position: relative;
        top: -20vh;
        width:100vw;
        height: 35vh;
    }
    #makeWish{
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
        font-family: HYYiHeXianJingW;
    }
    #makeWish:after{
        content:url(../assets/pictures/mail.png);
    }
</style>