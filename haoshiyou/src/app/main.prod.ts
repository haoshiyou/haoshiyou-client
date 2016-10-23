import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from './app.module.ngfactory';  //generated code

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
