import { Component, OnInit } from '@angular/core';
import { GetMenuConfigurationService } from '../api-services/get-menu-configuration.service';
import { MenuItem } from '../api-services/models/menuConfiguration';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  public menuList:MenuItem[];

  constructor(private menuConfigurationService:GetMenuConfigurationService) { }

  ngOnInit(): void {
    this.menuList = this.menuConfigurationService.MenuConfiguration.menuList;
  }
}
