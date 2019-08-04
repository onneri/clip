import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  iva = 16;
  clip = 3.6;
  values = [
    {name: "Contado", months: 1, fee:0, total:0, monthly: 0 },
    {name: "3 meses", months: 3, fee:4.5, total:0, monthly: 0 },
    {name: "6 meses", months: 6, fee:7.5, total:0, monthly: 0 },
    {name: "9 meses", months: 9, fee:9.9, total:0, monthly: 0 },
    {name: "12 meses", months: 12, fee:11.95, total:0, monthly: 0 }
  ];
  editingFees = false;
  calculated = false;
  amount = 0;

  constructor() {
  }

  editFeesClick(){
    this.editingFees = !this.editingFees;
  }

  calculate(){
    const { clip, iva, values, amount } = this;
    let divisor;
    let multiplier;
    let amount1;
    let amount2;
    values.forEach(function (item, index) {
      if(amount < 500 && index > 0){
        item.total = 'N/A';
        item.monthly = 'N/A';
        return;
      }
      divisor = 1 - clip / 100 - clip / 100 * iva / 100 - item.fee / 100 - item.fee / 100 * iva / 100;
      multiplier = 1 / divisor;
      const product = amount * multiplier;
      const division = amount / divisor;
      if(product >= division)
        item.total = (Math.round(product * 2) / 2).toFixed(1);
      else{
        item.total = (Math.round(division * 2) / 2).toFixed(1);
      }
      if(index == 0 ){
        item.monthly = 'N/A';
      }else {
        item.monthly = (Math.round(item.total / item.months * 100) / 100).toFixed(1);
      }
    });
    this.calculated = true;
  }
  amountKeyUp($event){
    console.log($event);
    if($event.key.toUpperCase() === 'ENTER')
      return this.calculate();
    this.calculated = false;
  }

  toggleEditFees(){
    this.editingFees = !this.editingFees;
    this.calculated = false;
  }

  ngOnInit() {
  }

}
