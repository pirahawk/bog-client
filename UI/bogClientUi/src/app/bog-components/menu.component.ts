import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { GetMenuConfigurationService } from '../api-services/get-menu-configuration.service';
import { MenuItem } from '../api-services/models/menuConfiguration';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  public menuList: MenuItem[];
  public selectedArticleId: string;

  constructor(private menuConfigurationService: GetMenuConfigurationService,
              private router: Router) { }

  ngOnInit(): void {
    this.menuList = this.menuConfigurationService.MenuConfiguration.menuList;
    this.router.events
    .pipe(
      // map(event => {
      //   const activationEnd = event as ActivationEnd;
      //   return activationEnd;
      // })

      filter(event => event instanceof ActivationEnd)
    )
    .subscribe(
      (activationEnd: ActivationEnd) => {
        console.log(activationEnd);
        this.selectedArticleId = activationEnd.snapshot.params.contentId ? activationEnd.snapshot.params.contentId as string : '';
      });
  }
}
