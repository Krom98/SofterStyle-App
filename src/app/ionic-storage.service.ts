import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from './article.model';

const articleKey = 'articleFormItems';

@Injectable({
  providedIn: 'root'
})


export class IonicStorageService {
  private storageD: Storage | null = null;

  private articleData: Article[]=[
    {
      id: 1,
      nom: 'Gucci',
      prix: 15000,
      taille: 51,
      link: 'assets/img/tee2.png',
      info: {
        statut: true,
        category: 'homme',
        color: 'noir'
      }
    },
    {
      id: 2,
      nom: 'Gabbana',
      prix: 15000,
      taille: 41,
      link: 'assets/img/tee3.png',
      info: {
        statut: true,
        category: 'homme',
        color: 'noir'
      }
    },
    {
      id: 3,
      nom: 'Gucci',
      prix: 15000,
      taille: 71,
      link: 'assets/img/tee4.jpeg',
      info: {
        statut: true,
        category: 'homme',
        color: 'noir'
      }}
  ];

  constructor(private storage: Storage) {  this.init();}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storageD = storage;
  }

  //create
  addItem(item: Article): Promise<any> {
    return this.storage.get(articleKey)
    .then((formItems: Article[]) => {
      if (formItems) {
        formItems.push(item);
        return this.storage.set(articleKey, formItems);
      } else {
        return this.storage.set(articleKey, [item]);
      }
    });
  }

  //read
  getItems(): Promise<Article[]> {
    return this.storage.get(articleKey);
  }

  //update
  updateItem(item: Article): Promise<any> {
    return this.storage.get(articleKey)
      .then((formItems: Article[]) => {
        // If items does not exist or length is 0 return null
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: Article[] = [];

        // Loop througth the array and check if exist the added item
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item); // Push newItem
          } else {
            newFormItem.push(form);
          }
        }
        return this.storage.set(articleKey, newFormItem);
      });
  }
  //delete
  deleteItem(id: number): Promise<any> {
    return this.storage.get(articleKey)
      .then((formItems: Article[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: Article[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set(articleKey, formsToKeep);
      });
  }

  getList(): Article[]{
    return this.articleData;
  }

  getListById(id: number): Article |undefined{
    const lists=this.articleData.find(value => value.id === id);
    return lists;
  }

}
