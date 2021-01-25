import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IonList,
  ModalController,
  Platform,
  PopoverController,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import {
  CashFlow,
  CashService,
  Transaction,
} from "src/app/services/cash.service";
import { CashFlowModalPage } from "../cash-flow-modal/cash-flow-modal.page";
import { FilterPopoverPage } from "../filter-popover/filter-popover.page";

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.page.html",
  styleUrls: ["./tracker.page.scss"],
})
export class TrackerPage implements OnInit {
  selectedCurrency = "";
  transactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  @ViewChild("slidingList") slidingList: IonList;
  cashflow = 0;

  constructor(
    private modalCtrl: ModalController,
    private cashService: CashService,
    private plt: Platform,
    private storage: Storage,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.plt.ready();
    this.loadTransactions();
  }

  async addCashflow() {
    let modal = await this.modalCtrl.create({
      component: CashFlowModalPage,
      cssClass: "modalCss",
    });

    modal.present();

    modal.onDidDismiss().then((res) => {
      if (res && res.data) {
        this.loadTransactions();
      }
    });
  }

  async loadTransactions() {
    await this.storage.get("selected-currency").then((currency) => {
      this.selectedCurrency = currency.toUpperCase();
    });
    await this.cashService.getTransactions().then((trans) => {
      this.transactions = trans;
      this.allTransactions = trans;
    });
    this.updateCashflow();
  }

  async removeTransaction(i) {
    this.transactions.splice(i, 1);
    this.cashService.updateTransactions(this.transactions);
    await this.slidingList.closeSlidingItems(); // Small Fix
    this.updateCashflow();
  }

  updateCashflow() {
    let result = 0;
    this.transactions.map((trans) => {
      result += trans.type == CashFlow.Expense ? -trans.value : trans.value;
    });

    this.cashflow = result;
  }

  async openFilter(e) {
    const popover = await this.popoverCtrl.create({
      component: FilterPopoverPage,
      event: e,
    });

    await popover.present();

    popover.onDidDismiss().then((res) => {
      if (res && res.data) {
        let selectedName = res.data.selected.name;
        if (selectedName == "All") {
          this.transactions = this.allTransactions;
        } else {
          this.transactions = this.allTransactions.filter((trans) => {
            return trans.category.name == selectedName;
          });
        }
      }
    });
  }
}
