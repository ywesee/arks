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
    var ExpandedTensionScale = (function (_super) {
        __extends(ExpandedTensionScale, _super);
        function ExpandedTensionScale(stageWidth, stageHeight, character1, character2, playerName, selfPerception, game_secret, inviter, gameName, chooser, scorecount) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this._x = 20;
            _this._width = 230;
            _this.character1 = "";
            _this.character2 = "";
            _this.playerName = "";
            _this.selfPerception = 0;
            _this.individualTensionScale = [];
            _this.individualTensionScaleMedian = 0;
            _this.deviationBetweenITSM_SP = 0;
            _this.teamTensionScaleMedian = 0;
            _this.zoraMin = 0;
            _this.lowest = 0;
            _this.highest = 0;
            _this.count = 0;
            _this.median = 0;
            _this.votedScalesNumber = 1;
            _this.scalesNumber = 7;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.character1 = character1;
            _this.character2 = character2;
            _this.playerName = playerName;
            _this.selfPerception = selfPerception;
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.gameName = gameName;
            _this.chooser = chooser;
            _this.scorecount = scorecount;
            // this.sprite = sprite
            _this.sprite = new egret.Sprite();
            // this.tensionScale()
            _this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, _this.tensionScale, _this);
            _this.addChild(_this.sprite);
            _this.character1Sprite = new egret.TextField();
            _this.character2Sprite = new egret.TextField();
            _this.itsm_Deviation = new egret.TextField();
            _this.individualTensionScaleMedianPlayerName = new egret.TextField();
            _this.sprite.addChild(_this.character1Sprite);
            _this.sprite.addChild(_this.character2Sprite);
            _this.sprite.addChild(_this.itsm_Deviation);
            _this.sprite.addChild(_this.individualTensionScaleMedianPlayerName);
            _this.zora = new egret.TextField();
            _this.sprite.addChild(_this.zora);
            _this.zoraMedianLine = new egret.Shape();
            _this.sprite.addChild(_this.zoraMedianLine);
            _this.initSprite();
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getttsm, _this);
            _this.timer.start();
            // var idTimeout:number = egret.setTimeout( function( arg ){
            // this.rightIcon()  
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = 140;
            _this.rightIcon.y = _this.stageHeight - 230;
            _this.rightIcon.touchEnabled = true;
            _this.sprite.addChild(_this.rightIcon);
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.nextTouch, _this);
            //     }, this, 1000, "egret"
            // );
            _this.tiptext = new egret.TextField();
            _this.feedbacktext = new egret.TextField();
            _this.noticetext = new egret.TextField();
            _this.sprite.addChild(_this.noticetext);
            _this.sprite.addChild(_this.tiptext);
            _this.tip();
            _this.notice2();
            return _this;
            // this.resultTimer = new egret.Timer(1000, 0);
            // this.resultTimer.addEventListener(egret.TimerEvent.TIMER, this.saveResult, this);
            // this.resultTimer.start()
        }
        // private rightIcon(): void {
        //     let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
        //     rightIcon.width = 100
        //     rightIcon.height = 100
        //     rightIcon.anchorOffsetX = rightIcon.width / 2
        //     rightIcon.anchorOffsetY = rightIcon.height / 2
        //     rightIcon.x = 140
        //     rightIcon.y = this.stageHeight - 230
        //     rightIcon.touchEnabled = true
        //     rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this)
        //     this.sprite.addChild(rightIcon)
        // }
        ExpandedTensionScale.prototype.initSprite = function () {
            // 上面的性格
            var character1Sprite = this.character1Sprite;
            character1Sprite.text = this.character1;
            character1Sprite.x = this._x;
            character1Sprite.width = this._width;
            character1Sprite.textAlign = egret.HorizontalAlign.CENTER;
            character1Sprite.border = true;
            character1Sprite.borderColor = 0x000000;
            character1Sprite.background = true;
            character1Sprite.backgroundColor = 0x539f93;
            // this.sprite.addChild(character1)
            // 下面的性格
            var character2Sprite = this.character2Sprite;
            character2Sprite.text = this.character2;
            character2Sprite.x = this._x;
            character2Sprite.y = 840;
            character2Sprite.width = this._width;
            character2Sprite.textAlign = egret.HorizontalAlign.CENTER;
            character2Sprite.border = true;
            character2Sprite.borderColor = 0x000000;
            character2Sprite.background = true;
            character2Sprite.backgroundColor = 0x539f93;
            // this.sprite.addChild(character2)
            // 性格连接线
            var line = new egret.Shape();
            line.graphics.lineStyle(2, 0xaa2200);
            line.graphics.moveTo(this._x + character1Sprite.width / 2, character1Sprite.height);
            line.graphics.lineTo(this._x + character2Sprite.width / 2, character2Sprite.y);
            line.graphics.endFill();
            this.sprite.addChild(line);
            var zora = this.zora;
            zora.x = this._x;
            zora.width = 230;
            zora.border = true;
            zora.background = true;
            zora.backgroundColor = 0xcbcc66;
            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, 0, 230, )
            // zora.graphics.endFill()
            var zoraMedianLine = this.zoraMedianLine;
            zoraMedianLine.graphics.lineStyle(5, 0x333333);
            zoraMedianLine.graphics.moveTo(this._x, 0);
            zoraMedianLine.graphics.lineTo(250, 0);
            zoraMedianLine.graphics.endFill();
            var itsm_Deviation = this.itsm_Deviation;
            itsm_Deviation.text = this.individualTensionScaleMedian.toString() + "/" + this.deviationBetweenITSM_SP.toString();
            itsm_Deviation.textColor = 0x000000;
            itsm_Deviation.x = this._x + this.character1Sprite.width / 2;
            itsm_Deviation.y = this.individualTensionScaleMedian / 81 * 810 - itsm_Deviation.height / 2;
            itsm_Deviation.width = 100;
            itsm_Deviation.textAlign = egret.HorizontalAlign.CENTER;
            itsm_Deviation.border = true;
            itsm_Deviation.borderColor = 0x000000;
            itsm_Deviation.background = true;
            itsm_Deviation.backgroundColor = 0xffffff;
            // itsm_Deviation.touchEnabled = true
            // itsm_Deviation.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            //     itsm_Deviation.width = itsm_Deviation.width * 2.5
            //     itsm_Deviation.height = itsm_Deviation.height * 2
            //     itsm_Deviation.size = itsm_Deviation.size * 2
            //     itsm_Deviation.x = itsm_Deviation.x - 100
            // }, self)
            // itsm_Deviation.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            //     itsm_Deviation.width = itsm_Deviation.width / 2.5
            //     itsm_Deviation.height = itsm_Deviation.height / 2
            //     itsm_Deviation.size = itsm_Deviation.size / 2
            //     itsm_Deviation.x = itsm_Deviation.x + 100
            // }, self)
            // itsm_Deviation.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
            //     itsm_Deviation.width = itsm_Deviation.width / 2.5
            //     itsm_Deviation.height = itsm_Deviation.height / 2
            //     itsm_Deviation.size = itsm_Deviation.size / 2
            //     itsm_Deviation.x = itsm_Deviation.x + 100
            // }, self)
            // ITSM 的玩家名
            var individualTensionScaleMedianPlayerName = this.individualTensionScaleMedianPlayerName;
            individualTensionScaleMedianPlayerName.text = this.playerName;
            individualTensionScaleMedianPlayerName.textColor = 0x000000;
            individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width;
            individualTensionScaleMedianPlayerName.y = this.individualTensionScaleMedian / 81 * 810 - individualTensionScaleMedianPlayerName.height / 2;
            individualTensionScaleMedianPlayerName.width = 100;
            individualTensionScaleMedianPlayerName.textAlign = egret.HorizontalAlign.CENTER;
            individualTensionScaleMedianPlayerName.border = true;
            individualTensionScaleMedianPlayerName.borderColor = 0x00000;
            individualTensionScaleMedianPlayerName.touchEnabled = true;
            individualTensionScaleMedianPlayerName.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                individualTensionScaleMedianPlayerName.width = individualTensionScaleMedianPlayerName.width * 2.5;
                individualTensionScaleMedianPlayerName.height = individualTensionScaleMedianPlayerName.height * 2;
                individualTensionScaleMedianPlayerName.size = individualTensionScaleMedianPlayerName.size * 2;
                individualTensionScaleMedianPlayerName.x = individualTensionScaleMedianPlayerName.x - 100;
            }, self);
            individualTensionScaleMedianPlayerName.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                individualTensionScaleMedianPlayerName.width = individualTensionScaleMedianPlayerName.width / 2.5;
                individualTensionScaleMedianPlayerName.height = individualTensionScaleMedianPlayerName.height / 2;
                individualTensionScaleMedianPlayerName.size = individualTensionScaleMedianPlayerName.size / 2;
                individualTensionScaleMedianPlayerName.x = individualTensionScaleMedianPlayerName.x + 100;
            }, self);
            individualTensionScaleMedianPlayerName.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                individualTensionScaleMedianPlayerName.width = individualTensionScaleMedianPlayerName.width / 2.5;
                individualTensionScaleMedianPlayerName.height = individualTensionScaleMedianPlayerName.height / 2;
                individualTensionScaleMedianPlayerName.size = individualTensionScaleMedianPlayerName.size / 2;
                individualTensionScaleMedianPlayerName.x = individualTensionScaleMedianPlayerName.x + 100;
            }, self);
        };
        ExpandedTensionScale.prototype.getttsm = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getttsmindividual', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.playerName,
                'gameName': self.gameName,
                'c1': self.character1,
                'c2': self.character2,
                'chooser': self.chooser
            }).then(function (response) {
                self.teamTensionScaleMedian = response['ttsm'];
                self.individualTensionScale = response['individualTensionScale'];
                self.playerCount = response['playerCount'];
                self.votedScalesNumber = self.individualTensionScale.length + 1;
                self.noticetext.text = Math.ceil(((self.votedScalesNumber) / self.playerCount) * 100).toString() + "% of your Teammates (" + self.votedScalesNumber.toString() + " out of " + self.playerCount + ') have  so far voted the ' + self.character1 + " & " + self.character2 + "\nTensionScale. Here are Early Insights:";
                self.tensionScale();
            });
        };
        ExpandedTensionScale.prototype.notice = function () {
            var notice = new egret.TextField();
            notice.text = "54% of your Teammates (7 out of 13) have so far voted the Carefulness & Power Tension Scale. Here are Early Insights:";
            notice.width = 600;
            notice.x = -350;
            notice.y = 60 - 190;
            notice.background = true;
            notice.backgroundColor = 0x359f93;
            this.sprite.addChild(notice);
        };
        ExpandedTensionScale.prototype.notice2 = function () {
            var notice = this.noticetext;
            // notice.text = "54% of your Teammates (7 out of 13) have so far voted the Carefulness & Power Tension Scale. Here are Early Insights:"
            notice.width = 600;
            notice.x = -350;
            notice.y = 60 - 190;
            notice.background = true;
            notice.backgroundColor = 0x359f93;
        };
        ExpandedTensionScale.prototype.tip2 = function () {
            var tip = this.tiptext;
            tip.text = '';
            tip.width = 350;
            tip.x = -350;
            tip.y = 80;
            tip.background = true;
            tip.backgroundColor = 0x359f93;
            this.sprite.addChild(tip);
        };
        ExpandedTensionScale.prototype.tip = function () {
            var tip = this.feedbacktext;
            // tip.text = "• Your Self-Perception at 6 points is inside the preliminary Zone of Responsible Action.\n\n• Your teammates rank you at 46 a total of 40 points higher than your self-perception at 6 points.\n\n• While 21 points is the lowest and 70 points the highest value that others attributed to you.\n\n"
            tip.width = 350;
            tip.x = -350;
            tip.y = 180 - 190;
            tip.background = true;
            tip.backgroundColor = 0x359f93;
            this.sprite.addChild(tip);
        };
        ExpandedTensionScale.prototype.saveResult = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getttsmindividual', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.playerName,
                'gameName': self.gameName,
                'c1': self.character1,
                'c2': self.character2,
                'chooser': self.chooser
            }).then(function (response) {
                self.teamTensionScaleMedian = response['ttsm'];
                self.individualTensionScale = response['individualTensionScale'];
                var playerCount = response['playerCount'];
                var votedScalesNumber = self.individualTensionScale.length + 1;
                if (votedScalesNumber == playerCount) {
                    var idTimeout = egret.setTimeout(function (arg) {
                        var renderTexture = new egret.RenderTexture();
                        if (self.sprite.visible == false) {
                            self.sprite.visible = true;
                        }
                        renderTexture.drawToTexture(self.stage);
                        var base64Str = renderTexture.toDataURL("image/png");
                        base.API.call('save_result', {
                            'base64Str': base64Str,
                            'player': self.playerName,
                            'name': 'ExpandedTensionScale' + self.scorecount.toString(),
                            'game_secret': self.game_secret,
                            'inviter': self.inviter
                        });
                        self.resultTimer.stop();
                        self.sprite.visible = false;
                    }, this, 1000, "egret");
                }
            });
        };
        ExpandedTensionScale.prototype.nextTouch = function () {
            this.rightIcon.touchEnabled = false;
            var process = '1';
            var missionName = '1';
            this.timer.stop();
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('save_players_process', {
                'inviter_name': this.inviter,
                'game_secret': this.game_secret,
                'player': this.playerName,
                'game_name': this.gameName,
                'process': '1.' + this.scorecount.toString() + '2'
            }).then(function (response) {
            });
            // var idTimeout:number = egret.setTimeout( function( arg ){
            this.sprite.visible = false;
            // this.removeChild(this.sprite)
            var keepUpVoting = new game.KeepUpVoting(this.stageWidth, this.stageHeight, process, missionName, this.inviter, this.game_secret, this.playerName, this.gameName, this.scorecount);
            this.stage.addChild(keepUpVoting);
            // }, this, 1000, "egret"
            // );
        };
        ExpandedTensionScale.prototype.tensionScale = function () {
            // // 上面的性格
            var _this = this;
            // ZORA 区域绘制
            var zoraMedian = this.teamTensionScaleMedian;
            console.log(zoraMedian);
            var zoraMedianPosition = zoraMedian * (810 / 81) - 5 / 2;
            var zoraMin = zoraMedian - 13;
            this.zoraMin = zoraMin;
            var zoraMax = zoraMedian + 13;
            var zoraMinPosition = zoraMin * (810 / 81);
            var zoraMaxPosition = zoraMax * (810 / 81);
            // let zora: egret.Shape = new egret.Shape()
            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, zoraMinPosition, 230, zoraMaxPosition - zoraMinPosition)
            // zora.graphics.endFill()
            // this.sprite.addChild(zora)
            var zora = this.zora;
            zora.height = zoraMaxPosition - zoraMinPosition;
            zora.y = zoraMinPosition;
            this.sprite.setChildIndex(zora, 0);
            this.zoraMedianLine.y = zoraMedianPosition;
            // let zoraMedianLine: egret.Shape = new egret.Shape()
            // zoraMedianLine.graphics.lineStyle(5, 0x333333)
            // zoraMedianLine.graphics.moveTo(this._x, zoraMedianPosition)
            // zoraMedianLine.graphics.lineTo(250, zoraMedianPosition)
            // zoraMedianLine.graphics.endFill()
            // this.sprite.addChild(zoraMedianLine)
            // 自我评价分
            var selfPerception = new egret.TextField();
            selfPerception.text = this.selfPerception.toString();
            selfPerception.textColor = 0x000000;
            selfPerception.x = this._x + this.character1Sprite.width / 2;
            selfPerception.y = this.selfPerception / 81 * 810 - selfPerception.height / 2;
            selfPerception.width = 70;
            selfPerception.textAlign = egret.HorizontalAlign.CENTER;
            selfPerception.border = true;
            selfPerception.borderColor = 0x000000;
            selfPerception.background = true;
            selfPerception.backgroundColor = 0xffffff;
            selfPerception.touchEnabled = true;
            selfPerception.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                selfPerception.width = selfPerception.width * 2.5;
                selfPerception.height = selfPerception.height * 2;
                selfPerception.size = selfPerception.size * 2;
                selfPerception.x = selfPerception.x - 100;
            }, self);
            selfPerception.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                selfPerception.width = selfPerception.width / 2.5;
                selfPerception.height = selfPerception.height / 2;
                selfPerception.size = selfPerception.size / 2;
                selfPerception.x = selfPerception.x + 100;
            }, self);
            selfPerception.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                selfPerception.width = selfPerception.width / 2.5;
                selfPerception.height = selfPerception.height / 2;
                selfPerception.size = selfPerception.size / 2;
                selfPerception.x = selfPerception.x + 100;
            }, self);
            var selftiptext = '• Your Self-Perception at\n' + this.selfPerception.toString() + ' points is inside the\npreliminary Zone of\nResponsible Action.\n\n';
            if (zoraMin > this.selfPerception || this.selfPerception > zoraMax) {
                selfPerception.backgroundColor = 0xcc9932;
                selftiptext = '• Your Self-Perception at\n' + this.selfPerception.toString() + ' points is outside the\npreliminary Zone of\nResponsible Action.\n\n';
            }
            this.sprite.addChild(selfPerception);
            // 玩家名
            var playerName = new egret.TextField();
            playerName.text = this.playerName;
            playerName.textColor = 0x000000;
            playerName.x = selfPerception.x - playerName.width;
            playerName.y = this.selfPerception / 81 * 810 - playerName.height / 2;
            playerName.width = 100;
            playerName.textAlign = egret.HorizontalAlign.CENTER;
            playerName.border = true;
            playerName.borderColor = 0x000000;
            playerName.touchEnabled = true;
            playerName.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                playerName.width = playerName.width * 2.5;
                playerName.height = playerName.height * 2;
                playerName.size = playerName.size * 2;
                playerName.x = playerName.x - 100;
            }, self);
            playerName.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                playerName.width = playerName.width / 2.5;
                playerName.height = playerName.height / 2;
                playerName.size = playerName.size / 2;
                playerName.x = playerName.x + 100;
            }, self);
            playerName.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                playerName.width = playerName.width / 2.5;
                playerName.height = playerName.height / 2;
                playerName.size = playerName.size / 2;
                playerName.x = playerName.x + 100;
            }, self);
            if (this.playerName.length * 18 < 100) {
                playerName.width = 100;
                playerName.x = selfPerception.x - playerName.width;
            }
            else {
                playerName.width = this.playerName.length * 18;
                playerName.x = selfPerception.x - playerName.width;
            }
            this.sprite.addChild(playerName);
            // 绘制 ITSM
            if (this.individualTensionScale.length > 0) {
                console.log(this.individualTensionScale);
                this.individualTensionScaleMedian = Math.round(this.individualTensionScale.reduce(function (previous, current) { return current += previous; }) / this.individualTensionScale.length);
                this.deviationBetweenITSM_SP = this.selfPerception - this.individualTensionScaleMedian;
            }
            var itsm_Deviation = this.itsm_Deviation;
            itsm_Deviation.text = this.individualTensionScaleMedian.toString() + "/" + this.deviationBetweenITSM_SP.toString();
            itsm_Deviation.y = this.individualTensionScaleMedian / 81 * 810 - itsm_Deviation.height / 2;
            if (zoraMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > zoraMax) {
                itsm_Deviation.backgroundColor = 0xfeff33;
            }
            // ITSM 的玩家名
            var individualTensionScaleMedianPlayerName = this.individualTensionScaleMedianPlayerName;
            individualTensionScaleMedianPlayerName.text = this.playerName;
            individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width;
            individualTensionScaleMedianPlayerName.y = this.individualTensionScaleMedian / 81 * 810 - individualTensionScaleMedianPlayerName.height / 2;
            if (this.playerName.length * 18 < 100) {
                individualTensionScaleMedianPlayerName.width = 100;
                individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width;
            }
            else {
                individualTensionScaleMedianPlayerName.width = this.playerName.length * 18;
                individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width;
            }
            // 其他玩家分数
            this.individualTensionScale.forEach(function (val, index, array) {
                var individualTensionScale = new egret.TextField();
                individualTensionScale.text = _this.individualTensionScale[index].toString();
                individualTensionScale.x = _this._x + _this.character1Sprite.width / 2;
                individualTensionScale.y = _this.individualTensionScale[index] / 81 * 810 - individualTensionScale.height / 2;
                individualTensionScale.width = 70;
                individualTensionScale.textAlign = egret.HorizontalAlign.CENTER;
                individualTensionScale.textColor = 0x000000;
                individualTensionScale.border = true;
                individualTensionScale.borderColor = 0x000000;
                individualTensionScale.background = true;
                individualTensionScale.backgroundColor = 0xffffff;
                individualTensionScale.touchEnabled = true;
                individualTensionScale.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                    individualTensionScale.width = individualTensionScale.width * 2.5;
                    individualTensionScale.height = individualTensionScale.height * 2;
                    individualTensionScale.size = individualTensionScale.size * 2;
                    individualTensionScale.x = individualTensionScale.x - 100;
                }, self);
                individualTensionScale.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                    individualTensionScale.width = individualTensionScale.width / 2.5;
                    individualTensionScale.height = individualTensionScale.height / 2;
                    individualTensionScale.size = individualTensionScale.size / 2;
                    individualTensionScale.x = individualTensionScale.x + 100;
                }, self);
                individualTensionScale.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                    individualTensionScale.width = individualTensionScale.width / 2.5;
                    individualTensionScale.height = individualTensionScale.height / 2;
                    individualTensionScale.size = individualTensionScale.size / 2;
                    individualTensionScale.x = individualTensionScale.x + 100;
                }, self);
                if (index % 2 == 0) {
                    individualTensionScale.x = _this._x + _this.character1Sprite.width / 2 - individualTensionScale.width;
                }
                if (zoraMin > _this.individualTensionScale[index] || _this.individualTensionScale[index] > zoraMax) {
                    individualTensionScale.backgroundColor = 0xcc9932;
                }
                _this.sprite.addChild(individualTensionScale);
            });
            // 添加玩家 SelfPerception
            // let allSelfPerception = []
            // allSelfPerception.push(this.selfPerception)
            // allSelfPerception.push(this.individualTensionScale[index])
            // allSelfPerception.sort()
            // allSelfPerception.pop()
            // allSelfPerception.shift()
            var othersSelfPerception = this.individualTensionScale;
            othersSelfPerception.sort();
            var low = 0;
            var hight = 0;
            if (othersSelfPerception.length < 2) {
                low = othersSelfPerception[0];
                hight = othersSelfPerception[0];
            }
            else {
                hight = othersSelfPerception.pop();
                low = othersSelfPerception.shift();
            }
            if (this.individualTensionScaleMedian >= this.selfPerception) {
                var itsmtiptext = '• Your teammates rank\nyou at ' + this.individualTensionScaleMedian.toString() + ' a total of ' + (Math.abs(this.individualTensionScaleMedian - this.selfPerception)).toString() + '\npoints higher than your\nself-perception at ' + this.selfPerception.toString() + ' points.\n\n';
            }
            else {
                var itsmtiptext = '• Your teammates rank\nyou at ' + this.individualTensionScaleMedian.toString() + ' a total of ' + (Math.abs(this.individualTensionScaleMedian - this.selfPerception)).toString() + '\npoints lower than your\nself-perception at ' + this.selfPerception.toString() + ' points.\n\n';
            }
            var hightlowtexgt = '• While ' + low + ' points is the\nlowest and ' + hight + ' points the\nhighest value that others\nattributed to you.\n\n';
            this.feedbacktext.text = selftiptext + itsmtiptext + hightlowtexgt;
            var s = 0;
            this.individualTensionScale.forEach(function (val, idx, arr) {
                s += val;
            }, 0);
            var itsm = Math.ceil(s / this.playerCount);
        };
        return ExpandedTensionScale;
    }(egret.DisplayObjectContainer));
    game.ExpandedTensionScale = ExpandedTensionScale;
    __reflect(ExpandedTensionScale.prototype, "game.ExpandedTensionScale");
})(game || (game = {}));
//# sourceMappingURL=ExpandedTensionScale.js.map