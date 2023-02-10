
let recorderManager;
let timerInterval = null;

Page({
  data: { 
    ding: 'http://39.108.15.236:3000/ding.mp3',
    type:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.innerAudioContext()
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    recorderManager = wx.getRecorderManager();
  },
  /**
   * 点击开始录音
   */
  tapRecordingBtn(e){
    this.audioCtx.src
    this.audioCtx.src = this.data.ding
    this.audioCtx.play();
    this.setData({ type:1 })
  },
  /**
   * canvas 绘制圆环
   */
  drawCircle: function (duration, callback) {
    let ctx = wx.createCanvasContext('canvasArcCir');
    clearInterval(timerInterval);
    ctx.clearRect(0, 0, 75, 75);
    function drawArc(s, e) {
      const x = 36, y = 36, radius = 34;
      ctx.setLineWidth(4);
      ctx.setStrokeStyle('#a0d5ff');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke();
      ctx.draw();
    }
    let step = 1, startAngle = -0.5 * Math.PI, endAngle = 0;
    const lastTime = (new Date()).valueOf();
    function animation() {
      if (duration > step) {
        let rate = (step / duration).toFixed(2);
        endAngle = rate * 2 * Math.PI - 0.5 * Math.PI;
        drawArc(startAngle, endAngle);
        let curUsing = (new Date()).valueOf() - lastTime;
        step = curUsing
      } else {
        callback();
        ctx.clearRect()
        ctx.draw()
        clearInterval(timerInterval);
      }
    };
    animation();
    timerInterval = setInterval(animation, 17);
  },
  /**
   * 音频
   */
  innerAudioContext(){
    this.audioCtx = wx.createInnerAudioContext();
    this.audioCtx.obeyMuteSwitch = false;
    this.audioCtx.autoplay = true;
    this.audioCtx.onEnded(() => {
      if(this.data.type === 1){
        this.startRecord()
      }
    })
  },
  startRecord(){
    const duration = 3000
    const options = {
      duration: duration,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
      this.drawCircle(duration, function () {
        recorderManager.stop();
      });
    })
    recorderManager.onStop((res) => {
      const { tempFilePath } = res;
      this.tempFilePath = tempFilePath;
      this.setData({ type:2 })
      this.audioCtx.src = this.tempFilePath
      this.audioCtx.play();
    })
  }
})