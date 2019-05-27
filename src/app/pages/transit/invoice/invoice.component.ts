import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  saleData: any = [];
  address: any = [];
  constructor(private ApiCall: ApiService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.ApiCall.fetchData('sale?saleId=' + params['saleId']).subscribe(data => {
          let apidata = (data as any);
          this.saleData = apidata.response.data.sale;
          this.ApiCall.postData("geo/address", this.saleData.address.shipping.address).subscribe(data => {
            let apidata = (data as any);
            this.address = apidata.response.data.address;
          })
        });
      });

  }
  printPage() {
    window.print();
  }
}
