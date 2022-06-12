<template>
  <div class="story" ref="story">
    <div
      class="first-ani"
      v-if="stage == 'first'"
      ref="first"
      @click="animateNext"
    >
      <p class="should-animate" data-delay="1200">
        我们从这里起航<span class="froze"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        走向遥远的地方<span class="froze"></span>
      </p>
      <p class="should-animate" data-delay="1200">当我们走向明天</p>
      <p class="br-bottom should-animate" data-delay="2400">
        又怎能把昨日遗忘<span class="heart"></span><span class="high"
          ></span
        >
      </p>
      <p class="should-animate" data-delay="1200">
        回首昨日<span class="green"></span>
      </p>
      <p class="br-bottom should-animate" data-delay="1200">
        那郁郁葱葱的日子<span class="flower"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        有过青涩<span class="hand"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        也有过芬芳<span class="hand"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        更有的是<span class="hand"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        相遇 相识 相知<span class="hand"></span>
      </p>
      <p class="br-bottom should-animate" data-delay="1200">
        那瑰丽的宝藏<span class="hand"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        今天，我们流泪了<span class="hand"></span>
      </p>
      <p class="br-bottom should-animate" data-delay="1200">
        那可不是忧伤 ——是歌唱<span class="hand"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        今天，我们分别了<span class="hand"></span>
      </p>
      <p class="should-animate" data-delay="1200">
        那可不是遗失——是珍藏<span class="hand"></span>
      </p>
    </div>

    <div class="second-ani" ref="second" v-if="stage == 'second'">
      <p class="should-animate" data-delay="danmaku">待疫情后……</p>
      <Star v-if="star" @end="star = false" />
      <FakeDanmaku :animating="animatingDanmaku" :handleFavor="handleFavor" />
      <transition name="fade">
        <div class="star-tip" v-if="showStarTip">
          <p class="animate">接下来试着：</p>
          <WishItem
            text="长按我"
            picture="8"
            color="5"
            :favored="favored"
            @favor="handleSampleFavor"
          />
        </div>
      </transition>

      <div class="start-journey" v-show="showJourneyTip" ref="journey">
        <router-link id="write" class="fancy-button" to="/myWish"
          >写下你的愿望</router-link
        >
      </div>
    </div>

    <!-- <div id="next" v-if="showArrow" @click="nextStage">→</div> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      showArrow: false,
      showJourneyTip: false,
      stage: "first",
      star: false,
      showStarTip: false,
      favored: false,
      animateTimer: null,
      animatingDanmaku: false,
    };
  },

  methods: {
    startStage() {
      const container = this.$refs[this.stage];
      if (!container) return;

      setTimeout(() => {
        this.animateNext();
      }, 500);
    },

    animateNext() {
      if (this.animateTimer) {
        clearTimeout(this.animateTimer);
        this.animateTimer = null;
      }

      const item = document.querySelector(".should-animate");
      if (!item) return;
      if (!item.classList) return this.animateNext();

      const delayTime = (item.dataset && item.dataset["delay"]) || 600;

      item.classList.remove("should-animate");
      item.classList.add("animate");

      if (delayTime === "danmaku") {
        this.startDanmaku();
      } else {
        this.animateTimer = setTimeout(() => {
          this.animateNext();
        }, 600 + +delayTime);
      }

      if (this.stage === "first") {
        this.$refs.story &&
          this.$refs.story.scroll({
            top: Math.max(item.offsetTop - item.offsetHeight, 0),
            behavior: "smooth",
          });
      }

      if (!item.nextSibling) {
        setTimeout(() => {
            localStorage.setItem("viewed", true)
            alert("下一页")
        }, 1500);
      }
    },

    nextStage() {
      if (this.stage === "first") {
        this.stage = "second";
        this.showArrow = false;
        document.querySelector("#app").scroll({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          this.startStage();
          this.startDanmaku();
        }, 500);
      }
    },

    startDanmaku() {
      this.animatingDanmaku = true
      setTimeout(() => {
        this.showStarTip = true
      }, 6000);
    },

    handleFavor() {
      this.star = true;
    },

    handleSampleFavor() {
      this.favored = true;
      this.star = true;
    },

    handleInitialized() {
      this.userInitialized = true;
      this.$axios.post(`/user/initialized`);
    },

    moveForward() {
      if (this.userInfo.initialized) {
        this.$router.push("/home");
      }
    },
  },

  created() {
    /* this.moveForward() */
  },

  mounted() {
    if(localStorage.viewed){
        this.$router.push("/home")
    }
    document.getElementById('background0').style.opacity = 0.4
    /* this.moveForward();
    this.hideLoading(); */
    setTimeout(() => {
      this.startStage();
    }, 300);
  },

  watch: {
    star(val) {
      if (!val && this.favored) {
        this.showJourneyTip = true;
        /* this.handleInitialized(); */
      }
    },

    showJourneyTip() {
      setTimeout(() => {
        this.$refs.journey.classList.add("animate");
      }, 50);
    },
  },
};
</script>

<style scoped>
*{
    font-family: HYYiHeXianJingW;
}
@font-face {
    font-family: "HYMingChanKeBenW";
    font-display: block;
    src: url("../assets/fonts/HYMingChanKeBenW.ttf")
}
@font-face {
    font-family: "HYYiHeXianJingW";
    font-display: block;
    src: url("../assets/fonts/HYYiHeXianJingW.ttf")
}
.story {
  padding: 4rem 1rem;
  color: black;
  font-size: 4vh;
  position: absolute;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.br-bottom {
  margin-bottom: 2rem;
}

.animate span {
  transition: 0.6s ease;
  transition-delay: 0.6s;
}

.animate .froze {
  color: rgb(0, 179, 255);
}
.animate .high {
  color: rgb(238, 177, 46);
}

.animate .green {
  color: rgb(37, 206, 37);
}

.animate .flower {
  color: pink;
}

.animate .hand {
  color: rgb(213, 244, 102);
}

.animate .heart {
  color: red;
}

p {
  opacity: 0;
  transform: translateY(-50px);
  transition: all 0.6s ease;
}

p.animate {
  opacity: 1;
  transform: translateY(0);
}

.start-journey {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 38vh;
  flex: 1;
  background-color: pink;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  z-index: 9;

  opacity: 0;
  transform: translateY(100%);
  transition: 0.6s ease;
}

.start-journey.animate {
  opacity: 1;
  transform: translateY(0);
}

#write {
  left: 1.5rem;
  right: 1.5rem;
  bottom: 4rem;
  position: absolute;
}

#write::after {
  margin-left: 0.5rem;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease;
}
#next {
    position: absolute;
    right: 0;
    bottom: 10vh;
    color: white;
    background-color: pink;
    width: 20vw;
    height: 20vw;
}
</style>