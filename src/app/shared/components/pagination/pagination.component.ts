import {  Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throws } from 'assert';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  public data: Array<any> = [];
   public currentPage: any;
   public lastPage: any;
   public last_limit!:number;
   @Input() public set paginateData(val: any) {    
     if (val && val.hasOwnProperty("currentPage")) {
       this.currentPage=parseInt(val.currentPage);
       this.lastPage = val.lastPage;
       if(!this.last_limit || val.currentPage == 1) {
         // Only assign once per list / page load
         this.last_limit = this.lastPage > 10 ? 10 : this.lastPage;
       }
       else if(this.currentPage === this.lastPage && this.last_limit !== this.lastPage){
        this.last_limit = this.lastPage > 10 ? 10 : this.lastPage;
       }
       this.setPaginateData(val);
     }
   }

   @Output() pageno:EventEmitter<number> = new EventEmitter<number>();
  constructor(){}
  ngOnInit(): void {
    
  }

/**************** ************
   Function name : setPaginateData
   Author :
   CreatedDate : 15.11.2021

   Purpose : Set Paginate Data
   Params: data
*****************************/
   setPaginateData(data:any) {
    this.data=[];
    let _factor = (this.last_limit >= 10 && this.last_limit % 10 === 0 ? 10 : this.last_limit % 10);
    let i = (this.last_limit - _factor) + 1;
    if(this.currentPage > this.last_limit) {
      // Increase by 10 Page
      this.last_limit += 10;
      this.last_limit = this.last_limit > this.lastPage ? this.lastPage : this.last_limit;
      // Start from the current page
      i = this.currentPage;
    } else if(this.currentPage < i) {
      // User moves to previous list
      this.last_limit = (this.last_limit % 10 === 0 ? this.last_limit - 10 : (this.last_limit - (this.last_limit % 10)));
      _factor = (this.last_limit >= 10 && this.last_limit % 10 === 0 ? 10 : this.last_limit % 10);
      i = (this.last_limit - _factor) + 1;
    }
    for (; i <= this.last_limit; i++) {
      this.data.push(i);
    }
  }

/**************** ************
  Function name : getList
  Author :
  CreatedDate : 15.11.2021

  Purpose : Page List
  Params: page
*****************************/
  getList(page:number) {
    if(page < 1 || page > this.lastPage) return;
    this.pageno.emit(page);
  }
}
