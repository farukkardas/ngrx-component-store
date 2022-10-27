import { Component, OnInit } from '@angular/core';
import { PhonesStore } from './phones.store';
@Component({
  selector: 'app-books',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss'],
  providers: [PhonesStore]
})
export class PhonesComponent implements OnInit {
  phones$ = this.phonesStore.phones$;
  error$ = this.phonesStore.error$;


  constructor(private phonesStore: PhonesStore) { }

  ngOnInit(): void {
    this.phonesStore.getPhones();
  }

  add() {
    const id = Math.floor(Math.random() * 1000);
    this.phonesStore.addPhone({ id: id, title: 'New Phone ' + id, price: id, images: ['https://dummyjson.com/image/i/products/4/2.jpg'] });
  }


  remove(id: number) {
    this.phonesStore.removePhone(id);
  }

  update(id: number) {
    this.phonesStore.selectPhone(id);
    this.phonesStore.updatePhone()
  }
}
