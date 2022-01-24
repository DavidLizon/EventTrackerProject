import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { Store } from 'src/app/models/store';
import { PurchaseService } from 'src/app/services/purchase.service';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private purchaseService: PurchaseService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.loadPurchases();
  }


  stores: Store[] = [];
  purchases: Purchase[] = [];
  selectedPurchase: Purchase | null = null;
  editPurchase: Purchase | null = null;
  newPurchase: Purchase = new Purchase;
  addPurchase: boolean = false;
  deleting: boolean = false;


  loadPurchases() {
    this.purchaseService.index().subscribe (
      data => this.purchases = data,

      err => console.log('Observer got an error ' + err)
    )
  };

  reload() {
    this.purchaseService.index().subscribe({
      next: (purchaseList) => {
        this.purchases = purchaseList;
      },
      error: (wrong) => {
        console.error('ProductListComponent.reload(): Error retreiving purchases.');
        console.error(wrong);
      }
    });
  }

  displayPurchase(purchase: Purchase) {
    this.selectedPurchase = purchase;
  }

  setEditPurchase() {
    this.editPurchase = Object.assign({}, this.selectedPurchase);;
  }

  updatePurchase(purchase: Purchase) {
    console.log(purchase);

    this.purchaseService.updatePurchase(purchase).subscribe({
      next: (purch) => {
        this.editPurchase = null;
        if(purch) {
            this.selectedPurchase = purch;
          }
          this.reload();
        },
        error: (wrong) => {
          console.error('PurchaseListComponent.updatePurchase(): error on update');
          console.error(wrong);
        }
      });
  }

  createPurchase(purchase: Purchase) {
    this.purchaseService.createPurchase(purchase).subscribe({
      next: (purchase) => {
        this.newPurchase = new Purchase();
        this.reload();
      },
      error: (fail) => {
        console.error('Error creating purchase');
        console.error(fail);
      }
    });
  }

  deletePurchase(purchaseId: number) {
    this.purchaseService.deletePurchase(purchaseId).subscribe({
      next: () => {
        // this.deleting = false;
        this.reload();
      },
      error: (fail) => {
        console.error(('PurchaseComponenet.deletePurchase(): error deleting purchase.'));
        console.error(fail);
      }
    });
  }

  loadStores() {
    this.storeService.index().subscribe (
      data => this.stores = data,

      err => console.log('Observer got an error ' + err)
    )
  };



}
