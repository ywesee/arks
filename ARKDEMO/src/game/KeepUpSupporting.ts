namespace game {
    export class KeepUpSupporting extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public player = ''
        public count
        private _width = 600
        private noticeHeight = 140
        private _x = 20
        private _margin = 20
        private noticeBox: egret.TextField
        public timer: egret.Timer
        private characterListParams = []
        private votedScalesNumber = 1
        private scalesNumber = 7
        private remainingScalesNumber
        public ttsms = []

        public player_list = []

        public votedPlayerList = []
        public remainingPlayersList = []

        public simulatedData = []
        private rightIcon: egret.Bitmap;

        private checkpoint = 0

        public constructor(stageWidth, stageHeight,player, inviter, game_secret, gameName, count, simulatedData, player_list, votedPlayerList, remainingPlayersList) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)

            this.player = player
            this.inviter = inviter
            this.game_secret= game_secret
            this.gameName = gameName
            this.count = count
            this.simulatedData = simulatedData

            this.player_list = player_list
            this.votedPlayerList = votedPlayerList
            this.remainingPlayersList = remainingPlayersList
            this.scalesNumber = this.player_list.length
            this.votedScalesNumber = this.votedPlayerList.length
            this.remainingScalesNumber = this.scalesNumber - this.votedScalesNumber
            


            this.background() 
            this.remainingPlayers()
            this.votedPlayers()
            this.processBar()
            this.notice()
            this.noticeBox = new egret.TextField()

            this.rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = this.stageWidth - 50
            this.rightIcon.y = this.stageHeight - 50
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this)
            this.sprite.addChild(this.rightIcon)


        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 55, "Mission 2 > Keep Up Supporting")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            let votedScalesNumber = this.votedScalesNumber.toString()
            let scalesNumber = this.scalesNumber.toString()
            let remainingScalesNumber = this.remainingScalesNumber.toString()
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "Great! You answered " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Feedbacks. Fill in the remaining " + remainingScalesNumber.toString() + " to finish Mission 2 and Embrace your teammates anonymous Feedback for a better deployment of the team's potentialities.!"

            this.noticeBox.textColor = 0x000000
            this.noticeBox.width = this._width
            this.noticeBox.height = this.noticeHeight
            this.noticeBox.x = this._x
            this.noticeBox.y = 60
            this.noticeBox.background = true
            this.noticeBox.backgroundColor = 0xffcc33
            this.sprite.addChild(this.noticeBox)
        }

        private background(): void {
            let grey: egret.Shape = new egret.Shape()
            grey.x = this._x / 2  // 20会多
            grey.y =100   // 减掉多的空白
            grey.graphics.beginFill(0xcccccc, 1)
            grey.graphics.drawRect(grey.x, grey.y, 380, this.stageHeight)
            grey.graphics.endFill()
            this.sprite.addChild(grey)

            let orange: egret.Shape = new egret.Shape()
            orange.x = this._x / 2 + grey.width / 2 + this._margin / 2
            orange.y = 100
            orange.graphics.beginFill(0xffcc33, 1)
            orange.graphics.drawRect(orange.x, orange.y, 200, this.stageHeight)
            orange.graphics.endFill()
            this.sprite.addChild(orange)
        }

        private remainingPlayers(): void {  // 未被投票的玩家名
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let remainingPlayers = this.remainingPlayersList
            list.dataProvider = new eui.ArrayCollection(remainingPlayers)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 380
            myScroller.height = this.stageHeight - 80 - 120
            myScroller.x = myScroller.width / 2 - 40
            myScroller.y = 150 + 80
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

        private votedPlayers(): void {  // 已被投票的玩家名
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let votedPlayers = this.votedPlayerList
            list.dataProvider = new eui.ArrayCollection(votedPlayers)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 380
            myScroller.height = this.stageHeight - 80 - 120
            myScroller.x = this.stageWidth - myScroller.width / 2 + 30
            myScroller.y = 150 + 80
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

        private nextPage(){
            console.log('nextPage')

            console.log('this.count',this.count)
            console.log('this.player_list',this.player_list)

            if(this.count+1 == this.player_list.length){
                base.API.call('save_players_process', { 
                    'inviter_name': this.inviter, 
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                    'process': '5'
                }).then(function (response){})

                var self = this
                base.API.call('check_game_point', { 
                    'inviter_name': this.inviter, 
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                }).then(function (response){
                    console.log(22222222)
                    var code = response['code']
                    console.log('response', response)
                    if(code == 1){
                        alert('Please wait for others to complete the review')
                    }else{
                        base.API.call('getOthersFeedback', {
                            'game_secret': self.game_secret,
                            'gameName': self.gameName,
                            'player':self.player,
                            'inviter':self.inviter,
                        }).then(function (response){
                            var result = response['result']
                            self.sprite.visible = false
                            self.removeChild(self.sprite)
                            let preview =  new game.DigestLove(self.stageWidth, self.stageHeight, result, self.inviter, self.game_secret, self.gameName, self.player)
                            self.stage.addChild(preview)
                        })  
                    }
                })
                // base.API.Init("http://work.metatype.cn:8105/api/");
            }else {
                var self = this
                self.rightIcon.touchEnabled = false
                var count = self.count + 1
                self.sprite.visible = false
                self.removeChild(self.sprite)
                var loveAddAsk =  new game.LoveAddAsk(self.stageWidth, self.stageHeight, count, self.simulatedData, self.player,  self.inviter, self.game_secret, self.gameName)
                self.stage.addChild(loveAddAsk)
            }
        }
    }
}