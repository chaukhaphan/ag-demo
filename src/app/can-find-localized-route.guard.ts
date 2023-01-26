import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

// Before displaying the 404 page, see if the route
// was localized. If not, try navigating to a localized
// version of the route.
@Injectable()
export class CanFindLocalizedRouteGuard implements CanActivate {
  constructor(
    private translateService: TranslateService,
    public localizeService: LocalizeRouterService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // First, see if this route is already localized.
    // If it isn't redirect to the localized route.
    // If the route is already localized, then this
    // is a real 404 situation. Don't try redirecting.
    const params = route.params;
    const currentLocale = this.localizeService.parser.currentLang;
    const firstUrlSegment =
      route.url && route.url[0] ? route.url[0].toString() : null;
    // If the route isn't localized to the current locale, try
    // the same route but with the locale added.
    //
    // If that doesn't work, this block will be skipped (because
    // the current locale will now be the first url segment)
    // and the 404 page will be rendered.
    if (firstUrlSegment !== currentLocale) {
      const path = '/' + route.url.join('/');
      const translatedPath = this.localizeService.translateRoute(path);

      this.router.navigate([translatedPath, params]);

      return false;
    }

    return true;
  }
}
