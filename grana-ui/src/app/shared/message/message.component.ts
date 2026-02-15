import { Component, Input } from "@angular/core"; 
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-message",
  template: `
    <div *ngIf="temErro()" class="p-error">
        {{ text }}
    </div>


`,
})
export class MessageComponent {

    @Input() error: string = 'null';

    @Input() control: any;
    
    @Input() text: string = '  ';


    temErro(): boolean {
        return this.control.hasError(this.error) && this.control.dirty;
    }



}   