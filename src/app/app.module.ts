import { TrackingModule } from './features/tracking/tracking.module';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Location, registerLocaleData } from '@angular/common';
import {
  LocalizeRouterSettings,
  LocalizeRouterModule,
  LocalizeParser,
  LocalizeRouterService,
} from '@gilsdav/ngx-translate-router';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { CanFindLocalizedRouteGuard } from './can-find-localized-route.guard';
import { RouterModule } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient],
      },
      defaultLangFunction: getDefaultLang,
    }),
    TrackingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [LocalizeRouterService],
      useFactory: GlobalLocaleFactory,
    },
    CanFindLocalizedRouteGuard,
    CookieService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function HttpLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient
) {
  return new LocalizeRouterHttpLoader(
    translate,
    location,
    settings,
    http,
    '../assets/i18n/locales.json'
  );
}
export function GlobalLocaleFactory(localizeService: any) {
  registerLocaleData(localeFr);
  registerLocaleData(localeEs);
  return localizeService.parser.currentLang;
}
export function getDefaultLang(
  languages: string[],
  cachedLang?: string,
  browserLang?: string
) {
  let sessionLangCode = localStorage.getItem('lang');
  if (sessionLangCode && sessionLangCode === '2') return 'fr';
  else if (sessionLangCode && sessionLangCode === '3') return 'es';
  else {
    localStorage.setItem('lang', '1');
    return 'en';
  }
}
