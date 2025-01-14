import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';
import {PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatDialog} from '@angular/material';
import {UpdateAvailableEvent} from '@angular/service-worker/src/low_level';
import { environment } from '../../environments/environment';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private dialog: MatDialog,
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    console.log('SW CONST', environment);
    if (environment.production && isPlatformBrowser(platformId)) {
      console.log('SW INIT');
      swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        console.log('update available', event);
        this.openDialog(event);
      });
      swUpdate.activated.subscribe(event => {
        console.log('update activated', event);
      });

      interval(6 * 60 * 60).subscribe(() => swUpdate.checkForUpdate());
    }
    // this.openDialog(<any>{});
  }
  openDialog(data: UpdateAvailableEvent): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
