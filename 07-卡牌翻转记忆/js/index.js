;(function(){
  function FlipCard(options){
    console.log(options.level)
    this.$el = document.querySelector(options.el)
    this.remember_time = 3;
    this.total_card = 20;
    this.cards = [];
    this.flip_cards = [];
    this.level = options.level || 1;
    this.turn_num = 0;
    this.clickFlag = false
  }
  FlipCard.prototype = {
    start:function(){
      this.initCards()
      this.renderView()
      this.handle()
      this.remember()
    },
    initCards:function(){
      let intact_arr = []     
      for(var i=0;i<this.total_card;i++){
        intact_arr.push(i+1)
      }
      const upset_arr = this.shuffle(intact_arr)
      const count = this.level*2
      let cards = []
      for(var i=0;i<count;i++){
        const num = upset_arr[i]
        const info = {
          val:num,
          id:num
        }
        cards.push(info,info)
      }
      this.cards = this.shuffle(cards)
    },
    remember:function(){
      const dom = document.querySelector('.countdown')
      let timer = null
      this.clickFlag = true
      let remember_time = this.remember_time*this.level
      const _interval = () => {
        if(remember_time === 0) return
        remember_time--
        dom.innerHTML = `${remember_time}秒后开始`
        if(remember_time === 0){
          clearTimeout(timer)
          timer = null
          this.flipAll()
          this.clickFlag = false
          dom.innerHTML = '开始游戏'
        }
        timer = setTimeout(()=>{
          _interval()
        },1000)
      }
      _interval()
      
    },
    flipAll:function(){
      const childs = this.$el.childNodes
      childs.forEach(child => {
        if(child.nodeType === 1){
          child.classList.add('flip')
        }
      })
    },
    // 打乱数组顺序，洗牌
    shuffle:function(arr){
      return arr.sort(function(){
        return 0.5 - Math.random()
      })
    },
    renderView:function(){
      var html = '';
      this.cards.forEach(card=>{
        html+=`
          <section class="card card-${this.level}">
            <div class="face front" data-val='${card.val}'>${card.val}</div>
            <div class="face back" data-val='${card.val}'></div>
            <div class="card-mask" data-val='${card.val}'></div>
          </section>
        `
        this.$el.innerHTML = html
      })
    },
    handle:function(){
      this.$el.addEventListener('click',(event) => {
        if(this.clickFlag) return
        const parentDom = event.target.parentNode;
        const val = event.target.dataset.val
        if(parentDom.classList.contains('card')){
          const turnLen = this.flip_cards.push({
            id:val,
            dom:parentDom
          })
          parentDom.classList.remove('flip')
          if(turnLen === 2) this.judgeSame()
          this.gameWin()
        }
      })
    },
    judgeSame:function(){
      if(this.flip_cards[0].id === this.flip_cards[1].id){
        this.turn_num+=2
        this.flip_cards.length = 0
      }else{
        setTimeout(()=>{
          this.flip_cards[0].dom.classList.add('flip')
          this.flip_cards[1].dom.classList.add('flip')

          this.flip_cards.length = 0
        },1100)
      }
    },
    gameWin:function(){
      if(this.level*2*2 == this.turn_num){
        setTimeout(()=>{
          this.nextLevel()
        },2000)
      }
    },
    nextLevel:function(){  
      this.turn_num = 0
      this.flip_cards = []
      this.level++
      if(this.level === 5){
        this.level = 1
      }
      this.initCards()
      this.renderView()
      this.remember()
    }
  }

  new FlipCard({
    el:'.wrap-content',
    level:2
  }).start()
})()