import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  constructor(private seetingService: SettingsService) {
   }

  ngOnInit(): void {
    this.seetingService.checkCurrentTheme();
  }

  changeTheme(theme: string){
  this.seetingService.changeTheme(theme);
  }

}
