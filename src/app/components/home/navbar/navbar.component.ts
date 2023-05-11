import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() menuClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', (e: any) => this.handleScroll(e));
  }

  sendMenuClickEvent() {
    this.menuClicked.emit(true);
  }

  handleScroll(event: any) {
    let navbar = document.getElementById('app-navbar') as HTMLElement;
    let sticky = Number(navbar?.offsetTop);

    if (window.scrollY >= sticky) {
      let w = navbar.querySelector('.wrapper') as HTMLElement;
      w.classList.add('navbar-bg');
    }
  }
}
