namespace game {

    export class LoadingScene extends egret.DisplayObjectContainer {

        private sprite:egret.Sprite
        public constructor() {
            super();
            this.sprite = new egret.Sprite();
            this.sprite.graphics.beginFill(0xff0000);
            this.sprite.graphics.drawRect(0, 0, 100, 100);
            this.sprite.graphics.endFill();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;
            this.sprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.sprite.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.sprite.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        private onTouchBegin():void {
            // if( this.sprite.parent ) {
            //     this.sprite.parent.removeChild( this.sprite );
            // }
            this.sprite.visible = false
            // let buildGame = new game.BuildGame()
            // this.stage.addChild(buildGame)

        }

        private onTouchEnd():void {
            egret.log("onTouchEnd");
        }

        private onTouchMove():void {
            egret.log("onTouchMove");
        }

        private onTouchTap():void {
            egret.log("onTouchTap");
        }

    }
}