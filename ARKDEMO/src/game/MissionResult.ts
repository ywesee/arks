namespace game{

    export class MissionResult extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public player = ''
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0
        private titleBackground: egret.Shape
        private characterListParams = []
        public simulatedData = [];
        private _shape: egret.Shape
        private ttsms = []

        public constructor(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams) {
            super();
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.player = player
            this.gameName = gameName
            this.game_secret = game_secret
            this.inviter = inviter
            this.characterListParams = characterListParams
            
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);

            this.drawTitle();
            // this.drawLine()
            this.drawResult()
            this._shape = new egret.Shape()
            this.addChild(this._shape)
            this.initGraphics()
            let probessBar = new game.ProcessBar(stageWidth, stageHeight, 100, 'Mission 1 > ZORA Map')
            this.sprite.addChild(probessBar)

            console.log('ttsmsstart3:')
            console.log(this.ttsms)
            console.log('ttsmsend3:')
        }

        private getTTSMS(){
            let self = this
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_ttsm', {
                'characterListParams': self.characterListParams,
                'inviter':self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response){
                let result = response['result']
                self.ttsms = result

                console.log('ttsmsstart1:')
                console.log(self.ttsms)
                console.log('ttsmsend1:')
            })            

        }

        private initGraphics(): void {
            let shape: egret.Shape = this._shape
            shape.graphics.lineStyle(2, 0xff00ff)
            shape.graphics.moveTo(this.stageWidth / 2, this.stageHeight)
            shape.graphics.lineTo(this.stageWidth / 2, 130)

            let buffer: egret.Shape = this._shape
            buffer.graphics.beginFill(0xaaff00, 0.5)
            buffer.graphics.lineStyle(0)
            buffer.graphics.drawRect(this.stageWidth / 2 - Math.ceil(200/81*13), 130, Math.ceil(200/81*13)*2, this.stageHeight)
            buffer.graphics.endFill()
        }

        private drawResult(){
            var self = this
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_game_score', {
                'characterListParams': self.characterListParams,
                'inviter':self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response){
                var result = response['result']
                self.simulatedData = result

                var that = self
                base.API.call('get_ttsm', {
                    'characterListParams': that.characterListParams,
                    'inviter':that.inviter,
                    'gameSecret': that.game_secret,
                    'player': that.player,
                    'gameName': that.gameName,
                }).then(function (response){
                    let result = response['result']
                    that.ttsms = result
                    console.log('ttsmsstart1:')
                    console.log(that.ttsms)
                    console.log('ttsmsend1:')

                    self.drawTensionScale(that.ttsms)

                })    

                // self.drawTensionScale();
            })

            console.log(11111111111)
            console.log(self.simulatedData)
            console.log(111111111)

            console.log('ttsmsstart2:')
            console.log(self.ttsms)
            console.log('ttsmsend2:')
        }

        private drawTensionScale(ttsms) {
            console.log(this.simulatedData)
            this.ttsms = ttsms
            console.log(this.ttsms)
            console.log(222222)
            this.simulatedData.forEach((val, index, array) => {
                try {


                    var ttsm = this.ttsms[index]

                    var score = val[2].toString()
                    // let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], score);
                    let zoramap = new game.ZORAMap(val[0], val[1], this.player, val[2], val[3], this.stageWidth, this.stageHeight, ttsm)
                    // zoramap.x = 10
                    console.log(zoramap)
                    zoramap.y = 200 + (index-1)*150
                    // if (index % 2 == 1) {
                    //     zoramap.x = 150;
                    //     zoramap.y = 150 + (index - 1) * 100;
                    // } 
                    // else if (index % 2 == 0) {
                    //     zoramap.x = 350;
                    //     zoramap.y = 150 + index * 100;
                    // }
                    this.sprite.addChild(zoramap);

                } catch (error) {
                }

            });
        }

        private drawLine() {
            var shape:egret.Shape = new egret.Shape()
            shape.graphics.lineStyle(Math.ceil((200/81)*13 ), 0xff00ff)
            shape.graphics.moveTo(this.stageWidth/2, this.stageHeight)
            shape.graphics.lineTo(this.stageWidth/2, 150)
            this.sprite.addChild(shape)
        }

        private drawTitle() {
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x359f93, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);

            let title: egret.TextField = new egret.TextField();
            title.text = "Mission 1 Complete: Here is an image of you in your Team‘s Zone of Responsible Action."
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 1
            title.y = 50;
            this.sprite.addChild(title)
        }

    }
}