import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonList, NavController, Platform, ToastController } from '@ionic/angular';
import { Article } from '../article.model';
//import { ArticleService } from '../article.service';
import { IonicStorageService } from '../ionic-storage.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.page.html',
  styleUrls: ['./formulaire.page.scss'],
})
export class FormulairePage implements OnInit {
  @ViewChild('mylist', { static: false }) mylist: IonList;

  forms: Article[] = [];
  newItem: Article = {} as Article;
  ionicForm: FormGroup = this.formBuilder.group({
    id: [[], Validators.required],
    nom: [[], Validators.required],
    prix: [[], Validators.required],
    taille: [[], Validators.required],
    link: [[], Validators.required],
    statut: [[], Validators.required],
    category: [[], Validators.required],
    color: [[], Validators.required]
  });



  constructor(public formBuilder: FormBuilder,
   // private service: ArticleService,
    private storageService: IonicStorageService,
    public toastCtrl: ToastController,
    private nvctrl: NavController,
    private platform: Platform) {
      // this.platform.ready()
      // .then(() => {
      //   this.loadItems();
      // });
    }

  ngOnInit() {
  }

  loadItems() {
    // this.storageService.getItems()
    //   .then(items => {
    //     this.forms = items;
    //   });
  }

//   translation(){
//   if(this.ionicForm.valid){
//     // const article: Article = {
//     //   id: this.ionicForm.get('id')?.value,
//     //   nom: this.ionicForm.get('nom')?.value,
//     //   prix: this.ionicForm.get('prix')?.value,
//     //   taille: this.ionicForm.get('taille')?.value,
//     //   link: this.ionicForm.get('link')?.value,
//     //   info: {
//     //        statut: this.ionicForm.get('statut')?.value,
//     //        category: this.ionicForm.get('category')?.value,
//     //        color: this.ionicForm.get('color')?.value
//     //   }
//     // };
//     this.storageService.addItem(this.article).then(() => {
//       this.article = ({} as Article);
//       this.showToast('Formulaire ajouté!');
//       this.loadItems();
//     });
//     this.previousState();
//   }
// }

setValue() {
  this.newItem.id = Date.now();
  this.newItem.nom=this.ionicForm.get('nom')?.value;
  this.newItem.prix=this.ionicForm.get('prix')?.value;
  this.newItem.taille=this.ionicForm.get('taille')?.value;
  this.newItem.link=this.ionicForm.get('link')?.value;
  this.storageService.updateItem(this.newItem);
  // this.newItem.info.statut=this.ionicForm.get('statut')?.value;
  // this.newItem.info.category=this.ionicForm.get('category')?.value;
  // this.newItem.info.color=this.ionicForm.get('color')?.value;
}


 // CREATE
 addForm() {
 // this.newItem.modified = Date.now();
//this.newItem = this.article;
this.setValue();
  this.storageService.addItem(this.newItem)
    .then(() => {
      this.newItem = ({} as Article);
      this.showToast('Formulaire ajouté!');
      this.loadItems();
    });
    this.nvctrl.navigateRoot('');
}
// UPDATE
updateForm(form: Article) {
  form.nom = `Updated: ${form.nom}`;
//  form.createdAt = Date.now();

  this.storageService.updateItem(form)
    .then(() => {
      this.showToast('Formulaire actualisé!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
}
// DELETE
deleteForm(form: Article) {
  this.storageService.deleteItem(form.id)
    .then(() => {
      this.showToast('Formulaire supprimé!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
}

// Helper
async showToast(msg) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

//  submitForm() {
//   console.log(this.ionicForm.value);
// }
// onSubmit(){
//   if(this.ionicForm.valid){
//     const article: Article = {
//       id: this.ionicForm.get('id')?.value,
//       nom: this.ionicForm.get('nom')?.value,
//       prix: this.ionicForm.get('prix')?.value,
//       taille: this.ionicForm.get('taille')?.value,
//       link: this.ionicForm.get('link')?.value,
//       info: {
//            statut: this.ionicForm.get('statut')?.value,
//            category: this.ionicForm.get('category')?.value,
//            color: this.ionicForm.get('color')?.value
//       }
//     };
//     this.service.addArticle(article);
//     this.previousState();
//   }
// }

previousState(){
 window.history.back();
}

}
