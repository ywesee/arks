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
    var LoveAddAsk = (function (_super) {
        __extends(LoveAddAsk, _super);
        function LoveAddAsk(stageWidth, stageHeight, count, simulatedData, player, inviter, game_secret, gameName) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this._width = 600;
            _this._x = 20;
            _this._margin = 20;
            _this.playerName = "";
            _this.simulatedData = [];
            _this.player_list = [];
            console.log(simulatedData);
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            // this.playerName = playerName
            _this.count = count;
            _this.simulatedData = simulatedData;
            _this.player = player;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.processBar();
            _this.notice();
            _this.love();
            _this.loveInput();
            _this.add();
            _this.addInput();
            _this.ask();
            _this.askInput();
            _this.tensionScale();
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = stageWidth - 50;
            _this.rightIcon.y = stageHeight - 100;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rightNext, _this);
            _this.sprite.addChild(_this.rightIcon);
            _this.initData();
            return _this;
        }
        LoveAddAsk.prototype.rightNext = function () {
            if (this.loveInputText.text != '' && this.addInputText.text != '' && this.askInputText.text != '') {
                base.API.call('save_players_process', {
                    'inviter_name': this.inviter,
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                    'process': '4.' + this.count.toString() + '.1'
                }).then(function (response) {
                });
                var self_1 = this;
                base.API.Init("http://work.metatype.cn:8105/api/");
                base.API.call('push_feedback', {
                    'game_secret': self_1.game_secret,
                    'gameName': self_1.gameName,
                    'player': self_1.player,
                    'inviter_name': self_1.inviter,
                    'love': self_1.loveInputText.text,
                    'add': self_1.addInputText.text,
                    'ask': self_1.askInputText.text,
                    'teammate': self_1.playerName
                }).then(function (response) {
                    var count = self_1.count;
                    var result = response['result'];
                    var loveFeedbackList = result[0];
                    var addFeedbackList = result[1];
                    var askFeedbackList = result[2];
                    self_1.sprite.visible = false;
                    self_1.removeChild(self_1.sprite);
                    var preview = new game.Preview(self_1.stageWidth, self_1.stageHeight, self_1.player, self_1.inviter, self_1.game_secret, self_1.gameName, count, loveFeedbackList, addFeedbackList, askFeedbackList, self_1.simulatedData);
                    // let preview =  new game.Preview2(self.stageWidth, self.stageHeight)
                    self_1.stage.addChild(preview);
                });
            }
            else {
                alert('Please fill in all the feedback boards.');
            }
        };
        LoveAddAsk.prototype.initData = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_players', {
                'inviter': self.inviter,
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'player': self.player
            }).then(function (response) {
                var result = response['result'];
                console.log(result);
                self.player_list = result;
                self.playerName = self.player_list[self.count];
                self.noticeBox.text = "Feedback time for " + self.playerName + "\nLook at the basic integrative powers &\ntensions as a basis for ANONYMOUS\nfeedback. What do you LOVE about her as a\nteammate, what could she ADD and did you\nalways wanted to ask her? Take 1 minute\nper question, write fast & from the heart.";
            });
        };
        LoveAddAsk.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 10, "Mission 2 > Love, Add, Ask");
            this.sprite.addChild(processBar);
        };
        LoveAddAsk.prototype.notice = function () {
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Feedback time for " + this.playerName + "\nLook at the basic integrative powers &\ntensions as a basis for ANONYMOUS\nfeedback. What do you LOVE about her as a\nteammate, what could she ADD and did you\nalways wanted to ask her? Take 1 minute\nper question, write fast & from the heart.";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        LoveAddAsk.prototype.love = function () {
            var love = new egret.TextField();
            love.text = "LOVE";
            love.size = 40;
            love.x = this._x;
            love.y = this.noticeBox.height + 80;
            this.sprite.addChild(love);
            var sentence = new egret.TextField();
            sentence.text = "I love this person, \nbecause...";
            sentence.size = 20;
            sentence.x = this._x;
            sentence.y = this.noticeBox.height + 130;
            sentence.width = 100;
            this.sprite.addChild(sentence);
        };
        LoveAddAsk.prototype.loveInput = function () {
            this.loveInputText = new eui.TextInput();
            this.loveInputText.width = 250;
            var buttonSkin = "<e:Skin class=\"skins.TextInputSkin\" minHeight=\"40\" minWidth=\"300\" \n                    states=\"normal,disabled,normalWithPrompt,disabledWithPrompt\" xmlns:e=\"http://ns.egret.com/eui\"> <e:Image width=\"100%\" height=\"100%\" scale9Grid=\"1,3,8,8\" source=\"button_up_png\"/> <e:Rect height=\"100%\" width=\"100%\" fillColor=\"0xffffff\"/> <e:EditableText id=\"textDisplay\" verticalCenter=\"0\" left=\"10\" right=\"10\"\n                    textColor=\"0x000000\" textColor.disabled=\"0xff0000\" \n                    width=\"200\" height=\"100%\" size=\"20\" /> <e:Label id=\"promptDisplay\" verticalCenter=\"0\" left=\"10\" right=\"10\"\n                    textColor=\"0xa9a9a9\" width=\"100%\" height=\"24\" size=\"20\" \n                    touchEnabled=\"false\" includeIn=\"normalWithPrompt,disabledWithPrompt\"/> \n                </e:Skin>";
            this.loveInputText.skinName = buttonSkin;
            this.loveInputText.height = 250;
            this.loveInputText.x = this._x + 120;
            this.loveInputText.y = this.noticeBox.height + 60 + this._margin;
            this.loveInputText.prompt = 'click here to write...';
            this.loveInputText.textColor = 0x4D4D4D;
            this.sprite.addChild(this.loveInputText);
        };
        LoveAddAsk.prototype.add = function () {
            var add = new egret.TextField();
            add.text = "ADD";
            add.size = 40;
            add.x = this._x;
            add.y = this.noticeBox.height + 100 + 250;
            this.sprite.addChild(add);
            var sentence = new egret.TextField();
            sentence.text = "I would\nlove this\nperson \neven more,\n if...";
            sentence.size = 20;
            sentence.x = this._x;
            sentence.y = this.noticeBox.height + 130 + 250 + this._margin;
            sentence.width = 100;
            this.sprite.addChild(sentence);
        };
        LoveAddAsk.prototype.addInput = function () {
            this.addInputText = new eui.TextInput();
            this.addInputText.width = 250;
            this.addInputText.height = 250;
            var buttonSkin = "<e:Skin class=\"skins.TextInputSkin\" minHeight=\"40\" minWidth=\"300\" \n                    states=\"normal,disabled,normalWithPrompt,disabledWithPrompt\" xmlns:e=\"http://ns.egret.com/eui\"> <e:Image width=\"100%\" height=\"100%\" scale9Grid=\"1,3,8,8\" source=\"button_up_png\"/> <e:Rect height=\"100%\" width=\"100%\" fillColor=\"0xffffff\"/> <e:EditableText id=\"textDisplay\" verticalCenter=\"0\" left=\"10\" right=\"10\"\n                    textColor=\"0x000000\" textColor.disabled=\"0xff0000\" \n                    width=\"200\" height=\"100%\" size=\"20\" /> <e:Label id=\"promptDisplay\" verticalCenter=\"0\" left=\"10\" right=\"10\"\n                    textColor=\"0xa9a9a9\" width=\"100%\" height=\"24\" size=\"20\" \n                    touchEnabled=\"false\" includeIn=\"normalWithPrompt,disabledWithPrompt\"/> \n                </e:Skin>";
            this.addInputText.skinName = buttonSkin;
            this.addInputText.x = this._x + 120;
            this.addInputText.y = this.noticeBox.height + 60 + this._margin * 2 + 250;
            this.loveInputText.textColor = 0x4D4D4D;
            this.addInputText.prompt = 'click here to write...';
            this.sprite.addChild(this.addInputText);
        };
        LoveAddAsk.prototype.ask = function () {
            var ask = new egret.TextField();
            ask.text = "ASK";
            ask.size = 40;
            ask.x = this._x;
            ask.y = this.noticeBox.height + 120 + 500;
            this.sprite.addChild(ask);
            var sentence = new egret.TextField();
            sentence.text = "I always\nwanted to\nask you...";
            sentence.size = 20;
            sentence.x = this._x;
            sentence.y = this.noticeBox.height + 130 + 500 + this._margin * 2;
            sentence.width = 100;
            this.sprite.addChild(sentence);
        };
        LoveAddAsk.prototype.askInput = function () {
            this.askInputText = new eui.TextInput();
            this.askInputText.width = 250;
            this.askInputText.height = 250;
            this.askInputText.x = this._x + 120;
            this.askInputText.y = this.noticeBox.height + 60 + this._margin * 3 + 500;
            var buttonSkin = "<e:Skin class=\"skins.TextInputSkin\" minHeight=\"40\" minWidth=\"300\" \n                    states=\"normal,disabled,normalWithPrompt,disabledWithPrompt\" xmlns:e=\"http://ns.egret.com/eui\"> <e:Image width=\"100%\" height=\"100%\" scale9Grid=\"1,3,8,8\" source=\"button_up_png\"/> <e:Rect height=\"100%\" width=\"100%\" fillColor=\"0xffffff\"/> <e:EditableText id=\"textDisplay\" verticalCenter=\"0\" left=\"10\" right=\"10\"\n                    textColor=\"0x000000\" textColor.disabled=\"0xff0000\" \n                    width=\"200\" height=\"100%\" size=\"20\" /> <e:Label id=\"promptDisplay\" verticalCenter=\"0\" left=\"10\" right=\"10\"\n                    textColor=\"0xa9a9a9\" width=\"100%\" height=\"24\" size=\"20\" \n                    touchEnabled=\"false\" includeIn=\"normalWithPrompt,disabledWithPrompt\"/> \n                </e:Skin>";
            this.loveInputText.textColor = 0x4D4D4D;
            this.askInputText.prompt = 'click here to write...';
            this.askInputText.skinName = buttonSkin;
            this.sprite.addChild(this.askInputText);
        };
        LoveAddAsk.prototype.pushFeedback = function () {
            console.log('123');
        };
        LoveAddAsk.prototype.tensionScale = function () {
            var _this = this;
            this.simulatedData.forEach(function (val, index, array) {
                var character1 = val[0];
                var character2 = val[1];
                var middle_score = Number(val[2].toString());
                var player_score = Number(val[3].toString());
                var absoluteValueOfDeviation = Math.abs(player_score - middle_score);
                var individualTensionScaleMedian = middle_score;
                var teamTensionScaleMedian = 0;
                var tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian);
                tensionScale.x = 420;
                tensionScale.y = _this.noticeBox.height + 210 + _this._margin + (index - 1) * 150;
                _this.sprite.addChild(tensionScale);
            });
        };
        return LoveAddAsk;
    }(egret.DisplayObjectContainer));
    game.LoveAddAsk = LoveAddAsk;
    __reflect(LoveAddAsk.prototype, "game.LoveAddAsk");
})(game || (game = {}));
//# sourceMappingURL=LoveAddAsk.js.map