/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { IonicStorageService } from '../ionic-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  forms: Article[] = [];


  newItem: Article = {} as Article;

  articleTS: Article[];
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  articlTS: Article = <Article>{} ;

  constructor(private nvctrl: NavController, private storageService: IonicStorageService, private platform: Platform,
     private articlServ: ArticleService) {
    //    this.platform.ready()
    // .then(() => {
    //   this.loadItems();
    // });
    this.storageService.getItems();
   // this.loadItems();
  }
  goToForm(): void{
    this.nvctrl.navigateForward(`/formulaire`);
  }
  goTo(id: number): void{ //
    this.nvctrl.navigateForward(`/home/${id}`); //
  }
  ngOnInit() {
    this.loadItems();
   // this.storageService.getItems();

}

   //console.log('Ngon : ' + this.storageService.getTabArticle().length);
 // }

  // loadAll(): void{
  //  this.articleTS = this.storageService.getItems;
  // }
  loadItems(): void {
  this.articleTS = this.articlServ.getList();
  this.storageService.getItems()
      .then(formItems => {
        this.forms = formItems;
        console.log(this.forms.length);
       // return this.forms;
      });
      console.log('ok '+ this.forms.length);

 }
}
