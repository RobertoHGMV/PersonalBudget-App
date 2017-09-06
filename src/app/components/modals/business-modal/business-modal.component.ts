import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { BusinessPartnerDataService } from './../../../services/businessPartner.data.service';
import { Ui } from './../../../utils/ui';

@Component({
  selector: 'app-business-modal',
  templateUrl: './business-modal.component.html',
  styleUrls: ['./business-modal.component.css'],
  providers: [BusinessPartnerDataService, Ui]
})
export class BusinessModalComponent implements OnInit {

  @Output() selectedPartner = new EventEmitter();
  @Input() businessId: any;
  public businessList: any[];

  constructor(private businessPartnerDataService: BusinessPartnerDataService, private _ui: Ui) { }

  ngOnInit() {
    this.fillTable();
  }

  fillTable() {
    this.businessPartnerDataService.getBusinessPartners().subscribe(
      result => {
        this.businessList = result;
      }
    );
  }

  showModal() {
    this._ui.setActive('modal');
  }

  hideModal() {
    this._ui.setInactive('modal');
  }

  select(businessPartner: any) {
    this.businessId = businessPartner.id;
    this.selectedPartner.emit({ partner: businessPartner })
  }

}
