import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
@Injectable()
export class CurrencyService {

  constructor(
     public http:HttpClient) {}


    listOfCountry() :any[] {
      return [
        
        {
          "name" : "GBP"
        },
        {
          "name" : "AUD"
        },
        {
          "name" : "USD"
        },
        {
          "name" : "JPY"
        },
        {
          "name" : "EUR"
        }
      ]  
    }

    getCurrencies(convertIn:String) :  Observable<any> {
    
      console.log("convertIn getCurrencies => ",convertIn,"  == ");
      console.log(`https://free.currencyconverterapi.com/api/v5/convert?q=INR_${convertIn}&compact=y`)
      return this.http.get<any>(`https://free.currencyconverterapi.com/api/v5/convert?q=INR_${convertIn}&compact=y`)
            
    }

}