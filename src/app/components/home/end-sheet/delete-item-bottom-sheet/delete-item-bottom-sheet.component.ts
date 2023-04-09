import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DeleteItemBottomSheetData } from 'src/app/core/_bottom-sheet/delete-item-bottom-sheet-data';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-delete-item-bottom-sheet',
  templateUrl: './delete-item-bottom-sheet.component.html',
  styleUrls: ['./delete-item-bottom-sheet.component.scss']
})

export class DeleteItemBottomSheetComponent implements OnInit {
  showSpinnerProgress: boolean = false;
  currentData!: DeleteItemBottomSheetData;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<DeleteItemBottomSheetComponent>,
    private databaseService: DatabaseService,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: DeleteItemBottomSheetData,
  ) {
    this.currentData = data;
  }

  ngOnInit(): void { }

  close() {
    this.bottomSheetRef.dismiss();
  }

  delete() {
    switch (this.currentData.mode) {
      case 0x1:
        this.databaseService.delete(String(this.getCurrentMode(this.currentData.mode)), this.currentData.item);
        break;
      case 0x2: break;
      case 0x3: break;
      default: break;
    }

    this.bottomSheetRef.dismiss({ action: 'delete', label: this.currentData.mode, item: this.currentData.item });
  }

  getCurrentMode(mode: number) {
    switch (mode) {
      case 0x1:
        return EndSheetLabel.SERVICE;
      case 0x2:
        return EndSheetLabel.SERVICE_PROVIDER;
      case 0x3:
        return EndSheetLabel.INSURANCE;
      default:
        return null;
    }
  }
}