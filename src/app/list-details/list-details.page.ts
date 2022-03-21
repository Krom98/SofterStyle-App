import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { IonicStorageService } from '../ionic-storage.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  @Input()
  article: Article[] = [];

  listdetail: Article;
  constructor(private nvctrl: NavController,
     private route: ActivatedRoute,
     private storageService: IonicStorageService,
     private artServ: ArticleService, public alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param =>{
      const id = +param.get('id');
      this.listdetail=this.getList(id);
      // this.list = this.getList(id);
      // console.log(this.list);
    });
  }
  getList(id: number): Article {
    return this.artServ.getListById(id);
  };

  sup(id: number): void{
    this.article.splice(this.getIndex(id),1);
    this.storageService.deleteItem(this.listdetail.id);
  }

  private getIndex(id: number){
    return this.article.findIndex(book => book.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  showConfirm() {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Voulez-vous supprimer cet article?',
      message: 'Cet article ne sera plus disponible',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.sup(this.listdetail.id);
            console.log('Supprimé!');
          }
        },
        {
          text: 'Non',
          handler: () => {
            console.log('Annulé!');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
    this.sup(this.listdetail.id);
  }
}
