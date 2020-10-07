import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNavColor]'
})
export class NavColorDirective {

  constructor(private el: ElementRef) { 
    console.log('Directiva llamada');
  }
  @Input("appNavColor") nuevoColor:string;

  @HostListener("window:scroll", []) mouseEnter (){
    // console.log(this.nuevoColor)
    this.resaltar(this.nuevoColor || 'yellow');
    const verticalOffset = window.pageYOffset 
    || document.documentElement.scrollTop 
    || document.body.scrollTop || 0;
    // this.el.nativeElement.style.backgroundColor = 'yellow';
   }

  

    private resaltar (color: string){
     this.el.nativeElement.style.backgroundColor = color;
    }

}

/* [appNavColor]="'#202060'" */