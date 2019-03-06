var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var ZORAMap = (function (_super) {
        __extends(ZORAMap, _super);
        function ZORAMap(characterOne, characterTwo, player_name, player_score, median, stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.playerList = [];
            _this.game_secret = '';
            _this.player = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.characterTwo = 'Fully';
            _this.characterOne = 'Insufficiently';
            _this._touchStatus = false;
            _this._distance = new egret.Point();
            _this.playerScore = '';
            _this.tensionMedian = '';
            _this.player_name = '';
            _this.median = 0;
            _this.characterList = [];
            _this.map = {};
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            console.log(stageWidth);
            _this.playerScore = player_score;
            // this.playerScore = player_score
            _this.tensionMedian = (Number(player_score) + Number(median)).toString();
            // this.tensionMedian = '40'
            _this.characterTwo = characterTwo;
            _this.characterOne = characterOne;
            _this.player_name = player_name;
            _this.median = median;
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.sprite.x = 0;
            _this.sprite.y = 0;
            _this.addChild(_this.sprite);
            _this._shape = new egret.Shape();
            _this.addChild(_this._shape);
            // this.initGraphics()
            _this.drawVoteArea();
            return _this;
        }
        //初始化赋值
        ZORAMap.prototype.initGraphics = function () {
            var shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth / 2, this.stageHeight);
            shape.graphics.lineTo(this.stageWidth / 2, 130);
            var buffer = this._shape;
            buffer.graphics.beginFill(0xaaff00, 0.5);
            buffer.graphics.lineStyle(0);
            buffer.graphics.drawRect(this.stageWidth / 2 - 30, 130, 60, this.stageHeight);
            buffer.graphics.endFill();
        };
        ZORAMap.prototype.drawVoteArea = function () {
            var character1 = new egret.TextField();
            var character2 = new egret.TextField();
            var line = this._shape;
            var playerName = new egret.TextField();
            var playerScore = new egret.TextField();
            var playerX = (390 / 81) * Number(this.playerScore) + 110;
            var tensionScaleMedian = new egret.TextField();
            var tensionScaleMedianName = new egret.TextField();
            var tensionScaleX = (390 / 81) * Number(this.tensionMedian) + 110;
            character1.text = this.characterOne;
            character1.textAlign = egret.HorizontalAlign.CENTER;
            character1.size = 40;
            character1.border = true;
            character1.width = 80;
            character1.height = 120;
            character1.borderColor = 0x3a5fcd;
            character1.x = 30;
            character1.y = 150;
            character2.text = this.characterTwo;
            character2.textAlign = egret.HorizontalAlign.CENTER;
            character2.size = 40;
            character2.border = true;
            character2.width = 80;
            character2.height = 120;
            character2.borderColor = 0x3a5fcd;
            character2.x = this.stageWidth - 140;
            character2.y = 150;
            line.graphics.lineStyle(2, 0xdd2222);
            line.graphics.moveTo(110, 210);
            line.graphics.lineTo(500, 210);
            playerName.text = this.player_name;
            playerName.textAlign = egret.HorizontalAlign.CENTER;
            playerName.size = 20;
            playerName.border = true;
            playerName.width = 50;
            playerName.height = 20;
            playerName.borderColor = 0x000000;
            playerName.x = playerX;
            playerName.y = 260;
            playerName.rotation = 270;
            playerScore.text = this.playerScore;
            playerScore.textAlign = egret.HorizontalAlign.CENTER;
            playerScore.size = 20;
            playerScore.border = true;
            playerScore.width = 50;
            playerScore.height = 20;
            playerScore.borderColor = 0x000000;
            playerScore.x = playerX;
            playerScore.y = 210;
            playerScore.rotation = 270;
            tensionScaleMedian.text = this.tensionMedian + '/' + this.median;
            tensionScaleMedian.textAlign = egret.HorizontalAlign.CENTER;
            tensionScaleMedian.size = 20;
            tensionScaleMedian.border = true;
            tensionScaleMedian.width = 60;
            tensionScaleMedian.height = 20;
            tensionScaleMedian.borderColor = 0x000000;
            tensionScaleMedian.x = tensionScaleX;
            tensionScaleMedian.y = 210;
            tensionScaleMedian.rotation = 270;
            tensionScaleMedianName.text = this.player_name;
            tensionScaleMedianName.textAlign = egret.HorizontalAlign.CENTER;
            tensionScaleMedianName.size = 20;
            tensionScaleMedianName.border = true;
            tensionScaleMedianName.width = 60;
            tensionScaleMedianName.height = 20;
            tensionScaleMedianName.borderColor = 0x000000;
            tensionScaleMedianName.x = tensionScaleX;
            tensionScaleMedianName.y = 270;
            tensionScaleMedianName.rotation = 270;
            this.sprite.addChild(character1);
            this.sprite.addChild(character2);
            this.sprite.addChild(line);
            this.sprite.addChild(playerName);
            this.sprite.addChild(playerScore);
            this.sprite.addChild(tensionScaleMedian);
            this.sprite.addChild(tensionScaleMedianName);
        };
        return ZORAMap;
    }(egret.DisplayObjectContainer));
    game.ZORAMap = ZORAMap;
    __reflect(ZORAMap.prototype, "game.ZORAMap");
})(game || (game = {}));
//# sourceMappingURL=ZORAMap.js.map