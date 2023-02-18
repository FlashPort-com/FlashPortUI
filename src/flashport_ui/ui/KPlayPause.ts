import { GradientType } from "flashport";
import { Sprite } from "flashport";
import { Matrix } from "flashport";
import { MouseEvent } from "flashport";
import { AEvent } from "flashport";
	
/**
 * ...
 * @author Kenny Lerma
 */
export class KPlayPause extends Sprite 
{
	private _play:Sprite;
	private _pause:Sprite;
	private _isPlay:boolean = true;
	
	constructor(size:number = 33) 
	{
		super();
		
		this.mouseChildren = false;
		this.buttonMode = true;
		
		var colors:number[] = [0xFFFFFF, 0x999999];
		var alphas:number[] = [1, 1];
		var ratios:number[] = [127, 255];
		var matrix:Matrix = new Matrix()
		matrix.createGradientBox(size, size, 90/180*Math.PI);
		
		this.graphics.lineStyle(1.5, 0x666666, 1, true, "none");
		this.graphics.beginGradientFill(GradientType.LINEAR, colors, alphas, ratios, matrix );
		this.graphics.drawRoundRect(0, 0, size, size, 9, 9);
		
		this._play = new Sprite(); 
		this._play.graphics.lineStyle(1.25, 0xCCCCCC, 1, true, "none");
		this._play.graphics.beginFill(0x00BB00);
		this._play.graphics.moveTo(size/4, this.y);
		this._play.graphics.lineTo(size/2, (size/2)+this.y);
		this._play.graphics.lineTo(this.x, (size/2)+this.y);
		this._play.graphics.lineTo(size / 4, this.y);
		this._play.rotation = 90;
		this._play.x = this._play.width + (this._play.width / 2) - 1;
		this._play.y = (this._play.height / 2);
		this.addChild(this._play);
		
		this._pause = new Sprite();
		this._pause.graphics.lineStyle(4, 0xBF0000, 1, true, "none");
		this._pause.graphics.moveTo((size / 3) + 2, size / 3);
		this._pause.graphics.lineTo((size / 3) + 2, (size / 3) * 2);
		this._pause.graphics.moveTo(((size / 3) * 2) - 2, size / 3);
		this._pause.graphics.lineTo(((size / 3) * 2) - 2, (size / 3) * 2);
		//_pause.x = (this.width - _pause.width) / 2;
		//_pause.y = (this.height - _pause.height) / 2;
		
		this.addEventListener(MouseEvent.CLICK, this.OnPlayClicked);
	}
	
	private OnPlayClicked = (e:MouseEvent = null):void =>
	{
		if (this._isPlay)
		{
			if(this.contains(this._play)) this.removeChild(this._play);
			this.addChild(this._pause);
			this._isPlay = false;
		}
		else
		{
			if(this.contains(this._pause)) this.removeChild(this._pause);
			this.addChild(this._play);
			this._isPlay = true;
		}
		
		if(e) this.dispatchEvent(new AEvent(AEvent.CHANGE));
	}
	
	public set enabled(value:boolean) 
	{
		if (value)
		{
			this.addEventListener(MouseEvent.CLICK, this.OnPlayClicked);
			this.alpha = 1;
		}
		else
		{
			this.removeEventListener(MouseEvent.CLICK, this.OnPlayClicked);
			this.alpha = .50;
		}
	}
	
	public get isPlay():boolean 
	{
		return this._isPlay;
	}
	
	public set isPlay(value:boolean) 
	{
		this._isPlay = value;
		this.OnPlayClicked();
	}
}