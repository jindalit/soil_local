import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'currency-cell',
    template: `{{params.value | currency:'INR'}}`
})
export class CurrencyComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }
}