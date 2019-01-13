import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from '../../pages/currency.service';
import { ActionSheetController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public http: HttpClient,
    public currencyService: CurrencyService,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.exchange(this.source);
  }

  public source: String = "GBP";
  public target;
  public input: String = null;
  public amountInINR: number = 1;
  public convertIn: number = 0;
  public outputs = [];

  ionViewWillEnter() {

    this.outputs = this.currencyService.listOfCountry();

  }

  selectedCountry(selected: String) {
    this.source = selected;
    this.exchange(this.source);
  }

  exchange(convertIn: String) {
    console.log("convertIn exchange => ", convertIn);
    this.currencyService.getCurrencies(convertIn).subscribe(currencyRates => {
      console.log("currencyRates exchange => ", currencyRates);
      var temp = `INR_${this.source}`;
      console.log("temp => ", temp, "== ", this.amountInINR);
      this.convertIn = (this.amountInINR * parseFloat(currencyRates[temp].val)).toFixed(3);
      console.log("temp 1 => ", this.convertIn);
    });
  }


  presentActionSheet() {
    console.log("hh")
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Please select currency to be converted ',
      buttons: [
        
        {
          text: 'GBP',
          role: 'destructive',
          handler: () => {
            console.log('GBP clicked');
            this.selectedCountry('GBP');
            actionSheet.dismiss();
          }
        },
        {
          text: 'AUD',
          role: 'destructive',
          handler: () => {
            console.log('AUD clicked');
            this.selectedCountry('AUD');
            actionSheet.dismiss();
          }
        },
        {
          text:  'JPY',
          role: 'destructive',
          handler: () => {
            console.log('JPY clicked');
            this.selectedCountry('JPY');
            actionSheet.dismiss();
          }
        },
        {
          text: 'EUR',
          role: 'destructive',
          handler: () => {
            console.log('EUR clicked');
            this.selectedCountry('EUR');
            actionSheet.dismiss();
          }
        },
        {
          text:  'USD',
          role: 'destructive',
          handler: () => {
            console.log('USD clicked');
            this.selectedCountry('USD');
            actionSheet.dismiss();
          }
        },
        {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
           this.selectedCountry(this.source);
           actionSheet.dismiss();
         }
       }
      ]  
    });

    actionSheet.present();
  }

}
