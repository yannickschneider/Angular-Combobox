import { Component, OnInit, ElementRef, ViewChild, Input, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true
    }
  ]
})
export class ComboboxComponent implements OnInit, ControlValueAccessor {
  showList: boolean = false;
  @Input() data: Array<string>;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "";
  @Input() maxlength: string = "";
  @ViewChild('input') input: ElementRef;

  _inputValue = ""; 

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(val) {
    this._inputValue = val;
    this.propagateChange(this._inputValue);
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(){

  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  select(val: string){
    this.showList = false;
    this.inputValue = val;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.showList = false;
    }
  }
}

