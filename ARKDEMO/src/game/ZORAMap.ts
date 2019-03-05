namespace game {

    export class ZORAMap extends egret.DisplayObjectContainer {

        private sprite: egret.Sprite
        private playerList = []
        private game_secret = ''
        private player = ''
        public gameName = ''
        public inviter = ''
        public stageWidth = 0
        public stageHeight = 0

        public characterTwo = 'Fully'
        public characterOne = 'Insufficiently'

        public _touchStatus: boolean = false
        public _distance: egret.Point = new egret.Point()
        private _shape: egret.Shape

        private rectShapeOne: egret.Shape
        private rectShapeTwo: egret.Shape
        
        private playerScore = ''
        private tensionMedian = ''
        private characterText: egret.TextField
        private charater2: egret.TextField

        private rightIcon: egret.Bitmap
        private closeIcon: egret.Bitmap

        private tiptext: egret.TextField

        private player_name = ''
        private median = 0
        private characterList = []
        private map: { [key: string]: string } = {}
        public constructor(characterOne, characterTwo,player_name, player_score, median, stageWidth, stageHeight) {
            super()

            this.stageWidth = stageWidth
            this.stageHeight = stageHeight

            this.playerScore = player_score
            this.playerScore = player_score
            this.tensionMedian =(Number(player_score) + Number(median)).toString()
            this.characterTwo = characterTwo
            this.characterOne = characterOne
            this.player_name = player_name
            this.median = median

            this.sprite = new egret.Sprite()
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.sprite.x = 0
            this.sprite.y = 0
            this.addChild(this.sprite)

            this._shape = new egret.Shape()
            this.addChild(this._shape)
            this.initGraphics()
            this.drawVoteArea()
     
        }


        //初始化赋值
        private initGraphics(): void {
            let shape: egret.Shape = this._shape
            shape.graphics.lineStyle(2, 0xff00ff)
            shape.graphics.moveTo(this.stageWidth / 2, this.stageHeight)
            shape.graphics.lineTo(this.stageWidth / 2, 130)

            let buffer: egret.Shape = this._shape
            buffer.graphics.beginFill(0xaaff00, 0.5)
            buffer.graphics.lineStyle(0)
            buffer.graphics.drawRect(this.stageWidth / 2 - 30, 130, 60, this.stageHeight)
            buffer.graphics.endFill()
        }

        private drawVoteArea(): void {
            let character1: egret.TextField = new egret.TextField()
            let character2: egret.TextField = new egret.TextField()
            let line: egret.Shape = this._shape
            let playerName: egret.TextField = new egret.TextField()
            let playerScore: egret.TextField = new egret.TextField()
            let playerX = (390 / 81) * Number(this.playerScore) + 110
            let tensionScaleMedian: egret.TextField = new egret.TextField()
            let tensionScaleMedianName: egret.TextField = new egret.TextField()
            let tensionScaleX = (390 / 81) * Number(this.tensionMedian) + 110
            
            character1.text = this.characterOne
            character1.textAlign = egret.HorizontalAlign.CENTER
            character1.size = 40
            character1.border = true
            character1.width = 80
            character1.height = 120
            character1.borderColor = 0x3a5fcd
            character1.x = 30
            character1.y = 150
            character2.text = this.characterTwo
            character2.textAlign = egret.HorizontalAlign.CENTER
            character2.size = 40
            character2.border = true
            character2.width = 80
            character2.height = 120
            character2.borderColor = 0x3a5fcd
            character2.x = this.stageWidth - 140
            character2.y = 150
            line.graphics.lineStyle(2, 0xdd2222)
            line.graphics.moveTo(110, 210)
            line.graphics.lineTo(500, 210)
            playerName.text = this.player_name
            playerName.textAlign = egret.HorizontalAlign.CENTER
            playerName.size = 20
            playerName.border = true
            playerName.width = 50
            playerName.height = 20
            playerName.borderColor = 0x000000
            playerName.x = playerX
            playerName.y = 260
            playerName.rotation = 270
            playerScore.text = this.playerScore
            playerScore.textAlign = egret.HorizontalAlign.CENTER
            playerScore.size = 20
            playerScore.border = true
            playerScore.width = 50
            playerScore.height = 20
            playerScore.borderColor = 0x000000
            playerScore.x = playerX
            playerScore.y = 210
            playerScore.rotation = 270
            tensionScaleMedian.text = this.tensionMedian + '/' + this.median
            tensionScaleMedian.textAlign = egret.HorizontalAlign.CENTER
            tensionScaleMedian.size = 20
            tensionScaleMedian.border = true;
            tensionScaleMedian.width = 60
            tensionScaleMedian.height = 20
            tensionScaleMedian.borderColor = 0x000000
            tensionScaleMedian.x = tensionScaleX
            tensionScaleMedian.y = 210
            tensionScaleMedian.rotation = 270
            tensionScaleMedianName.text = this.player_name
            tensionScaleMedianName.textAlign = egret.HorizontalAlign.CENTER
            tensionScaleMedianName.size = 20
            tensionScaleMedianName.border = true
            tensionScaleMedianName.width = 60
            tensionScaleMedianName.height = 20
            tensionScaleMedianName.borderColor = 0x000000
            tensionScaleMedianName.x = tensionScaleX
            tensionScaleMedianName.y = 270
            tensionScaleMedianName.rotation = 270

            this.sprite.addChild(character1)
            this.sprite.addChild(character2)
            this.sprite.addChild(line)
            this.sprite.addChild(playerName)
            this.sprite.addChild(playerScore)
            this.sprite.addChild(tensionScaleMedian)
            this.sprite.addChild(tensionScaleMedianName)
        }

        
        

    }
}