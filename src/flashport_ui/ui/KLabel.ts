import { TextField } from "@flashport/flashport";
import { TextFieldAutoSize } from "@flashport/flashport";
import { TextFormat } from "@flashport/flashport";

/**
 * ...
 * @author Kenny Lerma
 */
export class KLabel extends TextField
{
	
	constructor(labelText:string, color:number = 0x000000, fontSize:number = 12) 
	{
		super();

		this.defaultTextFormat = new TextFormat('Arial', fontSize, color, true); // not available in HTML5 version yet.
		//this.antiAliasType = AntiAliasType.ADVANCED;
		this.autoSize = TextFieldAutoSize.LEFT;
		this.multiline = false;
		this.wordWrap = false;
		this.embedFonts = true;
		this.text = labelText;
	}
	
}