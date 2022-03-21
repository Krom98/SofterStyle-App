/* eslint-disable radix */
import { Injectable, Input } from '@angular/core';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
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
  constructor() { }

  getList(): Article[]{
    return this.articleData;
  }

  getListById(id: number): Article |undefined{
    const lists=this.articleData.find(value => value.id === id);
    return lists;
  }

  addArticle(article: Article): void {
    article.id = this.getId();
    this.articleData.push(article);
  }
  private getId(): number{

    let idMax = 0;
    this.articleData.forEach(article =>{
      if(article.id && article.id > idMax){
        idMax = article.id;
      }
    });
    return idMax +1;

  }



}
