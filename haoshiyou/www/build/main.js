webpackJsonp([0],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* tslint:disable */
/**
 * @module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
class BaseStorage {
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in storage.
     **/
    get(key) { }
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key, value, expires) { }
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key) { }
}
/* unused harmony export BaseStorage */

/**
 * @module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 * This is mainly required because Angular Universal integration.
 * It does inject a CookieStorage instead of LocalStorage.
 **/
class InternalStorage extends BaseStorage {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InternalStorage;

/**
 * @module SDKStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SDKStorage class is used for dependency injection swapping.
 * It will be provided using factory method according the right environment.
 * This is created for public usage, to allow persisting custom data
 * Into the local storage API.
 **/
class SDKStorage extends BaseStorage {
}
/* harmony export (immutable) */ __webpack_exports__["b"] = SDKStorage;

//# sourceMappingURL=storage.swaps.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let MapService = class MapService {
    constructor() {
        this.geocoder = new google.maps.Geocoder();
    }
    getLocality(latlng /*:google.maps.LatLng*/) {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode(/*<google.maps.GeocoderRequest>*/ { 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        let zip = "";
                        let city = "";
                        let county = "";
                        //find country name
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            var componeaddress_components = results[0].address_components[i];
                            for (var b = 0; b < componeaddress_components.types.length; b++) {
                                if (componeaddress_components.types[b] == "locality") {
                                    //this is the object you are looking for
                                    city = componeaddress_components.short_name;
                                }
                                if (componeaddress_components.types[b] == "postal_code") {
                                    //this is the object you are looking for
                                    zip = componeaddress_components.short_name;
                                }
                                if (componeaddress_components.types[b] == "administrative_area_level_2") {
                                    county = componeaddress_components.short_name;
                                }
                            }
                        }
                        return resolve({
                            city: city, zip: zip,
                            county: county
                        });
                    }
                }
                reject(status); // TODO(xinbenlv): consider add status
            });
        });
    }
};
MapService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], MapService);

//# sourceMappingURL=map.service.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HsyInteractionApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_search_params__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_error_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */







/**
 * Api services for the `HsyInteraction` model.
 */
let HsyInteractionApi = class HsyInteractionApi extends __WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */] {
    constructor(http, models, auth, searchParams, errorHandler) {
        super(http, models, auth, searchParams, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `HsyInteraction`.
     */
    getModelName() {
        return "HsyInteraction";
    }
};
HsyInteractionApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__core_auth_service__["a" /* LoopBackAuth */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_search_params__["a" /* JSONSearchParams */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"],
        __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */],
        __WEBPACK_IMPORTED_MODULE_4__core_auth_service__["a" /* LoopBackAuth */],
        __WEBPACK_IMPORTED_MODULE_5__core_search_params__["a" /* JSONSearchParams */],
        __WEBPACK_IMPORTED_MODULE_6__core_error_service__["a" /* ErrorHandler */]])
], HsyInteractionApi);

//# sourceMappingURL=HsyInteraction.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listing_creation_page__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_image_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loopbacksdk_services_custom_HsyUser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__listings_tab_page__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_flag_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










let ListingDetailPage = class ListingDetailPage {
    constructor(nav, params, imageService, api, hsyUserApi, auth, alertCtrl, ref, flagService) {
        this.nav = nav;
        this.params = params;
        this.imageService = imageService;
        this.api = api;
        this.hsyUserApi = hsyUserApi;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.ref = ref;
        this.flagService = flagService;
        this.loading = true;
        this.useGrid = !(navigator.platform == 'iPhone');
    }
    ionViewWillEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.listing == null)
                yield this.loadListing();
            ga('set', 'page', `/listing-detail.page.html#${this.listing.uid}`);
            ga('send', 'pageview');
            if (this.nav.length() == 1) {
                ga('send', 'event', {
                    eventCategory: 'go-to',
                    eventAction: 'listing-detail',
                    eventLabel: 'direct-url'
                });
            }
        });
    }
    loadListing() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.params.data['listing'] != null) {
                this.listing = yield this.params.data.listing;
                this.ref.markForCheck();
            }
            else {
                let id = this.params.data.id;
                this.listing = (yield this.api.findById(id, {
                    include: ['interactions', 'owner'],
                })
                    .take(1)
                    .toPromise());
                this.ref.markForCheck();
            }
            this.params.data.id = this.listing.uid;
            this.title = `好室友™帖子：` + this.listing.title;
            this.loading = false;
            this.hackExtractHsyGroupNickAndListing();
            return;
        });
    }
    // This is a HACK, when bot is able to handle this, we can remove this part
    hackExtractHsyGroupNickAndListing() {
        console.log(`XXX this.listing = ${this.listing}`);
        if (!this.listing.hsyGroupNick && /^group-collected-/.test(this.listing.uid)) {
            this.listing.hsyGroupNick = this.listing.uid.substr(16);
        }
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadListing();
        });
    }
    backToMain() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'listings-tab',
                eventLabel: 'direct-url'
            });
            yield this.nav.push(__WEBPACK_IMPORTED_MODULE_6__listings_tab_page__["a" /* ListingsTabPage */]);
        });
    }
    ionViewDidEnter() {
        console.log(`Entering lising detail page`);
        this.ref.markForCheck();
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nav.push(__WEBPACK_IMPORTED_MODULE_2__listing_creation_page__["a" /* CreationPage */], { listing: this.listing });
        });
    }
    claimAndEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'claim-and-edit',
            });
            if (!this.auth.authenticated()) {
                let alert = this.alertCtrl.create({
                    title: '请登录后认领',
                    buttons: [
                        {
                            text: '取消',
                        },
                        {
                            text: '登陆',
                            handler: () => {
                                this.auth.login();
                            }
                        }
                    ]
                });
                yield alert.present();
            }
            else {
                // Start claiming!
                yield this.claim();
            }
        });
    }
    claim() {
        return __awaiter(this, void 0, void 0, function* () {
            let alert = this.alertCtrl.create({
                title: `请确认认领本帖`,
                subTitle: `标题：${this.listing.title}`,
                buttons: [
                    {
                        text: '取消',
                    },
                    {
                        text: '确认',
                        handler: () => {
                            let local = window.localStorage;
                            let meId = local['user_id']; // TODO(xinbenlv): use UserService
                            this.listing.ownerId = meId;
                            this.listing.owner = null; // 防止 owner 和 ownerId 的矛盾
                            this.api.upsert(this.listing).take(1).toPromise()
                                .then((_) => __awaiter(this, void 0, void 0, function* () {
                                this.listing = yield this.api.findById(this.listing.uid, { include: ["owner"] }).take(1).toPromise();
                                this.ref.markForCheck();
                            }))
                                .catch(e => {
                                console.warn(`Error in claiming post = 
                      ${JSON.stringify(e, null, ' ')}`);
                            });
                            return true;
                        }
                    }
                ]
            });
            let ret = yield alert.present();
            return ret;
        });
    }
    fakeClaimAndEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'fake-claim-and-edit',
            });
            let alert = this.alertCtrl.create({
                title: '新版"认领并编辑"功能正在建设中',
                buttons: [
                    {
                        text: 'OK',
                    },
                ]
            });
            yield alert.present();
        });
    }
    fakeStartChat() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'fake-start-chat',
            });
            let alert = this.alertCtrl.create({
                title: '新版"私聊"功能正在建设中',
                buttons: [
                    {
                        text: 'OK',
                    },
                ]
            });
            yield alert.present();
        });
    }
    // TODO(xinbenlv): merge with the same piece of code in image-grid.
    //noinspection JSUnusedLocalSymbols, used in HTML
    showImage(imageId) {
        let el = document.getElementsByTagName('body');
        // TODO(xinbenlv): modify the viewerjs to customize the following
        // 1. click on background area to close
        let url = this.imageService.getUrlFromId(imageId, 0, 0);
        let viewer = new window.Viewer(el[0], {
            url: () => {
                return url;
            },
            inline: false,
            toolbar: true,
            title: false,
            movable: true,
            keyboard: false,
            navbar: true,
            hidden: () => {
                viewer.destroy();
            }
        });
        viewer.show();
    }
    isClaimed() {
        return !/^group-collected-/.test(this.listing.ownerId);
    }
    isMine() {
        if (this.listing) {
            return window.localStorage['user_id'] === this.listing.ownerId;
        }
        return false;
    }
    eligibleToViewContact() {
        return false;
    }
    isDebug() {
        return this.flagService.getFlag('debug');
    }
    debugStr() {
        return JSON.stringify(this.listing, null, '  ');
    }
    hasContactInfo() {
        let listing = this.listing;
        let has = ((listing.owner && (listing.owner.contactPhone || listing.owner.contactEmail || listing.owner.weixin)) || listing.hsyGroupNick && listing.hsyGroupEnum) != null;
        if (!has) {
            console.warn(`listing doesn't have contact info`, this.listing);
        }
        return has;
    }
};
ListingDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'listing-detail',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-detail.page.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-buttons start>\n            <button ion-button *ngIf="nav.length() < 2" (click)="backToMain()">\n                <ion-icon name="arrow-back"></ion-icon>全部\n            </button>\n        </ion-buttons>\n        <ion-title>{{ title ? title : \'好室友™帖子\'}}</ion-title>\n        <ion-buttons end *ngIf="isMine()">\n            <button ion-button (click)="edit()">编辑</button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content id="page-container" class="grey-background">\n    <ion-card *ngIf="!loading" offset-lg-3 col-lg-6 offset-md-2 col-md-8>\n        <ion-card-header>\n            <h2>\n                {{ listing.content ? listing.title.slice(0, 30) +\'...\' : \'详情见图片\' }}\n            </h2>\n        </ion-card-header>\n        <ion-card-content>\n        <ion-item-group>\n            <ion-item >\n                <ion-label col-3 item-left>\n                    <ion-icon name="checkmark-circle"></ion-icon>\n                    认领\n                </ion-label>\n                <div item-right text-wrap >\n                    <div text-right *ngIf="isClaimed() && isMine()">我已认领</div>\n                    <div text-right *ngIf="isClaimed() && !isMine()">房东已认领</div>\n                    <div text-right *ngIf="!isClaimed()">\n                            <button ion-button small outline (click)="claimAndEdit()">我要认领</button>\n                    </div>\n                </div>\n            </ion-item>\n            <ion-item *ngIf="listing.lastUpdated">\n                <ion-label col-3 item-left>\n                    <ion-icon name="clock"></ion-icon>\n                    更新\n                </ion-label>\n                <div item-right text-wrap>\n                    <p text-right>{{ listing.lastUpdated | dateFormatterPipe }}</p>\n                    <div text-right>{{ listing.lastUpdated | timeFromNow }}</div>\n                </div>\n            </ion-item>\n            <ion-item >\n                <ion-label col-3 item-left>\n                    <ion-icon name="clock"></ion-icon>\n                    价格\n                </ion-label>\n                <div item-right text-wrap>\n                    <div text-right>{{ listing.price ? \'$\' + listing.price : \'价格未知\' }}</div>\n                </div>\n\n            </ion-item>\n            <ion-item *ngIf="listing.addressLine && listing.addressCity">\n                <ion-label col-3 item-left>\n                    <ion-icon name="map"></ion-icon>\n                    地址\n                </ion-label>\n                <div item-right text-wrap>\n                    {{listing.addressLine}}, {{listing.addressCity}}\n                </div>\n            </ion-item>\n            <ion-item *ngIf="listing.numBedRoom && listing.numBathRoom">\n                <ion-label col-3 item-left>\n                    <ion-icon name="map"></ion-icon>\n                    情况\n                </ion-label>\n                <div item-right text-wrap>\n                    {{listing.numBedRoom}} Beds, {{listing.numBathRoom}} Baths\n                </div>\n            </ion-item>\n            <ion-item *ngIf="listing.amenityArray && listing.amenityArray.length > 0">\n                <ion-label col-3 item-left>\n                    <ion-icon name="map"></ion-icon>\n                    设施\n                </ion-label>\n                <div item-right text-wrap>\n                    <ion-badge ion-badge *ngFor="let a of listing.amenityArray">\n                        {{ a }}\n                    </ion-badge>\n                </div>\n            </ion-item>\n            <ion-item *ngIf="listing.content">\n                <ion-label col-3 item-left>\n                    <ion-icon name="paper"></ion-icon>\n                    详情\n                </ion-label>\n                <div item-right text-wrap>\n                    <p>\n                        <ng-container *ngFor="let textPiece of listing.content.split(\'\n\')">\n                            {{ textPiece }} <br/>\n                        </ng-container>\n                    </p>\n                </div>\n            </ion-item>\n        </ion-item-group>\n        <ion-item-group *ngIf="hasContactInfo()">\n            <ion-item-divider color="light">\n                联系方式\n            </ion-item-divider>\n            <ion-item *ngIf="flagService.getFlag(\'requireToContact\') &&\n                             listing.requireToContact.length > 0 && !eligibleToViewContact()">\n                <ion-label col-3 item-left>\n                    <ion-icon name="paper"></ion-icon>\n                    查看条件\n                </ion-label>\n                <div item-right text-wrap>\n                    <button color="primary" ion-button outline *ngFor="let req of listing.requireToContact">登陆{{req}}</button>\n                </div>\n            </ion-item>\n            <ng-container *ngIf="listing.requireToContact == null || listing.requireToContact.length == 0 || eligibleToViewContact()">\n                <ion-item *ngIf="listing.owner && listing.owner.contactPhone">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="contact"></ion-icon>电话\n                    </ion-label>\n                    <div item-right text-wrap >\n                        <div text-right>{{ listing.owner.contactPhone }}</div>\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.owner && listing.owner.contactEmail">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="contact"></ion-icon>邮件\n                    </ion-label>\n                    <div item-right text-wrap >\n                        <div text-right>{{ listing.owner.contactEmail }}</div>\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.hsyGroupEnum &&\n                (listing.hsyGroupNick || listing.ownerId.startsWith(\'group-collected-\'))">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="contact"></ion-icon>微信群\n                    </ion-label>\n                    <div item-right text-wrap >\n                        <p text-right>请在【好室友】{{listing.hsyGroupEnum|hsyGroupEnumMsgPipe}}群内搜索</p>\n                        <div text-right>\n                            {{ listing.hsyGroupNick ?\n                            listing.hsyGroupNick : listing.ownerId.replace(\'group-collected-\', \'\') }}</div>\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.owner && listing.owner.weixin">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="contact"></ion-icon>微信号\n                    </ion-label>\n                    <div item-right text-wrap >\n                        <div text-right>{{ listing.owner.weixin }}</div>\n                    </div>\n                </ion-item>\n            </ng-container>\n        </ion-item-group>\n            <ion-item *ngIf="isDebug()" >\n                <div style="white-space: pre;">{{debugStr()}}</div>\n            </ion-item>\n        <ion-item-group *ngIf="listing.imageIds && listing.imageIds.length > 0">\n            <ion-item-divider>\n                图片\n            </ion-item-divider>\n            <!--\n                We duplicate the grid and original ion-item because responsive\n                grid doesn\'t work well with iOS yet.\n                TODO(xinbenlv): remove this ion-list when works on iOS.\n                See https://forum.ionicframework.com/t/ion-row-wrap-attribute-doesnt-work-on-ios-devices/50603/5\n            -->\n            <ng-template [ngIf]="!useGrid">\n                <ion-item *ngFor="let imageId of listing.imageIds">\n                    <img src="{{ imageId | imageIdToUrlPipe:\'full\' }}" alt="img-{{imageId}}"\n                         data-action="zoom">\n                </ion-item>\n            </ng-template>\n            <ion-grid *ngIf="useGrid">\n                <ion-row>\n                    <ion-col col-12 col-lg-4 col-md-4 col-sm-6 col-xs-12\n                             *ngFor="let imageId of listing.imageIds">\n                        <img src="{{ imageId | imageIdToUrlPipe:\'full\' }}" alt="img-{{imageId}}"\n                             data-action="zoom">\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item-group>\n        <ion-item>\n            <button *ngIf="isClaimed() && isMine()" ion-button outline item-left large (click)="edit()">\n                <ion-label>\n                    <ion-icon name="create"></ion-icon> 编辑\n                </ion-label>\n            </button>\n            <button *ngIf="!isMine() && isClaimed()" ion-button outline item-right large (click)="fakeStartChat()">\n                <ion-label>\n                    <ion-icon name="chatbubbles"></ion-icon> 私聊\n                </ion-label>\n            </button>\n        </ion-item>\n\n        </ion-card-content>\n    </ion-card>\n    <ion-list *ngIf="loading">\n        <ion-item>\n            <ion-row align-items-center justify-content-center>\n                <ion-spinner></ion-spinner>\n            </ion-row>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-detail.page.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectionStrategy"].OnPush,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__services_image_service__["b" /* IImageService */],
        __WEBPACK_IMPORTED_MODULE_4__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */],
        __WEBPACK_IMPORTED_MODULE_5__loopbacksdk_services_custom_HsyUser__["a" /* HsyUserApi */],
        __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_8__services_flag_service__["a" /* FlagService */]])
], ListingDetailPage);

//# sourceMappingURL=listing-detail.page.js.map

/***/ }),

/***/ 182:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 182;

/***/ }),

/***/ 227:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 227;

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listings_tab_listings_tab_page__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_tab_settings_tab_page__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__disconnect_modal__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__qrcode_tab_qrcode_tab_page__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mine_tab_mine_tab_page__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let TabsPage = class TabsPage {
    constructor(nav, modalCtrl, platform, navController, network, auth) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.navController = navController;
        this.network = network;
        this.auth = auth;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        //noinspection JSUnusedGlobalSymbols
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__listings_tab_listings_tab_page__["a" /* ListingsTabPage */];
        //noinspection JSUnusedGlobalSymbols
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__settings_tab_settings_tab_page__["a" /* SettingsTabPage */];
        //noinspection JSUnusedGlobalSymbols
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_6__qrcode_tab_qrcode_tab_page__["a" /* QrCodeTabPage */];
        //noinspection JSUnusedGlobalSymbols
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_7__mine_tab_mine_tab_page__["a" /* MineTabPage */];
        this.shouldShowQrCode = true;
    }
    ngOnInit() {
        // TODO(zzn): add unread message counts
        this.platform.ready().then(() => {
            // this.shouldShowQrCode = !this.platform.is('cordova');
            if (this.platform.is("ios") || this.platform.is("android")) {
                this.disconnectModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__disconnect_modal__["a" /* DisconnectModal */]);
                this.onDisconnect = this.network.onDisconnect().subscribe(() => {
                    this.disconnectModal.present();
                });
                this.onConnect = this.network.onConnect().subscribe(() => {
                    this.disconnectModal.dismiss();
                });
            }
        });
    }
    ngOnDestroy() {
        if (this.onDisconnect)
            this.onDisconnect.unsubscribe();
        if (this.onConnect)
            this.onConnect.unsubscribe();
    }
};
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/tabs/tabs.html"*/'<ion-tabs *ngIf="shouldShowQrCode">\n    <ion-tab [root]="tab2Root" tabTitle="信息" tabIcon="map" tabUrlPath="listings-tab"></ion-tab>\n    <ion-tab [root]="tab5Root" tabTitle="我的" tabIcon="contact" tabUrlPath="mine-tab"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="设置" tabIcon="cog" tabUrlPath="settings-tab"></ion-tab>\n    <ion-tab [root]="tab4Root" tabTitle="加微信群" tabIcon="qr-scanner" tabUrlPath="qrcode-tab"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/tabs/tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_8__services_auth_service__["a" /* AuthService */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = uuid;
/* jshint bitwise:false, node:true */
/* tslint:disable:no-bitwise no-var-keyword typedef */
// taken from TodoMVC
function uuid() {
    var i, random;
    var result = '';
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }
    return result;
}
//# sourceMappingURL=uuid.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HsyUser {
    constructor(data) {
        this["avatarId"] = '';
        this["contactEmail"] = '';
        this["contactPhone"] = '';
        this["created"] = new Date(0);
        this["id"] = '';
        this["lastUpdated"] = new Date(0);
        this["name"] = '';
        this["pushNotificationRegIds"] = [];
        this["weixin"] = '';
        this.listings = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `HsyUser`.
     */
    static getModelName() {
        return "HsyUser";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of HsyUser for dynamic purposes.
    **/
    static factory(data) {
        return new HsyUser(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'HsyUser',
            plural: 'HsyUsers',
            path: 'HsyUsers',
            idName: 'id',
            properties: {
                "avatarId": {
                    name: 'avatarId',
                    type: 'string'
                },
                "contactEmail": {
                    name: 'contactEmail',
                    type: 'string'
                },
                "contactPhone": {
                    name: 'contactPhone',
                    type: 'string'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "lastUpdated": {
                    name: 'lastUpdated',
                    type: 'Date'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "pushNotificationRegIds": {
                    name: 'pushNotificationRegIds',
                    type: 'Array&lt;any&gt;'
                },
                "weixin": {
                    name: 'weixin',
                    type: 'string'
                },
            },
            relations: {
                listings: {
                    name: 'listings',
                    type: 'HsyListing[]',
                    model: 'HsyListing',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'ownerId'
                },
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HsyUser;

//# sourceMappingURL=HsyUser.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* tslint:disable */
class HsyInteraction {
    constructor(data) {
        this["uid"] = '';
        this["listingId"] = '';
        this["type"] = '';
        this["userId"] = '';
        this["interactionTime"] = new Date(0);
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `HsyInteraction`.
     */
    static getModelName() {
        return "HsyInteraction";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of HsyInteraction for dynamic purposes.
    **/
    static factory(data) {
        return new HsyInteraction(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'HsyInteraction',
            plural: 'HsyInteractions',
            path: 'HsyInteractions',
            idName: 'uid',
            properties: {
                "uid": {
                    name: 'uid',
                    type: 'string'
                },
                "listingId": {
                    name: 'listingId',
                    type: 'string'
                },
                "type": {
                    name: 'type',
                    type: 'string'
                },
                "userId": {
                    name: 'userId',
                    type: 'string'
                },
                "interactionTime": {
                    name: 'interactionTime',
                    type: 'Date'
                },
            },
            relations: {}
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HsyInteraction;

//# sourceMappingURL=HsyInteraction.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* tslint:disable */
class AccessToken {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    static getModelName() {
        return "AccessToken";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    static factory(data) {
        return new AccessToken(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'AccessToken',
            plural: 'AccessTokens',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "ttl": {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                "scopes": {
                    name: 'scopes',
                    type: '["string"]'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
                    type: 'string'
                },
            },
            relations: {
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User'
                },
            }
        };
    }
}
/* unused harmony export AccessToken */

class SDKToken {
    constructor(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SDKToken;

//# sourceMappingURL=BaseModels.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HsyListing__ = __webpack_require__(34);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HsyUser__ = __webpack_require__(67);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__HsyUser__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HsyInteraction__ = __webpack_require__(154);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SDKModels__ = __webpack_require__(49);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger_service__ = __webpack_require__(282);
/* unused harmony namespace reexport */
/* tslint:disable */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lb_config__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */


/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
let LoggerService = class LoggerService {
    log(...args) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.log.apply(console, args);
    }
    info(...args) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.info.apply(console, args);
    }
    error(...args) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.error.apply(console, args);
    }
    count(arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.count(arg);
    }
    group(arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.count(arg);
    }
    groupEnd() {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.groupEnd();
    }
    profile(arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.count(arg);
    }
    profileEnd() {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.profileEnd();
    }
    time(arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.time(arg);
    }
    timeEnd(arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.timeEnd(arg);
    }
};
LoggerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], LoggerService);

//# sourceMappingURL=logger.service.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HsyListingApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_HsyListing__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `HsyListing` model.
 */
let HsyListingApi = class HsyListingApi extends __WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */] {
    constructor(http, models, auth, searchParams, errorHandler) {
        super(http, models, auth, searchParams, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
    }
    /**
     * Fetches belongsTo relation owner.
     *
     * @param {any} id HsyListing id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyListing` object.)
     * </em>
     */
    getOwner(id, refresh = {}, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/owner";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find a related item by id for interactions.
     *
     * @param {any} id HsyListing id
     *
     * @param {any} fk Foreign key for interactions
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyListing` object.)
     * </em>
     */
    findByIdInteractions(id, fk, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Delete a related item by id for interactions.
     *
     * @param {any} id HsyListing id
     *
     * @param {any} fk Foreign key for interactions
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdInteractions(id, fk, customHeaders) {
        let _method = "DELETE";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Update a related item by id for interactions.
     *
     * @param {any} id HsyListing id
     *
     * @param {any} fk Foreign key for interactions
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyListing` object.)
     * </em>
     */
    updateByIdInteractions(id, fk, data = {}, customHeaders) {
        let _method = "PUT";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Queries interactions of HsyListing.
     *
     * @param {any} id HsyListing id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyListing` object.)
     * </em>
     */
    getInteractions(id, filter = {}, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in interactions of this model.
     *
     * @param {any} id HsyListing id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyListing` object.)
     * </em>
     */
    createInteractions(id, data = {}, customHeaders) {
        let _method = "POST";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions";
        let _routeParams = {
            id: id
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deletes all interactions of this model.
     *
     * @param {any} id HsyListing id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteInteractions(id, customHeaders) {
        let _method = "DELETE";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Counts interactions of HsyListing.
     *
     * @param {any} id HsyListing id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    countInteractions(id, where = {}, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions/count";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {string} filter
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `data` – `{object}` -
     */
    findWithinBoundary(filter = {}, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/findWithinBoundary";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.map((instances) => instances.map((instance) => new __WEBPACK_IMPORTED_MODULE_8__models_HsyListing__["a" /* HsyListing */](instance)));
    }
    /**
     * Creates a new instance in interactions of this model.
     *
     * @param {any} id HsyListing id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyListing` object.)
     * </em>
     */
    createManyInteractions(id, data = [], customHeaders) {
        let _method = "POST";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyListings/:id/interactions";
        let _routeParams = {
            id: id
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `HsyListing`.
     */
    getModelName() {
        return "HsyListing";
    }
};
HsyListingApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"],
        __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */],
        __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */],
        __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */],
        __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]])
], HsyListingApi);

//# sourceMappingURL=HsyListing.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_jwt__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loopbacksdk_services_custom_HsyUser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_env__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(19);
// app/services/auth/auth.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







// TODO(xinbenlv): update Auth0 once my pull request is pulled. https://github.com/auth0/lock/pull/447
let zhDict = {
    error: {
        forgotPassword: {
            "too_many_requests": "您尝试登录次数过多 请稍后再试。",
            "lock.fallback": "对不起，请求修改密码时出现错误。"
        },
        login: {
            "blocked_user": "该账号已被锁定。",
            "invalid_user_password": "密码错误",
            "lock.fallback": "对不起，请求登陆时出现错误。",
            "lock.invalid_code": "代码错误。",
            "lock.invalid_email_password": "邮箱或密码错误。",
            "lock.invalid_username_password": "账号或密码错误。",
            "lock.network": "无法连接到服务器，请检查网络连接后重试。",
            "lock.popup_closed": "弹出窗口被关闭，请重试",
            "lock.unauthorized": "权限不足，请重试。",
            "password_change_required": "由于这是第一次登录或者您的密码已过期，请更新密码。",
            "password_leaked": "由于您的密码在其他网站已泄露，该账户已被锁定，请查看邮件解除锁定。",
            "too_many_attempts": "由于登录操作太频繁，您的帐号已被锁定。"
        },
        passwordless: {
            "bad.email": "邮箱错误",
            "bad.phone_number": "手机号码格式不正确。",
            "lock.fallback": "对不起，出现错误。"
        },
        signUp: {
            "invalid_password": "密码错误",
            "lock.fallback": "对不起，请求注册时出现错误。",
            "password_dictionary_error": "密码过于常见。",
            "password_no_user_info_error": "密码中出现账号信息。",
            "password_strength_error": "密码过于简单。",
            "user_exists": "该账号已存在。",
            "username_exists": "该用户名已存在。"
        }
    },
    success: {
        logIn: "登录成功",
        forgotPassword: "重置密码的邮件已发送",
        magicLink: "已向您发送链接<br />到 %s 登录",
        signUp: "感谢您的注册。"
    },
    blankErrorHint: "不能为空",
    codeInputPlaceholder: "您的代码",
    databaseEnterpriseLoginInstructions: "",
    databaseEnterpriseAlternativeLoginInstructions: "或",
    databaseSignUpInstructions: "",
    databaseAlternativeSignUpInstructions: "或",
    emailInputPlaceholder: "yours@example.com",
    enterpriseLoginIntructions: "请用您的企业账号登录",
    enterpriseActiveLoginInstructions: "请输入您的企业账号 %s。",
    failedLabel: "失败!",
    forgotPasswordAction: "忘记您的密码？",
    forgotPasswordInstructions: "请输入您的邮箱，我们将为你发送重置密码的邮件。",
    forgotPasswordSubmitLabel: "发电子邮件",
    invalidErrorHint: "错误",
    lastLoginInstructions: "上次登陆的信息为",
    loginAtLabel: "登录到 %s",
    loginLabel: "登录",
    loginSubmitLabel: "登录",
    loginWithLabel: "用 %s 登录",
    notYourAccountAction: "不是您的账号?",
    passwordInputPlaceholder: "您的密码",
    passwordStrength: {
        containsAtLeast: "至少包含%d个以下%d种字符:",
        identicalChars: "不能多于%d个相同的字符在同一行(例如,不允许出现 \"%s\" )",
        nonEmpty: "密码不能为空",
        numbers: "数字 (如 0-9)",
        lengthAtLeast: "最少长度为%d个字符",
        lowerCase: "小写字母(a-z)",
        shouldContain: "应包含:",
        specialCharacters: "特殊字符 (如 !@#$%^&*)",
        upperCase: "大写字母(A-Z)"
    },
    passwordlessEmailAlternativeInstructions: "您还可以通过邮箱登录<br>或者创建账号",
    passwordlessEmailCodeInstructions: "代码已通过邮件发送到 %s。",
    passwordlessEmailInstructions: "输入邮箱登录<br>或者创建账号。",
    passwordlessSMSAlternativeInstructions: "您还可以通过手机号码登录<br>或者创建账号。",
    passwordlessSMSCodeInstructions: "代码已通过短信发送到<br> %s。",
    passwordlessSMSInstructions: "输入手机号码登录<br>或者创建账号",
    phoneNumberInputPlaceholder: "您的手机号码",
    resendCodeAction: "没有收到号码?",
    resendLabel: "重新发送",
    resendingLabel: "重新发送中...",
    retryLabel: "重试",
    sentLabel: "发送!",
    signUpLabel: "注册",
    signUpSubmitLabel: "注册",
    signUpTerms: "",
    signUpWithLabel: "通过 %s 注册",
    socialLoginInstructions: "",
    socialSignUpInstructions: "",
    ssoEnabled: "单点登录已激活",
    submitLabel: "提交",
    unrecoverableError: "出现错误。<br />请联系技术人员。",
    usernameFormatErrorHint: "请使用%d-%d个字母, 数字或 \"_\"的组合",
    usernameInputPlaceholder: "您的用户名",
    usernameOrEmailInputPlaceholder: "用户名/邮箱",
    title: "好室友™",
    welcome: "欢迎 %s!",
    windowsAuthInstructions: "您已连接到组织网络&hellip;",
    windowsAuthLabel: "Windows认证"
};
let AuthService = AuthService_1 = class AuthService {
    constructor(zone, api, toastCtrl) {
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.local = window.localStorage;
        //noinspection JSUnusedLocalSymbols
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_0_angular2_jwt__["JwtHelper"](); // do nothing
        this.auth0 = new Auth0({
            clientID: __WEBPACK_IMPORTED_MODULE_5__app_env__["a" /* Env */].configAuth0.clientId,
            domain: __WEBPACK_IMPORTED_MODULE_5__app_env__["a" /* Env */].configAuth0.accountDomain
        });
        this.lock = new Auth0Lock(__WEBPACK_IMPORTED_MODULE_5__app_env__["a" /* Env */].configAuth0.clientId, __WEBPACK_IMPORTED_MODULE_5__app_env__["a" /* Env */].configAuth0.accountDomain, {
            auth: {
                redirect: false,
                params: {
                    scope: 'openid email offline_access' // Learn about scopes: https://auth0.com/docs/scopes
                }
            },
            theme: {
                logo: "assets/res/icon.png",
            },
            languageDictionary: zhDict,
            autoclose: true
        });
        this.lock.on('authenticated_error', (err) => {
            this.showLoginErrorToast(err);
        });
        this.lock.on('authenticated', authResult => {
            this.idToken = authResult.idToken;
            this.userId = authResult.idTokenPayload.sub;
            this.local.setItem('id_token', this.idToken);
            this.local.setItem('user_id', this.userId);
            // Fetch profile information
            this.lock.getProfile(authResult.idToken, (err, profile) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    alert(err); // TODO(xinbenlv): handle error
                }
                else {
                    this.user = yield this.findHsyUser(profile.user_id);
                    if (this.user === null) {
                        console.log(`Creating a new user`);
                        this.user = yield this.createHsyUserInDB(profile);
                    }
                    else {
                        console.log(`User already existed, skip creating: ${JSON.stringify(this.user)} a`);
                    }
                    // If authentication is successful, save the items
                    // in local storage
                    this.local.setItem('profile', JSON.stringify(profile));
                    this.local.setItem('id_token', this.idToken);
                    this.local.setItem('user_id', this.userId);
                    // TODO(xinbenlv): put into UserService
                    this.local.setItem('refresh_token', authResult.refreshToken);
                    this.zoneImpl.run(() => this.user = profile);
                    // Schedule a token refresh
                    this.scheduleRefresh();
                    this.userSubject.next(AuthService_1.createHsyUser(this.user));
                }
            }));
            this.showLoginSuccessToast();
        });
        this.zoneImpl = zone;
        this.userSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        // If there is a profile saved in local storage
        let profile = this.local.getItem('profile');
        if (profile != null && profile.length > 0) {
            this.user = JSON.parse(profile);
            this.userSubject.next(AuthService_1.createHsyUser(this.user));
        }
        this.idToken = this.local.getItem('id_token');
        this.userId = this.local.getItem('user_id');
    }
    authenticated() {
        // Check if there's an unexpired JWT
        return Object(__WEBPACK_IMPORTED_MODULE_0_angular2_jwt__["tokenNotExpired"])('id_token', this.idToken) && (this.local.getItem('user_id') != null);
    }
    getUser() {
        return this.user;
    }
    login() {
        this.lock.show({ autoclose: true });
    }
    logout() {
        this.local.removeItem('profile');
        this.local.removeItem('id_token');
        this.local.removeItem('user_id');
        this.local.removeItem('refresh_token');
        this.idToken = null;
        this.userId = null;
        this.zoneImpl.run(() => this.user = null);
        this.userSubject.next(null); // logout
        // Unschedule the token refresh
        this.unscheduleRefresh();
    }
    /**
     * Expose as an observable.
     * @returns {Subject<HsyUser>}
     */
    userObservable() {
        return this.userSubject;
    }
    static createHsyUser(user) {
        return {
            id: user['user_id'] /* using BASE64 email as unique userId*/,
            avatarId: user['picture'],
            name: user['name']
            /*avatarSrc: user['picture']*/
        };
    }
    findHsyUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" --- user_id in findHsyUser: " + user_id);
            return yield this.api.findById(user_id).toPromise()
                .catch(e => {
                console.info(e);
                return null;
            });
        });
    }
    createHsyUserInDB(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" --- create new HsyUser --- ");
            let _user = {};
            let _currentTime = new Date();
            _user.id = profile['user_id'];
            _user.name = profile['name'];
            _user.avatarId = profile['picture'];
            _user.created = _currentTime;
            _user.lastUpdated = _currentTime;
            let savedUser = yield this.api.upsert(_user).toPromise();
            return savedUser;
        });
    }
    scheduleRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        let source = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(this.idToken).flatMap(token => {
            console.log('token here', token);
            // The delay to generate in this case is the difference
            // between the expiry time and the issued at time
            let jwtIat = this.jwtHelper.decodeToken(token).iat;
            let jwtExp = this.jwtHelper.decodeToken(token).exp;
            let iat = new Date(0);
            let exp = new Date(0);
            let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].interval(delay);
        });
        this.refreshSubscription = source.subscribe(() => {
            this.getNewJwt();
        });
    }
    unscheduleRefresh() {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        let token = this.local.getItem('refresh_token');
        this.auth0.refreshToken(token, (err, delegationRequest) => {
            if (err) {
                alert(err);
            }
            this.local.setItem('id_token', delegationRequest.id_token);
            this.idToken = delegationRequest.id_token;
        });
    }
    showLoginSuccessToast() {
        let toast = this.toastCtrl.create({
            message: '登录成功!',
            duration: 5000
        });
        toast.present();
    }
    showLoginErrorToast(error) {
        let toast = this.toastCtrl.create({
            message: `登录失败!原因: ${error}`,
            duration: 5000
        });
        toast.present();
    }
};
AuthService = AuthService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_2__loopbacksdk_services_custom_HsyUser__["a" /* HsyUserApi */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* ToastController */]])
], AuthService);

var AuthService_1;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlagService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let FlagService = class FlagService {
    constructor() {
        this.flagMap = {};
        this.flags = {
            'debug': false,
            'realCreate': false,
            'requireToContact': false,
            'newUx': false,
        };
        let url_string = window.location.href;
        var url = new URL(url_string);
        var flagJsonStr = url['searchParams'].get("flags");
        this.flagMap = JSON.parse(flagJsonStr);
    }
    getAllFlags() {
        return this.flags;
    }
    setFlag(flagName, value) {
        this.flags[flagName] = value;
    }
    getFlag(flagName) {
        if (this.flagMap && flagName in this.flagMap) {
            return this.flagMap[flagName];
        }
        return this.flags[flagName];
    }
};
FlagService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], FlagService);

//# sourceMappingURL=flag.service.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UrlUtil {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UrlUtil;

UrlUtil.getParameterByName = function (name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
//# sourceMappingURL=url_util.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_flag_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let FilterSettingsComponent = class FilterSettingsComponent {
    constructor(viewCtrl, flagService, _navParams) {
        this.viewCtrl = viewCtrl;
        this.flagService = flagService;
        this._navParams = _navParams;
        // TODO(xinbenlv): use interface
        this.filterSettings = {
            'types': {},
            'areas': {},
            'duration': {}
        };
        this.options = [
            'All',
            'SanFrancisco',
            'MidPeninsula',
            'SouthBayWest',
            'SouthBayEast',
            'EastBay',
            'ShortTerm',
            'Seattle',
            'TestGroup',
        ];
        this.optionsMap = {
            'All': '全部',
            'SanFrancisco': '三番',
            'MidPeninsula': '中半岛',
            'SouthBayWest': '南湾西',
            'SouthBayEast': '南湾东',
            'EastBay': '东湾',
            'ShortTerm': '短租',
            'Seattle': '西雅图',
            'TestGroup': '测试',
        };
        this.durationList = [
            '最近3天',
            '最近7天',
            '最近30天',
            '最近90天',
            '不限'
        ];
        if (this._navParams.data) {
            console.log(" --- " + JSON.stringify(this._navParams.data));
            //TODO: get filterSettings and initial UI
            this.filterSettings = this._navParams.data['filterSettings'];
        }
    }
    applyFilterSettings() {
        this.close();
    }
    close() {
        this.viewCtrl.dismiss({ filterSettings: this.filterSettings });
    }
};
FilterSettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/filter-settings.comp.html"*/'<ion-content>\n    <ion-list-header>类型</ion-list-header>\n    <ion-item>\n        <ion-label>招租</ion-label>\n        <ion-checkbox [(ngModel)]="filterSettings[\'types\'][\'zhaozu\']" value="ROOMMATE_WANTED"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n        <ion-label>求租</ion-label>\n        <ion-checkbox [(ngModel)]="filterSettings[\'types\'][\'qiuzu\']"></ion-checkbox>\n    </ion-item>\n\n    <ion-list-header>区域</ion-list-header>\n    <ng-container *ngFor="let option of options; let i=index;">\n        <ion-item *ngIf="flagService.getFlag(\'debug\') || option != \'TestGroup\'">\n            <ion-label>{{optionsMap[option]}}</ion-label>\n            <ion-checkbox [(ngModel)]="filterSettings[\'areas\'][option]"  >\n            </ion-checkbox>\n        </ion-item>\n    </ng-container>\n\n    <ion-list-header>日期</ion-list-header>\n    <ion-list radio-group [(ngModel)]="filterSettings[\'duration\']">\n        <ion-item *ngFor="let option of durationList">\n            <ion-label>{{option}}</ion-label>\n            <ion-radio value="{{option}}"></ion-radio>\n        </ion-item>\n    </ion-list>\n    <ion-list-header>价格上限: {{filterSettings[\'price\']}}</ion-list-header>\n    <ion-item >\n        <ion-range min="0" max="10000" [(ngModel)]="filterSettings[\'price\']">\n        </ion-range>\n    </ion-item>\n</ion-content>'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/filter-settings.comp.html"*/,
        selector: 'filter-settings',
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__services_flag_service__["a" /* FlagService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], FilterSettingsComponent);

//# sourceMappingURL=filter-settings.comp.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listing_detail_page__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * The addSearchButtonInMap adds a button to the map that allows
 * seach in the map.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function SearchButtonInMap(controlDiv, map, eventEmitter) {
    // Set CSS for the control border.
    // TODO(xinbenlv): from Google Map developer example, to be updated.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to search within the map';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = '在地图区域内搜索';
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        eventEmitter.emit(map.getBounds());
    });
}
let MapViewComponent = class MapViewComponent {
    constructor(nav) {
        this.nav = nav;
        this.zoomLevel = 10; // default
        this.center = { lat: 37.6042379, lng: -122.1755228 };
        this.markers = [];
        this.onBoundaryFilter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.map = google.maps.Maps;
        this.mapDirty = false;
    }
    ngOnChanges(changes) {
        if (changes['listings']) {
            this.render();
        }
    }
    gotoListingDetail(listing) {
        ga('send', 'event', {
            eventCategory: 'go-to',
            eventAction: 'listing-detail',
            eventLabel: 'from-map-view'
        });
        this.nav.push(__WEBPACK_IMPORTED_MODULE_1__listing_detail_page__["a" /* ListingDetailPage */], { listing: listing });
    }
    render() {
        if (!document.getElementById('map_view_canvas')) {
            this.map = null;
            return;
        } // do nothing
        this.map = new google.maps.Map(document.getElementById('map_view_canvas'), {
            zoom: this.zoomLevel,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.map.setCenter(new google.maps.LatLng(this.center.lat, this.center.lng));
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var searchInMapButtonDiv = document.createElement('div');
        var centerControl = new SearchButtonInMap(searchInMapButtonDiv, this.map, this.onBoundaryFilter);
        searchInMapButtonDiv.index = 1;
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInMapButtonDiv);
        google.maps.event.addListener(this.map, 'bounds_changed', () => {
            google.maps.event.trigger(this.map, 'resize');
            this.mapDirty = true;
        });
        for (let marker of this.markers) {
            marker.setMap(this.map);
        }
    }
    addListings(newListings) {
        let listingsHasLocation = newListings.filter((l) => l.location);
        listingsHasLocation.map((listing) => {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(listing.location.lat, listing.location.lng),
                icon: `data:image/svg+xml,
<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
    <path fill="#FFFFFF" stroke="#ccc" stroke-width=".5"
          d="M34.305 16.234c0 8.83-15.148 19.158-15.148 19.158S3.507 25.065 3.507 16.1c0-8.505 6.894-14.304 15.4-14.304 8.504 0 15.398 5.933 15.398 14.438z"/>
    <text transform="translate(19 18.5)" 
          fill="#000" 
          style="font-family: Arial, sans-serif;
          text-align:center;"
          font-size="10" text-anchor="middle">${listing.price ? listing.price : '待议'}
    </text>
</svg>`,
                map: this.map
            });
            marker.addListener('click', () => {
                this.gotoListingDetail(listing);
            });
            this.markers.push(marker);
        });
    }
    clearMarkers() {
        this.markers.forEach(l => l.setMap(null));
        this.markers = [];
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MapViewComponent.prototype, "onBoundaryFilter", void 0);
MapViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'map-view',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/map-view.comp.html"*/'<div style="width:100%;height:100%" id="map_view_canvas"\n     (load)="render()">\n</div>'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/map-view.comp.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], MapViewComponent);

//# sourceMappingURL=map-view.comp.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_env__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_code_push__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_flag_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







let SettingsTabPage = class SettingsTabPage {
    constructor(auth, codePush, platform, appVersion, toastCtr, flagService) {
        this.auth = auth;
        this.codePush = codePush;
        this.platform = platform;
        this.appVersion = appVersion;
        this.toastCtr = toastCtr;
        this.flagService = flagService;
        this.versionEnv = __WEBPACK_IMPORTED_MODULE_2__app_env__["a" /* Env */].version;
        this.serverUrl = __WEBPACK_IMPORTED_MODULE_2__app_env__["a" /* Env */].configHaoshiyouServer.serverUrl;
        this.versionDownloaded = null;
        this.versionPending = null;
        this.versionRemote = null;
        this.versionApp = null;
        this.debugCounter = 0;
        this.flagNames = null;
        let flags = flagService.getAllFlags();
        this.flagNames = Object.keys(flags);
    }
    ionViewWillEnter() {
        ga('set', 'page', '/settings-tab.page.html');
        ga('send', 'pageview');
    }
    debugIncrementer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugCounter++;
            if (this.debugCounter > 3 && this.debugCounter < 9) {
                let toast = this.toastCtr.create({
                    message: `${9 - this.debugCounter} more clicks before debug...`,
                    duration: 2000,
                    position: 'bottom'
                });
                yield toast.present();
            }
        });
    }
    isDebug() {
        return this.debugCounter > 8 || this.flagService.getFlag(`debug`);
    }
    startSync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
            let downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); };
            this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
            yield this.updateVersions();
        });
    }
    updateVersions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.platform.is('cordova')) {
                this.versionApp = (yield this.appVersion.getPackageName()) + `(${yield this.appVersion.getVersionCode()})`;
                yield this.platform.ready();
                let currentPackageInfo = yield this.codePush.getCurrentPackage();
                this.versionDownloaded = currentPackageInfo ? currentPackageInfo.appVersion : `无`;
                let pendingPackageInfo = yield this.codePush.getPendingPackage();
                this.versionPending = pendingPackageInfo ? pendingPackageInfo.appVersion : `无`;
                let remotePackageInfo = yield this.codePush.checkForUpdate();
                this.versionRemote = remotePackageInfo ? remotePackageInfo.downloadUrl : `无`;
            }
            else
                this.versionApp = '无';
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateVersions();
        });
    }
};
SettingsTabPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/settings-tab/settings-tab.page.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-title>\n            设置\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="grey-background">\n    <ion-card *ngIf="auth.authenticated()">\n        <ion-item *ngIf="auth.user != null">\n            <ion-avatar item-left>\n                <img src="{{ auth.user.picture }}">\n            </ion-avatar>\n            <h2>{{ auth.user.nickname }}</h2>\n            <p>{{ auth.user.email }}</p>\n            <button ion-button item-right (click)="auth.logout()">登出</button>\n        </ion-item>\n    </ion-card>\n    <ion-list>\n        <ion-item *ngIf="!auth.authenticated()">\n            <ion-label>请登录</ion-label>\n            <button ion-button item-right (click)="auth.login()">登录</button>\n        </ion-item>\n        <ion-item (click)="debugIncrementer()">\n            <ion-label>关于\n                <span *ngIf="debugCounter > 1">({{debugCounter}})</span>\n            </ion-label>\n        </ion-item>\n        <ion-list *ngIf="isDebug()" >\n            <ion-item-divider>\n                版本\n            </ion-item-divider>\n            <ion-item>\n                <ion-label>\n                    环境版本: {{ versionEnv }} - 6.0.0.{{debugCounter}}\n                </ion-label>\n                <button ion-button item-right (click)="startSync()">刷新</button>\n            </ion-item>\n            <ion-item>\n                服务器: {{ serverUrl }}\n            </ion-item>\n            <ion-item>\n                应用版本: {{ versionApp }}\n            </ion-item>\n            <ion-item>\n                已下载版本: {{ versionDownloaded }}\n            </ion-item>\n            <ion-item>\n                等待版本: {{ versionPending }}\n            </ion-item>\n            <ion-item>\n                远程版本: {{ versionRemote }}\n            </ion-item>\n            <ion-item-divider>\n                Flags\n            </ion-item-divider>\n            <ion-item *ngFor="let flagName of flagNames">\n                <ion-label item-start>\n                    {{ flagName }}\n                </ion-label>\n                <ion-toggle\n                        color="secondary"\n                        [ngModel]="flagService.getFlag(flagName)" (ngModelChange)="flagService.setFlag(flagName, $event)"\n                ></ion-toggle>\n            </ion-item>\n        </ion-list>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/settings-tab/settings-tab.page.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_code_push__["a" /* CodePush */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__["a" /* AppVersion */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_6__services_flag_service__["a" /* FlagService */]])
], SettingsTabPage);

//# sourceMappingURL=settings-tab.page.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisconnectModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let DisconnectModal = class DisconnectModal {
    constructor() {
    }
};
DisconnectModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'disconnect-modal',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/tabs/disconnect.modal.html"*/'<ion-content>\n    <ion-list>\n        <ion-item>\n            <h2>网络已断</h2>\n            <p>请连接网络再使用本应用。</p>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/tabs/disconnect.modal.html"*/
    }),
    __metadata("design:paramtypes", [])
], DisconnectModal);

//# sourceMappingURL=disconnect.modal.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrCodeTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let QrCodeTabPage = class QrCodeTabPage {
    constructor() {
        this.shouldShow = false;
    }
    ionViewWillEnter() {
        ga('set', 'page', '/qrcode-tab.page.html');
        ga('send', 'pageview');
    }
    showQrCode() {
        ga('send', 'event', {
            eventCategory: 'show-qrcode',
            eventAction: 'qrcode-tab',
        });
        this.shouldShow = true;
    }
};
QrCodeTabPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'qrcode-tab',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/qrcode-tab/qrcode-tab.page.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-title>\n            加微信群\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n<ion-content class="grey-background">\n    <ion-list *ngIf="!shouldShow"  padding center style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">\n        <button center style="text-align: center;" id="show_qrcode_btn" ion-button (click)="showQrCode()">\n            <ion-icon name="qr-scanner"></ion-icon> <span>点此加小助手自动拉入微信群</span>\n        </button>\n    </ion-list>\n    <ion-list *ngIf="shouldShow">\n        <ion-item style="text-align: center; width:100%">\n            <img src="../../assets/res/haoshiyou-bot2.jpeg"\n                 style="max-width: 350px"\n                 alt="好室友™微信群介绍">\n        </ion-item>\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/qrcode-tab/qrcode-tab.page.html"*/,
    })
], QrCodeTabPage);

//# sourceMappingURL=qrcode-tab-page.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_flag_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







let MineTabPage = class MineTabPage {
    constructor(auth, codePush, platform, appVersion, toastCtr, flagService, api) {
        this.auth = auth;
        this.codePush = codePush;
        this.platform = platform;
        this.appVersion = appVersion;
        this.toastCtr = toastCtr;
        this.flagService = flagService;
        this.api = api;
        this.flagNames = null;
        this.listings = [];
        let flags = flagService.getAllFlags();
        this.flagNames = Object.keys(flags);
    }
    ionViewWillAppear() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('set', 'page', '/mine-tab.page.html');
            ga('send', 'pageview');
            console.log(`Appear!`);
            yield this.loadMyListings();
        });
    }
    loadMyListings() {
        return __awaiter(this, void 0, void 0, function* () {
            let local = window.localStorage;
            let meId = local['user_id']; // TODO(xinbenlv): use UserService
            if (!meId) {
                return; // not logged in ;
            }
            let whereClause = {
                'ownerId': meId,
            };
            ga('send', 'event', {
                eventCategory: 'load',
                eventAction: 'load-my-listings',
            });
            let start = Date.now();
            let newItems = yield this.api
                .find({
                where: whereClause,
            })
                .toPromise();
            let end = Date.now();
            ga('send', {
                hitType: 'timing',
                timingCategory: 'API Call',
                timingVar: 'load-my-listings',
                timingValue: end - start
            });
            this.listings = newItems;
        });
    }
    ;
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadMyListings();
        });
    }
};
MineTabPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/mine-tab/mine-tab.page.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-title>\n            我的\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="grey-background">\n    <ion-list *ngIf="!auth.authenticated()">\n        <ion-item >\n            <ion-label>请登录</ion-label>\n            <button ion-button item-right (click)="auth.login()">登录</button>\n        </ion-item>\n    </ion-list>\n    <ion-list>\n        <ion-grid *ngIf="auth.authenticated()">\n            <ion-row>\n                <ion-col col-12 col-lg-3 col-md-4 col-sm-12 col-xs-12\n                         *ngFor="let listing of listings; let i = index">\n                    <listing-item [listing]=listing></listing-item>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/mine-tab/mine-tab.page.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["a" /* CodePush */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version__["a" /* AppVersion */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5__services_flag_service__["a" /* FlagService */],
        __WEBPACK_IMPORTED_MODULE_6__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */]])
], MineTabPage);

//# sourceMappingURL=mine-tab.page.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoveModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let RemoveModal = class RemoveModal {
    constructor(nav, params, viewCtrl) {
        this.nav = nav;
        this.viewCtrl = viewCtrl;
        this.imageIds = params.data.imageIds;
        this.checkboxes = new Array(this.imageIds.length);
    }
    dismiss() {
        let data = { imageIds: this.imageIds };
        this.viewCtrl.dismiss(data);
    }
    save() {
        let imagesAfterSave = [];
        for (let i = 0; i < this.checkboxes.length; i++) {
            if (!this.checkboxes[i]) {
                imagesAfterSave.push(this.imageIds[i]);
            }
        }
        this.imageIds = imagesAfterSave;
        this.dismiss();
    }
    cancel() {
        this.dismiss();
    }
};
RemoveModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'remove-modal',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/remove.modal.html"*/'<ion-content>\n    <ion-list>\n        <ion-item *ngFor="let imageId of imageIds; let i = index">\n            <ion-thumbnail item-left>\n                <img src="{{imageId | imageIdToUrlPipe }}" alt="Image {{imageId}">\n            </ion-thumbnail>\n            <ion-checkbox color="dark" [(ngModel)]="checkboxes[i]" item-right></ion-checkbox>\n        </ion-item>\n        <button ion-button block color="primary" (click)="save()">完毕</button>\n        <button ion-button block clear (click)="cancel()" >取消</button>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/remove.modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["k" /* ViewController */]])
], RemoveModal);

//# sourceMappingURL=remove.modal.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingUxDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listing_creation_page__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_image_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loopbacksdk_services_custom_HsyUser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__listings_tab_page__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_flag_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










let ListingUxDetailPage = class ListingUxDetailPage {
    constructor(nav, params, imageService, api, hsyUserApi, auth, alertCtrl, ref, flagService) {
        this.nav = nav;
        this.params = params;
        this.imageService = imageService;
        this.api = api;
        this.hsyUserApi = hsyUserApi;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.ref = ref;
        this.flagService = flagService;
        this.loading = true;
        this.useGrid = !(navigator.platform == 'iPhone');
    }
    ionViewWillEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`XXX New UX!!!`);
            if (this.listing == null)
                yield this.loadListing();
            ga('set', 'page', `/listing-detail.page.html#${this.listing.uid}`);
            ga('send', 'pageview');
            if (this.nav.length() == 1) {
                ga('send', 'event', {
                    eventCategory: 'go-to',
                    eventAction: 'listing-detail',
                    eventLabel: 'direct-url'
                });
            }
        });
    }
    loadListing() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.params.data['listing'] != null) {
                this.listing = yield this.params.data.listing;
                this.ref.markForCheck();
            }
            else {
                let id = this.params.data.id;
                this.listing = (yield this.api.findById(id, {
                    include: ['interactions', 'owner'],
                })
                    .take(1)
                    .toPromise());
                this.ref.markForCheck();
            }
            this.params.data.id = this.listing.uid;
            this.title = `好室友™帖子：` + this.listing.title;
            this.loading = false;
            this.hackExtractHsyGroupNickAndListing();
            return;
        });
    }
    // This is a HACK, when bot is able to handle this, we can remove this part
    hackExtractHsyGroupNickAndListing() {
        console.log(`XXX this.listing = ${this.listing}`);
        if (!this.listing.hsyGroupNick && /^group-collected-/.test(this.listing.uid)) {
            this.listing.hsyGroupNick = this.listing.uid.substr(16);
        }
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadListing();
        });
    }
    backToMain() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'listings-tab',
                eventLabel: 'direct-url'
            });
            yield this.nav.push(__WEBPACK_IMPORTED_MODULE_6__listings_tab_page__["a" /* ListingsTabPage */]);
        });
    }
    ionViewDidEnter() {
        console.log(`Entering lising detail page`);
        this.ref.markForCheck();
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nav.push(__WEBPACK_IMPORTED_MODULE_2__listing_creation_page__["a" /* CreationPage */], { listing: this.listing });
        });
    }
    claimAndEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'claim-and-edit',
            });
            if (!this.auth.authenticated()) {
                let alert = this.alertCtrl.create({
                    title: '请登录后认领',
                    buttons: [
                        {
                            text: '取消',
                        },
                        {
                            text: '登陆',
                            handler: () => {
                                this.auth.login();
                            }
                        }
                    ]
                });
                yield alert.present();
            }
            else {
                // Start claiming!
                yield this.claim();
            }
        });
    }
    claim() {
        return __awaiter(this, void 0, void 0, function* () {
            let alert = this.alertCtrl.create({
                title: `请确认认领本帖`,
                subTitle: `标题：${this.listing.title}`,
                buttons: [
                    {
                        text: '取消',
                    },
                    {
                        text: '确认',
                        handler: () => {
                            let local = window.localStorage;
                            let meId = local['user_id']; // TODO(xinbenlv): use UserService
                            this.listing.ownerId = meId;
                            this.listing.owner = null; // 防止 owner 和 ownerId 的矛盾
                            this.api.upsert(this.listing).take(1).toPromise()
                                .then((_) => __awaiter(this, void 0, void 0, function* () {
                                this.listing = yield this.api.findById(this.listing.uid, { include: ["owner"] }).take(1).toPromise();
                                this.ref.markForCheck();
                            }))
                                .catch(e => {
                                console.warn(`Error in claiming post = 
                      ${JSON.stringify(e, null, ' ')}`);
                            });
                            return true;
                        }
                    }
                ]
            });
            let ret = yield alert.present();
            return ret;
        });
    }
    fakeClaimAndEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'fake-claim-and-edit',
            });
            let alert = this.alertCtrl.create({
                title: '新版"认领并编辑"功能正在建设中',
                buttons: [
                    {
                        text: 'OK',
                    },
                ]
            });
            yield alert.present();
        });
    }
    fakeStartChat() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'fake-start-chat',
            });
            let alert = this.alertCtrl.create({
                title: '新版"私聊"功能正在建设中',
                buttons: [
                    {
                        text: 'OK',
                    },
                ]
            });
            yield alert.present();
        });
    }
    // TODO(xinbenlv): merge with the same piece of code in image-grid.
    //noinspection JSUnusedLocalSymbols, used in HTML
    showImage(imageId) {
        let el = document.getElementsByTagName('body');
        // TODO(xinbenlv): modify the viewerjs to customize the following
        // 1. click on background area to close
        let url = this.imageService.getUrlFromId(imageId, 0, 0);
        let viewer = new window.Viewer(el[0], {
            url: () => {
                return url;
            },
            inline: false,
            toolbar: true,
            title: false,
            movable: true,
            keyboard: false,
            navbar: true,
            hidden: () => {
                viewer.destroy();
            }
        });
        viewer.show();
    }
    isClaimed() {
        return !/^group-collected-/.test(this.listing.ownerId);
    }
    isMine() {
        if (this.listing) {
            return window.localStorage['user_id'] === this.listing.ownerId;
        }
        return false;
    }
    eligibleToViewContact() {
        return false;
    }
    isDebug() {
        return this.flagService.getFlag('debug');
    }
    debugStr() {
        return JSON.stringify(this.listing, null, '  ');
    }
    hasContactInfo() {
        let listing = this.listing;
        let has = ((listing.owner && (listing.owner.contactPhone || listing.owner.contactEmail || listing.owner.weixin)) || listing.hsyGroupNick && listing.hsyGroupEnum) != null;
        if (!has) {
            console.warn(`listing doesn't have contact info`, this.listing);
        }
        return has;
    }
};
ListingUxDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'listing-ux-detail',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-ux-detail.page.html"*/'\n\n<ion-content id="page-container" class="grey-background">\n    <ion-slides pager style="height:240px" *ngIf="!loading && listing.imageIds">\n        <ng-container *ngFor="let imageId of listing.imageIds">\n            <ion-slide style="background-size:cover; background-repeat:no-repeat; background-position: center center; "\n                       [style.background-image]="\'url(\' + imageService.getUrlFromId(imageId) + \')\'">\n            </ion-slide>\n        </ng-container>\n\n    </ion-slides>\n    <ion-card *ngIf="!loading" offset-lg-3 col-lg-6 offset-md-2 col-md-8>\n        <ion-card-header>\n            <h2>\n                {{ listing.content ? listing.title.slice(0, 30) +\'...\' : \'详情见图片\' }}\n            </h2>\n        </ion-card-header>\n        <ion-card-content>\n            <ion-item-group>\n                <ion-item >\n                    <ion-label col-3 item-left>\n                        <ion-icon name="checkmark-circle"></ion-icon>\n                        认领\n                    </ion-label>\n                    <div item-right text-wrap >\n                        <div text-right *ngIf="isClaimed() && isMine()">我已认领</div>\n                        <div text-right *ngIf="isClaimed() && !isMine()">房东已认领</div>\n                        <div text-right *ngIf="!isClaimed()">\n                            <button ion-button small outline (click)="claimAndEdit()">我要认领</button>\n                        </div>\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.lastUpdated">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="clock"></ion-icon>\n                        更新\n                    </ion-label>\n                    <div item-right text-wrap>\n                        <p text-right>{{ listing.lastUpdated | dateFormatterPipe }}</p>\n                        <div text-right>{{ listing.lastUpdated | timeFromNow }}</div>\n                    </div>\n                </ion-item>\n                <ion-item >\n                    <ion-label col-3 item-left>\n                        <ion-icon name="clock"></ion-icon>\n                        价格\n                    </ion-label>\n                    <div item-right text-wrap>\n                        <div text-right>{{ listing.price ? \'$\' + listing.price : \'价格未知\' }}</div>\n                    </div>\n\n                </ion-item>\n                <ion-item *ngIf="listing.addressLine && listing.addressCity">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="map"></ion-icon>\n                        地址\n                    </ion-label>\n                    <div item-right text-wrap>\n                        {{listing.addressLine}}, {{listing.addressCity}}\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.numBedRoom && listing.numBathRoom">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="map"></ion-icon>\n                        情况\n                    </ion-label>\n                    <div item-right text-wrap>\n                        {{listing.numBedRoom}} Beds, {{listing.numBathRoom}} Baths\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.amenityArray && listing.amenityArray.length > 0">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="map"></ion-icon>\n                        设施\n                    </ion-label>\n                    <div item-right text-wrap>\n                        <ion-badge ion-badge *ngFor="let a of listing.amenityArray">\n                            {{ a }}\n                        </ion-badge>\n                    </div>\n                </ion-item>\n                <ion-item *ngIf="listing.content">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="paper"></ion-icon>\n                        详情\n                    </ion-label>\n                    <div item-right text-wrap>\n                        <p>\n                            <ng-container *ngFor="let textPiece of listing.content.split(\'\n\')">\n                                {{ textPiece }} <br/>\n                            </ng-container>\n                        </p>\n                    </div>\n                </ion-item>\n            </ion-item-group>\n            <ion-item-group *ngIf="hasContactInfo()">\n                <ion-item-divider color="light">\n                    联系方式\n                </ion-item-divider>\n                <ion-item *ngIf="flagService.getFlag(\'requireToContact\') &&\n                             listing.requireToContact.length > 0 && !eligibleToViewContact()">\n                    <ion-label col-3 item-left>\n                        <ion-icon name="paper"></ion-icon>\n                        查看条件\n                    </ion-label>\n                    <div item-right text-wrap>\n                        <button color="primary" ion-button outline *ngFor="let req of listing.requireToContact">登陆{{req}}</button>\n                    </div>\n                </ion-item>\n                <ng-container *ngIf="listing.requireToContact == null || listing.requireToContact.length == 0 || eligibleToViewContact()">\n                    <ion-item *ngIf="listing.owner && listing.owner.contactPhone">\n                        <ion-label col-3 item-left>\n                            <ion-icon name="contact"></ion-icon>电话\n                        </ion-label>\n                        <div item-right text-wrap >\n                            <div text-right>{{ listing.owner.contactPhone }}</div>\n                        </div>\n                    </ion-item>\n                    <ion-item *ngIf="listing.owner && listing.owner.contactEmail">\n                        <ion-label col-3 item-left>\n                            <ion-icon name="contact"></ion-icon>邮件\n                        </ion-label>\n                        <div item-right text-wrap >\n                            <div text-right>{{ listing.owner.contactEmail }}</div>\n                        </div>\n                    </ion-item>\n                    <ion-item *ngIf="listing.hsyGroupEnum &&\n                (listing.hsyGroupNick || listing.ownerId.startsWith(\'group-collected-\'))">\n                        <ion-label col-3 item-left>\n                            <ion-icon name="contact"></ion-icon>微信群\n                        </ion-label>\n                        <div item-right text-wrap >\n                            <p text-right>请在【好室友】{{listing.hsyGroupEnum|hsyGroupEnumMsgPipe}}群内搜索</p>\n                            <div text-right>\n                                {{ listing.hsyGroupNick ?\n                                listing.hsyGroupNick : listing.ownerId.replace(\'group-collected-\', \'\') }}</div>\n                        </div>\n                    </ion-item>\n                    <ion-item *ngIf="listing.owner && listing.owner.weixin">\n                        <ion-label col-3 item-left>\n                            <ion-icon name="contact"></ion-icon>微信号\n                        </ion-label>\n                        <div item-right text-wrap >\n                            <div text-right>{{ listing.owner.weixin }}</div>\n                        </div>\n                    </ion-item>\n                </ng-container>\n            </ion-item-group>\n            <ion-item *ngIf="isDebug()" >\n                <div style="white-space: pre;">{{debugStr()}}</div>\n            </ion-item>\n            <ion-item-group *ngIf="listing.imageIds && listing.imageIds.length > 0">\n                <ion-item-divider>\n                    图片\n                </ion-item-divider>\n                <!--\n                    We duplicate the grid and original ion-item because responsive\n                    grid doesn\'t work well with iOS yet.\n                    TODO(xinbenlv): remove this ion-list when works on iOS.\n                    See https://forum.ionicframework.com/t/ion-row-wrap-attribute-doesnt-work-on-ios-devices/50603/5\n                -->\n                <ng-template [ngIf]="!useGrid">\n                    <ion-item *ngFor="let imageId of listing.imageIds">\n                        <img src="{{ imageId | imageIdToUrlPipe:\'full\' }}" alt="img-{{imageId}}"\n                             data-action="zoom">\n                    </ion-item>\n                </ng-template>\n                <ion-grid *ngIf="useGrid">\n                    <ion-row>\n                        <ion-col col-12 col-lg-4 col-md-4 col-sm-6 col-xs-12\n                                 *ngFor="let imageId of listing.imageIds">\n                            <img src="{{ imageId | imageIdToUrlPipe:\'full\' }}" alt="img-{{imageId}}"\n                                 data-action="zoom">\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-item-group>\n            <ion-item>\n                <button *ngIf="isClaimed() && isMine()" ion-button outline item-left large (click)="edit()">\n                    <ion-label>\n                        <ion-icon name="create"></ion-icon> 编辑\n                    </ion-label>\n                </button>\n                <button *ngIf="!isMine() && isClaimed()" ion-button outline item-right large (click)="fakeStartChat()">\n                    <ion-label>\n                        <ion-icon name="chatbubbles"></ion-icon> 私聊\n                    </ion-label>\n                </button>\n            </ion-item>\n\n        </ion-card-content>\n    </ion-card>\n    <ion-list *ngIf="loading">\n        <ion-item>\n            <ion-row align-items-center justify-content-center>\n                <ion-spinner></ion-spinner>\n            </ion-row>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-ux-detail.page.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectionStrategy"].OnPush,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__services_image_service__["b" /* IImageService */],
        __WEBPACK_IMPORTED_MODULE_4__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */],
        __WEBPACK_IMPORTED_MODULE_5__loopbacksdk_services_custom_HsyUser__["a" /* HsyUserApi */],
        __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_8__services_flag_service__["a" /* FlagService */]])
], ListingUxDetailPage);

//# sourceMappingURL=listing-ux-detail.page.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SDKModels; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_HsyListing__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_HsyUser__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_HsyInteraction__ = __webpack_require__(270);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */




let SDKModels = class SDKModels {
    constructor() {
        this.models = {
            HsyListing: __WEBPACK_IMPORTED_MODULE_1__models_HsyListing__["a" /* HsyListing */],
            HsyUser: __WEBPACK_IMPORTED_MODULE_2__models_HsyUser__["a" /* HsyUser */],
            HsyInteraction: __WEBPACK_IMPORTED_MODULE_3__models_HsyInteraction__["a" /* HsyInteraction */],
        };
    }
    get(modelName) {
        return this.models[modelName];
    }
    getAll() {
        return this.models;
    }
    getModelNames() {
        return Object.keys(this.models);
    }
};
SDKModels = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SDKModels);

//# sourceMappingURL=SDKModels.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HsyListing {
    constructor(data) {
        this["amenities"] = null;
        this["content"] = '';
        this["hsyGroupEnum"] = '';
        this["hsyGroupNick"] = '';
        this["rentalEndDate"] = new Date(0);
        this["rentalStartDate"] = new Date(0);
        this["title"] = '';
        this["uid"] = '';
        this["wechatId"] = '';
        this["latestUpdatedOrBump"] = new Date(0);
        this["numBathRoom"] = 0;
        this["numBedRoom"] = 0;
        this["isRentingEntireHouse"] = false;
        this["lastUpdated"] = new Date(0);
        this["imageIds"] = [];
        this["location"] = null;
        this["listingTypeEnum"] = '';
        this["otherCosts"] = null;
        this["ownerId"] = '';
        this["price"] = 0;
        this["requireToContact"] = [];
        this["singleRoomBathRoomType"] = '';
        this["state"] = '';
        this["type"] = 0;
        this["addressLine"] = '';
        this["addressZipcode"] = '';
        this["addressState"] = '';
        this["addressCity"] = '';
        this["addressCityAndState"] = '';
        this["amenityArray"] = [];
        this["location_lat"] = 0;
        this["location_lng"] = 0;
        this.owner = null;
        this.interactions = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `HsyListing`.
     */
    static getModelName() {
        return "HsyListing";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of HsyListing for dynamic purposes.
    **/
    static factory(data) {
        return new HsyListing(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'HsyListing',
            plural: 'HsyListings',
            path: 'HsyListings',
            idName: 'uid',
            properties: {
                "amenities": {
                    name: 'amenities',
                    type: 'any'
                },
                "content": {
                    name: 'content',
                    type: 'string'
                },
                "hsyGroupEnum": {
                    name: 'hsyGroupEnum',
                    type: 'string'
                },
                "hsyGroupNick": {
                    name: 'hsyGroupNick',
                    type: 'string'
                },
                "rentalEndDate": {
                    name: 'rentalEndDate',
                    type: 'Date'
                },
                "rentalStartDate": {
                    name: 'rentalStartDate',
                    type: 'Date'
                },
                "title": {
                    name: 'title',
                    type: 'string'
                },
                "uid": {
                    name: 'uid',
                    type: 'string'
                },
                "wechatId": {
                    name: 'wechatId',
                    type: 'string'
                },
                "latestUpdatedOrBump": {
                    name: 'latestUpdatedOrBump',
                    type: 'Date'
                },
                "numBathRoom": {
                    name: 'numBathRoom',
                    type: 'number'
                },
                "numBedRoom": {
                    name: 'numBedRoom',
                    type: 'number'
                },
                "isRentingEntireHouse": {
                    name: 'isRentingEntireHouse',
                    type: 'boolean'
                },
                "lastUpdated": {
                    name: 'lastUpdated',
                    type: 'Date'
                },
                "imageIds": {
                    name: 'imageIds',
                    type: 'Array&lt;any&gt;'
                },
                "location": {
                    name: 'location',
                    type: 'GeoPoint'
                },
                "listingTypeEnum": {
                    name: 'listingTypeEnum',
                    type: 'string'
                },
                "otherCosts": {
                    name: 'otherCosts',
                    type: 'any'
                },
                "ownerId": {
                    name: 'ownerId',
                    type: 'string'
                },
                "price": {
                    name: 'price',
                    type: 'number'
                },
                "requireToContact": {
                    name: 'requireToContact',
                    type: 'Array&lt;any&gt;'
                },
                "singleRoomBathRoomType": {
                    name: 'singleRoomBathRoomType',
                    type: 'string'
                },
                "state": {
                    name: 'state',
                    type: 'string'
                },
                "type": {
                    name: 'type',
                    type: 'number'
                },
                "addressLine": {
                    name: 'addressLine',
                    type: 'string'
                },
                "addressZipcode": {
                    name: 'addressZipcode',
                    type: 'string'
                },
                "addressState": {
                    name: 'addressState',
                    type: 'string'
                },
                "addressCity": {
                    name: 'addressCity',
                    type: 'string'
                },
                "addressCityAndState": {
                    name: 'addressCityAndState',
                    type: 'string'
                },
                "amenityArray": {
                    name: 'amenityArray',
                    type: 'Array&lt;any&gt;'
                },
                "location_lat": {
                    name: 'location_lat',
                    type: 'number'
                },
                "location_lng": {
                    name: 'location_lng',
                    type: 'number'
                },
            },
            relations: {
                owner: {
                    name: 'owner',
                    type: 'HsyUser',
                    model: 'HsyUser',
                    relationType: 'belongsTo',
                    keyFrom: 'ownerId',
                    keyTo: 'id'
                },
                interactions: {
                    name: 'interactions',
                    type: 'HsyInteraction[]',
                    model: 'HsyInteraction',
                    relationType: 'hasMany',
                    keyFrom: 'uid',
                    keyTo: 'listingId'
                },
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HsyListing;

//# sourceMappingURL=HsyListing.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module CookieBrowser
* @license MIT
* @description
* This module handle cookies, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
let CookieBrowser = class CookieBrowser {
    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module CookieBrowser
    * @license MIT
    * @description
    * This module handle cookies, it will be provided using DI Swapping according the
    * SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
    **/
    constructor() {
        /**
         * @type {CookieInterface}
         **/
        this.cookies = {};
    }
    /**
     * @method get
     * @param {string} key Cookie key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in cookies.
     **/
    get(key) {
        if (!this.cookies[key]) {
            let cookie = window.document
                .cookie.split('; ')
                .filter((item) => item.split('=')[0] === key).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    }
    /**
     * @method set
     * @param {string} key Cookie key name
     * @param {any} value Any value
     * @param {Date=} expires The date of expiration (Optional)
     * @return {void}
     * @description
     * The setter will return any type of data persisted in cookies.
     **/
    set(key, value, expires) {
        this.cookies[key] = value;
        let cookie = `${key}=${value}; path=/${expires ? `; expires=${expires.toUTCString()}` : ''}`;
        window.document.cookie = cookie;
    }
    /**
     * @method remove
     * @param {string} key Cookie key name
     * @return {void}
     * @description
     * This method will remove a cookie from the client.
     **/
    remove(key) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
    }
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    parse(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
};
CookieBrowser = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], CookieBrowser);

//# sourceMappingURL=cookie.browser.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module StorageBrowser
* @license MIT
* @description
* This module handle localStorage, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
let StorageBrowser = class StorageBrowser {
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    get(key) {
        let data = localStorage.getItem(key);
        return this.parse(data);
    }
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key, value, expires) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
        else {
            console.log('Trying to remove unexisting key: ', key);
        }
    }
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    parse(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
};
StorageBrowser = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], StorageBrowser);

//# sourceMappingURL=storage.browser.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(513);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JSONSearchParams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */


/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module JSONSearchParams
* @license MIT
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/
let JSONSearchParams = class JSONSearchParams {
    setJSON(obj) {
        this._usp = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"](this._JSON2URL(obj, false));
    }
    getURLSearchParams() {
        return this._usp;
    }
    _JSON2URL(obj, parent) {
        var parts = [];
        for (var key in obj)
            parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    }
    _parseParam(key, value, parent) {
        let processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && ((typeof value) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    }
};
JSONSearchParams = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], JSONSearchParams);

//# sourceMappingURL=search.params.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAuthHttp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_listings_tab_filter_settings_comp__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_listings_tab_image_grid_comp__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_listings_tab_listing_creation_page__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_listings_tab_listing_detail_page__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_listings_tab_listing_item_comp__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_listings_tab_listings_tab_page__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_listings_tab_map_view_comp__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_listings_tab_long_image_comp__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_listings_tab_remove_modal__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_settings_tab_settings_tab_page__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tabs_disconnect_modal__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_image_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_enum_msg_pipe__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_image_id_to_url_pipe__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_time_from_now_pipe__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_storage__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_map_service__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pipes_city_n_zip_pipe__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_qrcode_tab_qrcode_tab_page__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__loopbacksdk_index__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pipes_hsy_group_enum_msg_pipe__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_transfer__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_network__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_push__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_code_push__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_app_version__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pipes_date_formatter_pipe__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_flag_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_mine_tab_mine_tab_page__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_listings_tab_listing_ux_detail_page__ = __webpack_require__(386);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































function getAuthHttp(http, nativeStorage) {
    return new __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["AuthConfig"]({
        globalHeaders: [{ 'Accept': 'application/json' }],
        tokenGetter: (() => nativeStorage.getItem('id_token'))
    }), http);
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            // All Components
            __WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* HaoshiyouApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_listings_tab_filter_settings_comp__["a" /* FilterSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_listings_tab_image_grid_comp__["a" /* ImageGridComponent */],
            __WEBPACK_IMPORTED_MODULE_7__pages_listings_tab_listing_creation_page__["a" /* CreationPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_listings_tab_listing_detail_page__["a" /* ListingDetailPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_listings_tab_listing_ux_detail_page__["a" /* ListingUxDetailPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_listings_tab_listing_item_comp__["a" /* ListingItem */],
            __WEBPACK_IMPORTED_MODULE_10__pages_listings_tab_listings_tab_page__["a" /* ListingsTabPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_listings_tab_map_view_comp__["a" /* MapViewComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pages_listings_tab_long_image_comp__["a" /* LongImageComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pages_listings_tab_remove_modal__["a" /* RemoveModal */],
            __WEBPACK_IMPORTED_MODULE_14__pages_settings_tab_settings_tab_page__["a" /* SettingsTabPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tabs_disconnect_modal__["a" /* DisconnectModal */],
            __WEBPACK_IMPORTED_MODULE_25__pages_qrcode_tab_qrcode_tab_page__["a" /* QrCodeTabPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_mine_tab_mine_tab_page__["a" /* MineTabPage */],
            // All Pipes
            __WEBPACK_IMPORTED_MODULE_19__pipes_enum_msg_pipe__["a" /* EnumMsgPipe */],
            __WEBPACK_IMPORTED_MODULE_27__pipes_hsy_group_enum_msg_pipe__["a" /* HsyGroupEnumMsgPipe */],
            __WEBPACK_IMPORTED_MODULE_20__pipes_image_id_to_url_pipe__["b" /* ImageIdsToUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_20__pipes_image_id_to_url_pipe__["a" /* ImageIdToUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_21__pipes_time_from_now_pipe__["a" /* TimeFromNowPipe */],
            __WEBPACK_IMPORTED_MODULE_24__pipes_city_n_zip_pipe__["a" /* CityNZipPipe */],
            __WEBPACK_IMPORTED_MODULE_34__pipes_date_formatter_pipe__["a" /* DateFormatterPipe */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* HaoshiyouApp */], {
                mode: 'ios'
            }, {
                links: [
                    { segment: '', component: __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */], name: 'TabsPage' },
                    { segment: 'listing/:id', component: __WEBPACK_IMPORTED_MODULE_8__pages_listings_tab_listing_detail_page__["a" /* ListingDetailPage */], name: 'ListingDetailPage' },
                    { segment: 'listing-ux/:id', component: __WEBPACK_IMPORTED_MODULE_38__pages_listings_tab_listing_ux_detail_page__["a" /* ListingUxDetailPage */], name: 'ListingUxDetailPage' },
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_26__loopbacksdk_index__["a" /* SDKBrowserModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_37__angular_forms__["a" /* FormsModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* HaoshiyouApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_listings_tab_filter_settings_comp__["a" /* FilterSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_listings_tab_image_grid_comp__["a" /* ImageGridComponent */],
            __WEBPACK_IMPORTED_MODULE_7__pages_listings_tab_listing_creation_page__["a" /* CreationPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_listings_tab_listing_detail_page__["a" /* ListingDetailPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_listings_tab_listing_ux_detail_page__["a" /* ListingUxDetailPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_listings_tab_listing_item_comp__["a" /* ListingItem */],
            __WEBPACK_IMPORTED_MODULE_10__pages_listings_tab_listings_tab_page__["a" /* ListingsTabPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_listings_tab_map_view_comp__["a" /* MapViewComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pages_listings_tab_long_image_comp__["a" /* LongImageComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pages_listings_tab_remove_modal__["a" /* RemoveModal */],
            __WEBPACK_IMPORTED_MODULE_14__pages_settings_tab_settings_tab_page__["a" /* SettingsTabPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tabs_disconnect_modal__["a" /* DisconnectModal */],
            __WEBPACK_IMPORTED_MODULE_25__pages_qrcode_tab_qrcode_tab_page__["a" /* QrCodeTabPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_mine_tab_mine_tab_page__["a" /* MineTabPage */]
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_16__services_image_service__["b" /* IImageService */], useClass: __WEBPACK_IMPORTED_MODULE_16__services_image_service__["a" /* CloudinaryImageService */] },
            __WEBPACK_IMPORTED_MODULE_23__services_map_service__["a" /* MapService */],
            __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["AuthHttp"],
                useFactory: getAuthHttp,
                deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_storage__["a" /* NativeStorage */]]
            },
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_code_push__["a" /* CodePush */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_35__services_flag_service__["a" /* FlagService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaoshiyouApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_tabs_tabs__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__env__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__loopbacksdk_lb_config__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loopbacksdk_models_HsyListing__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_code_push__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__util_url_util__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





 // used by Observable.take()






let HaoshiyouApp = class HaoshiyouApp {
    constructor(platform, authService, http, hsyListingApi, codePush) {
        this.platform = platform;
        this.authService = authService;
        this.http = http;
        this.hsyListingApi = hsyListingApi;
        this.codePush = codePush;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_tabs_tabs__["a" /* TabsPage */];
        this.hsyListing = new __WEBPACK_IMPORTED_MODULE_8__loopbacksdk_models_HsyListing__["a" /* HsyListing */]();
        __WEBPACK_IMPORTED_MODULE_7__loopbacksdk_lb_config__["a" /* LoopBackConfig */].setBaseURL(__WEBPACK_IMPORTED_MODULE_6__env__["a" /* Env */].configHaoshiyouServer.serverUrl);
        __WEBPACK_IMPORTED_MODULE_7__loopbacksdk_lb_config__["a" /* LoopBackConfig */].setApiVersion('api');
        this.platform.ready().then(() => {
            if (this.platform.is(`cordova`)) {
                this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
                let downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); };
                this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
            }
            ga('create', __WEBPACK_IMPORTED_MODULE_6__env__["a" /* Env */].configGoogleAnalytics.propertyId, { 'alwaysSendReferrer': true });
            let referrer = __WEBPACK_IMPORTED_MODULE_11__util_url_util__["a" /* default */].getParameterByName('referrer');
            if (referrer) {
                ga('set', 'campaignName', referrer);
                ga('set', 'referrer', referrer);
            }
            else {
                ga('set', 'campaignName', '(direct)');
                ga('set', 'referrer', referrer);
            }
            ga('set', 'checkProtocolTask', null
            // function(a) {
            //   console.log(`Skipping checkProtocolTask, parameters= ${JSON.stringify(a, null, '\t')}`);
            // }
            );
            ga('send', 'event', {
                eventCategory: 'app-live-cycle',
                eventAction: 'start-app',
            });
        });
    }
};
HaoshiyouApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        template: '<ion-nav [root]="rootPage"></ion-nav>'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"],
        __WEBPACK_IMPORTED_MODULE_9__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_code_push__["a" /* CodePush */]])
], HaoshiyouApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */


//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

/**
 * Default error handler
 */
let ErrorHandler = class ErrorHandler {
    // ErrorObservable when rxjs version < rc.5
    // ErrorObservable<string> when rxjs version = rc.5
    // I'm leaving any for now to avoid breaking apps using both versions
    handleError(error) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    }
};
ErrorHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], ErrorHandler);

//# sourceMappingURL=error.service.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoopBackAuth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_BaseModels__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
let LoopBackAuth = class LoopBackAuth {
    /**
     * @method constructor
     * @param {InternalStorage} storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    constructor(storage) {
        this.storage = storage;
        /**
         * @type {SDKToken}
         **/
        this.token = new __WEBPACK_IMPORTED_MODULE_2__models_BaseModels__["a" /* SDKToken */]();
        /**
         * @type {string}
         **/
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    /**
     * @method setRememberMe
     * @param {boolean} value Flag to remember credentials
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setRememberMe(value) {
        this.token.rememberMe = value;
    }
    /**
     * @method setUser
     * @param {any} user Any type of user model
     * @return {void}
     * @description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     **/
    setUser(user) {
        this.token.user = user;
        this.save();
    }
    /**
     * @method setToken
     * @param {SDKToken} token SDKToken or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setToken(token) {
        this.token = Object.assign({}, this.token, token);
        this.save();
    }
    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    getToken() {
        return this.token;
    }
    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    getAccessTokenId() {
        return this.token.id;
    }
    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    getCurrentUserId() {
        return this.token.userId;
    }
    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    getCurrentUserData() {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    }
    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     **/
    save() {
        if (this.token.rememberMe) {
            let today = new Date();
            let expires = new Date(today.getTime() + (this.token.ttl * 1000));
            this.persist('id', this.token.id, expires);
            this.persist('user', this.token.user, expires);
            this.persist('userId', this.token.userId, expires);
            this.persist('created', this.token.created, expires);
            this.persist('ttl', this.token.ttl, expires);
            this.persist('rememberMe', this.token.rememberMe, expires);
            return true;
        }
        else {
            return false;
        }
    }
    ;
    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    load(prop) {
        return this.storage.get(`${this.prefix}${prop}`);
    }
    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    clear() {
        Object.keys(this.token).forEach((prop) => this.storage.remove(`${this.prefix}${prop}`));
        this.token = new __WEBPACK_IMPORTED_MODULE_2__models_BaseModels__["a" /* SDKToken */]();
    }
    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    persist(prop, value, expires) {
        try {
            this.storage.set(`${this.prefix}${prop}`, (typeof value === 'object') ? JSON.stringify(value) : value, expires);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
};
LoopBackAuth = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__["a" /* InternalStorage */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__["a" /* InternalStorage */]])
], LoopBackAuth);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* tslint:disable */
/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
*
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
class LoopBackConfig {
    static setApiVersion(version = 'api') {
        LoopBackConfig.version = version;
    }
    static getApiVersion() {
        return LoopBackConfig.version;
    }
    static setBaseURL(url = '/') {
        LoopBackConfig.path = url;
    }
    static getPath() {
        return LoopBackConfig.path;
    }
    static setAuthPrefix(authPrefix = '') {
        LoopBackConfig.authPrefix = authPrefix;
    }
    static getAuthPrefix() {
        return LoopBackConfig.authPrefix;
    }
    static setDebugMode(isEnabled) {
        LoopBackConfig.debug = isEnabled;
    }
    static debuggable() {
        return LoopBackConfig.debug;
    }
    static filterOnUrl() {
        LoopBackConfig.filterOn = 'url';
    }
    static filterOnHeaders() {
        LoopBackConfig.filterOn = 'headers';
    }
    static isHeadersFilteringSet() {
        return (LoopBackConfig.filterOn === 'headers');
    }
    static setSecureWebSockets() {
        LoopBackConfig.secure = true;
    }
    static unsetSecureWebSockets() {
        LoopBackConfig.secure = false;
    }
    static isSecureWebSocketsSet() {
        return LoopBackConfig.secure;
    }
    static setRequestOptionsCredentials(withCredentials = false) {
        LoopBackConfig.withCredentials = withCredentials;
    }
    static getRequestOptionsCredentials() {
        return LoopBackConfig.withCredentials;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoopBackConfig;

LoopBackConfig.path = '//0.0.0.0:3000';
LoopBackConfig.version = 'api';
LoopBackConfig.authPrefix = '';
LoopBackConfig.debug = true;
LoopBackConfig.filterOn = 'headers';
LoopBackConfig.secure = false;
LoopBackConfig.withCredentials = false;
//# sourceMappingURL=lb.config.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvType; });
class BaseEnv {
}
/* unused harmony export BaseEnv */

class ConfigAuth0 {
}
/* unused harmony export ConfigAuth0 */

class ConfigCloudinary {
}
/* unused harmony export ConfigCloudinary */

class ConfigGoogleAnalytics {
}
/* unused harmony export ConfigGoogleAnalytics */

class ConfigLogSense {
}
/* unused harmony export ConfigLogSense */

class ConfigHaoshiyouServer {
}
/* unused harmony export ConfigHaoshiyouServer */

var EnvType;
(function (EnvType) {
    EnvType[EnvType["Prod"] = 0] = "Prod";
    EnvType[EnvType["Dev"] = 1] = "Dev";
})(EnvType || (EnvType = {}));
//# sourceMappingURL=base-env.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HsyUserApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */








/**
 * Api services for the `HsyUser` model.
 */
let HsyUserApi = class HsyUserApi extends __WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */] {
    constructor(http, models, auth, searchParams, errorHandler) {
        super(http, models, auth, searchParams, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
    }
    /**
     * Find a related item by id for listings.
     *
     * @param {any} id HsyUser id
     *
     * @param {any} fk Foreign key for listings
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyUser` object.)
     * </em>
     */
    findByIdListings(id, fk, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Delete a related item by id for listings.
     *
     * @param {any} id HsyUser id
     *
     * @param {any} fk Foreign key for listings
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdListings(id, fk, customHeaders) {
        let _method = "DELETE";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Update a related item by id for listings.
     *
     * @param {any} id HsyUser id
     *
     * @param {any} fk Foreign key for listings
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyUser` object.)
     * </em>
     */
    updateByIdListings(id, fk, data = {}, customHeaders) {
        let _method = "PUT";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Queries listings of HsyUser.
     *
     * @param {any} id HsyUser id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyUser` object.)
     * </em>
     */
    getListings(id, filter = {}, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in listings of this model.
     *
     * @param {any} id HsyUser id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyUser` object.)
     * </em>
     */
    createListings(id, data = {}, customHeaders) {
        let _method = "POST";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings";
        let _routeParams = {
            id: id
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deletes all listings of this model.
     *
     * @param {any} id HsyUser id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteListings(id, customHeaders) {
        let _method = "DELETE";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Counts listings of HsyUser.
     *
     * @param {any} id HsyUser id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    countListings(id, where = {}, customHeaders) {
        let _method = "GET";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings/count";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in listings of this model.
     *
     * @param {any} id HsyUser id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `HsyUser` object.)
     * </em>
     */
    createManyListings(id, data = [], customHeaders) {
        let _method = "POST";
        let _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/HsyUsers/:id/listings";
        let _routeParams = {
            id: id
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `HsyUser`.
     */
    getModelName() {
        return "HsyUser";
    }
};
HsyUserApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"],
        __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */],
        __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */],
        __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */],
        __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]])
], HsyUserApi);

//# sourceMappingURL=HsyUser.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_env__ = __webpack_require__(556);

class Env {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Env;

Env.version = "4.0";
Env.envType = __WEBPACK_IMPORTED_MODULE_0__base_env__["a" /* EnvType */].Dev;
Env.flags = {};
Env.configAuth0 = {
    clientId: 'StjMTE6NRzI9qmUPT2ij4LvEzmlja8OY',
    accountDomain: 'xinbenlv.auth0.com',
};
Env.configCloudinary = {
    cloudName: 'xinbenlv',
    apiKey: '999284541119412',
    uploadPreset: 'haoshiyou-dev',
};
Env.configGoogleAnalytics = {
    propertyId: 'UA-55311687-3'
};
Env.configLogSense = {
    token: '85b11658-5721-4734-a396-cb552d8e5e96'
};
Env.configHaoshiyouServer = {
    serverUrl: "http://haoshiyou-server-dev.herokuapp.com"
};
//# sourceMappingURL=env.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IImageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloudinaryImageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_transfer__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_env__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let IImageService = class IImageService {
    /**
     * @param localUris
     * @returns {Promise<any>|Promise<TAll[]>} a list of public id of stored image.
     * In failure, it will reject at the first failure and tell why,
     */
    uploadImagesAndGetIds(localUris) {
        throw "Not implemented";
    }
    ;
    /**
     * Get a url string from image id.
     * @param id
     */
    getUrlFromId(id, width = 200, height = 100) {
        throw "Not implemented";
    }
};
IImageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], IImageService);

let CloudinaryImageService = class CloudinaryImageService {
    constructor(transfer) {
        this.transfer = transfer;
        // TODO(xinbenlv): update the credentials of CloudinaryImageService.
        this.config = {
            cloud_name: __WEBPACK_IMPORTED_MODULE_2__app_env__["a" /* Env */].configCloudinary.cloudName,
            api_key: __WEBPACK_IMPORTED_MODULE_2__app_env__["a" /* Env */].configCloudinary.apiKey,
            upload_preset: __WEBPACK_IMPORTED_MODULE_2__app_env__["a" /* Env */].configCloudinary.uploadPreset
        };
    }
    /**
     * override
     */
    uploadImagesAndGetIds(localUris) {
        let fileTransfer = this.transfer.create();
        let uploadUrl = "https://api.cloudinary.com/v1_1/" + this.config.cloud_name + "/image/upload";
        return Promise.all(localUris.map((uri) => {
            return fileTransfer.upload(uri, uploadUrl, {
                params: this.config
            }).then((result) => {
                let data = JSON.parse(result['response']);
                return data.public_id;
            }).catch((error) => {
            });
        }));
    }
    //noinspection JSUnusedGlobalSymbols
    /**
     * override
     */
    getUrlFromId(id, width = 300, height = 200) {
        let param = "c_fill,g_north";
        if (width == 0 && height == 0) {
            let ion_card_width = 560; //TODO: get the card width
            param += ',w_' + ion_card_width; // 1242 is the width of iphone 6plus.
            // param = 'w_300,h_150,c_fill,g_auto';
        }
        else if (width == 0) {
            param += `,h_${height}`;
        }
        else if (height == 0) {
            param += `,w_${width}`;
        }
        else {
            param += `,w_${width},h_${height}`;
        }
        param += `,g_center`;
        return `http://res.cloudinary.com/${this.config.cloud_name}/image/upload/${param}/${id}.jpg`;
    }
};
CloudinaryImageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_transfer__["a" /* Transfer */]])
], CloudinaryImageService);

//# sourceMappingURL=image.service.js.map

/***/ }),

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageGridComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_image_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__remove_modal__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_env__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ImageGridComponent = class ImageGridComponent {
    constructor(imageService, nav, modalCtrl, platform) {
        this.imageService = imageService;
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.updateImageIds = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ngOnInit() {
        this.platform.ready().then(() => {
            this.initUploader();
        });
    }
    //noinspection JSUnusedLocalSymbols, used in HTML
    showImage(imageId) {
        let el = document.getElementsByTagName('body');
        // TODO(xinbenlv): modify the viewerjs to customize the following
        // 1. click on background area to close
        let url = this.imageService.getUrlFromId(imageId, 0, 0);
        let viewer = new window.Viewer(el[0], {
            url: () => {
                return url;
            },
            inline: false,
            toolbar: true,
            title: false,
            movable: true,
            keyboard: false,
            navbar: true,
            hidden: () => {
                viewer.destroy();
            }
        });
        viewer.show();
    }
    initUploader() {
        var uploadImageFormData = {
            "timestamp": $.now(),
            "api_key": __WEBPACK_IMPORTED_MODULE_4__app_env__["a" /* Env */].configCloudinary.apiKey,
            "upload_preset": __WEBPACK_IMPORTED_MODULE_4__app_env__["a" /* Env */].configCloudinary.uploadPreset,
        };
        var escapedFormData = JSON.stringify(uploadImageFormData);
        $('.cloudinary-fileupload')
            .attr("data-form-data", escapedFormData)
            .bind('cloudinarydone', (e, data) => {
            if (!this.imageIds)
                this.imageIds = [];
            this.onUpdateImageIds(this.imageIds.concat(data.result.public_id));
            return true;
        })
            .cloudinary_fileupload();
    }
    //noinspection JSUnusedLocalSymbols, used in HTML
    clickDelete() {
        this.removeModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__remove_modal__["a" /* RemoveModal */], { imageIds: this.imageIds });
        this.removeModal.onDidDismiss((data) => {
            this.onUpdateImageIds(data.imageIds);
        });
        this.removeModal.present();
    }
    onUpdateImageIds(imageIds) {
        this.imageIds = imageIds;
        this.updateImageIds.emit(this.imageIds); // notify parent
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ImageGridComponent.prototype, "imageIds", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ImageGridComponent.prototype, "updateImageIds", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], ImageGridComponent.prototype, "isEdit", void 0);
ImageGridComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'image-grid',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/image-grid.comp.html"*/'<ion-row wrap >\n    <ion-col width-33 *ngFor="let imageId of imageIds;">\n        <img src="{{imageId | imageIdToUrlPipe}}"\n             alt="Image {{imageId}}"\n             (click)="showImage(imageId)">\n    </ion-col>\n\n    <ion-col width-33 *ngIf="isEdit" width="300px" height="300px">\n        <label class="custom-file-upload">\n            <img src="http://placehold.it/300x300?text=添加" />\n            <input name="file" type="file" multiple="" class="cloudinary-fileupload" data-cloudinary-field="image_id" />\n        </label>\n    </ion-col>\n    <ion-col width-33 *ngIf="isEdit && imageIds.length > 0 ">\n        <img src="http://placehold.it/300x300?text=删除" (click)="clickDelete()">\n    </ion-col>\n</ion-row>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/image-grid.comp.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_image_service__["b" /* IImageService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Platform */]])
], ImageGridComponent);

//# sourceMappingURL=image-grid.comp.js.map

/***/ }),

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listing_detail_page__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loopbacksdk_models_HsyListing__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loopbacksdk_services_custom_HsyInteraction__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_uuid__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listing_ux_detail_page__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_flag_service__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









let ListingItem = class ListingItem {
    constructor(nav, alertCtrl, hsyInteractionApi, hsyListingApi, flagService) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.hsyInteractionApi = hsyInteractionApi;
        this.hsyListingApi = hsyListingApi;
        this.flagService = flagService;
        this.onBump = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    gotoDetail() {
        ga('send', 'event', {
            eventCategory: 'go-to',
            eventAction: 'listing-detail',
            eventLabel: 'from-listing-item'
        });
        if (this.flagService.getFlag('newUx'))
            this.nav.push(__WEBPACK_IMPORTED_MODULE_7__listing_ux_detail_page__["a" /* ListingUxDetailPage */], { listing: this.listing });
        else
            this.nav.push(__WEBPACK_IMPORTED_MODULE_2__listing_detail_page__["a" /* ListingDetailPage */], { listing: this.listing });
    }
    bump() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'interaction',
                eventAction: 'bump',
            });
            let local = window.localStorage;
            let meId = local['user_id']; // TODO(xinbenlv): use UserService
            let now = new Date();
            let hsyInteraction = {
                uid: Object(__WEBPACK_IMPORTED_MODULE_5__util_uuid__["a" /* uuid */])(),
                userId: meId,
                type: "BUMP",
                listingId: this.listing.uid,
                interactionTime: now
            };
            this.listing.interactions.push(hsyInteraction);
            this.onBump.emit(this.listing);
            yield this.hsyInteractionApi.create(hsyInteraction).toPromise();
            yield this.hsyListingApi.updateAttributes(this.listing.uid, { latestUpdatedOrBump: now }).toPromise();
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ListingItem.prototype, "onBump", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__loopbacksdk_models_HsyListing__["a" /* HsyListing */])
], ListingItem.prototype, "listing", void 0);
ListingItem = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'listing-item',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-item.comp.html"*/'<ion-card *ngIf="listing">\n    <img *ngIf="listing.imageIds.length > 0"\n         src="{{ listing.imageIds[0] | imageIdToUrlPipe }}"\n         alt="img-{{imageId}}"\n         (click)="gotoDetail()"/>\n    <img *ngIf="listing.imageIds.length == 0" src="assets/res/no-photo-placeholder.png" alt="" (click)="gotoDetail()">\n    <ion-card-header class="listing-item-header" no-padding padding-top padding-left padding-right (click)="gotoDetail()">\n        <span class="hsy-listing-item-header">{{ listing.content ? listing.title.slice(0, 30) +\'...\' : \'详情见图片\' }}</span><br>\n    </ion-card-header>\n    <ion-card-content no-padding no-margin padding-left>\n        <ion-label no-padding no-margin class="hsy-listing-item-price" color="primary">{{ listing.price ? \'$\' + listing.price.toString() : \'价格待议\' }}</ion-label>\n        <ion-item no-padding no-margin>\n            <ion-label item-left class="hsy-listing-item-last-updated" color="grey">{{ listing.lastUpdated | timeFromNow }}更新</ion-label>\n            <ion-label item-right ion-button icon-left clear color="grey">\n                <ion-icon name="thumbs-up-outline"></ion-icon>\n                <span *ngIf="listing.interactions.length > 0">{{listing.interactions.length}}</span>\n            </ion-label>\n            <ion-label item-right ion-button icon-left clear color="grey">\n                <ion-icon name="eye-outline"></ion-icon>\n            </ion-label>\n        </ion-item>\n    </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-item.comp.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__loopbacksdk_services_custom_HsyInteraction__["a" /* HsyInteractionApi */],
        __WEBPACK_IMPORTED_MODULE_6__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */],
        __WEBPACK_IMPORTED_MODULE_8__services_flag_service__["a" /* FlagService */]])
], ListingItem);

//# sourceMappingURL=listing-item.comp.js.map

/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LongImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loopbacksdk_models_HsyListing__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let LongImageComponent = class LongImageComponent {
    constructor(platform, transfer) {
        this.platform = platform;
        this.transfer = transfer;
        this.canvasWidth = 600;
        console.log(this.platform.versions());
        this.fileTransfer = this.transfer.create();
    }
    generateLongImage() {
        console.log(" --- generateLongImage... --- ");
        let c = document.createElement('canvas');
        c.width = this.canvasWidth;
        let ctx = c.getContext('2d');
        var title = this.listing.title;
        var description = this.listing.content;
        var despHeight = this.preCalculateHeight(ctx, description, 550, 25);
        var qrcodeHeight = 400;
        this.canvasHeight = 100 + despHeight + qrcodeHeight; // title + description
        if (this.hasLocation()) {
            this.canvasHeight += 250;
        }
        var promises = new Array();
        let images = this.preloadElements(promises);
        let imagesHeight = 0;
        Promise.all(promises).then(values => {
            this.resizeCanvas(c, images);
            this.drawElements(c, despHeight, title, description, images);
        });
    }
    preloadElements(promises) {
        var map_image = null;
        if (this.hasLocation()) {
            map_image = new Image();
            var lat = this.listing.location.lat;
            var lng = this.listing.location.lng;
            var map_size = '598x250';
            var map_src = 'https://maps.googleapis.com/maps/api/staticmap?&zoom=12&size='
                + map_size + '&maptype=roadmap&markers=color:red|'
                + lat + ',' + lng + '&key=AIzaSyDilZ69sI7zcszD1XWZ6oeV4IW8rufebMY';
            map_image.crossOrigin = 'Anonymous';
            promises.push(new Promise(function (resolve, reject) {
                map_image.onload = function () {
                    resolve();
                };
            }));
            map_image.src = map_src;
        }
        var qrcenter_image = new Image();
        var qrcenter_src = '/assets/res/favicon/apple-touch-icon-72x72.png';
        qrcenter_image.crossOrigin = 'Anonymous';
        promises.push(new Promise(function (resolve, reject) {
            qrcenter_image.onload = function () {
                resolve();
            };
        }));
        qrcenter_image.src = qrcenter_src;
        var imageCnt = this.listing.imageIds === undefined ? 0 : this.listing.imageIds.length;
        let base_images = new Array(imageCnt);
        for (let i = 0; i < imageCnt; i++) {
            base_images[i] = new Image();
            base_images[i].crossOrigin = 'Anonymous';
            base_images[i].src = 'http://res.cloudinary.com/xinbenlv/image/upload/q_70,w_600/' + this.listing.imageIds[i];
            promises.push(new Promise(function (resolve, reject) {
                base_images[i].onload = function () {
                    resolve();
                };
            }));
        }
        let qrcode_image = this.getQrcodeImage(document.location.href);
        /*
        var goto_image = new Image();
        var goto_src = '/assets/res/long-image/haoshiyou-goto.png'
        goto_image.crossOrigin = 'Anonymous';
        promises.push(new Promise(function(resolve,reject){
          goto_image.onload = function(){
            resolve();
          };
        }));
        goto_image.src = goto_src;
        */
        return {
            map_image: map_image,
            base_images: base_images,
            qrcode_image: qrcode_image,
            qrcenter_image: qrcenter_image
            // goto_image: goto_image
        };
    }
    resizeCanvas(c, images) {
        let imageCnt = images.base_images == undefined ? 0 : images.base_images.length;
        let imagesHeight = 0;
        for (let i = 0; i < imageCnt; i++) {
            imagesHeight += images.base_images[i].height;
        }
        c.height = this.canvasHeight + imagesHeight;
    }
    hasLocation() {
        return this.listing.location != undefined && this.listing.location.lat != 0;
    }
    drawElements(c, despHeight, title, description, images) {
        console.log(" --- drawElements... --- ");
        let imageCnt = images.base_images == undefined ? 0 : images.base_images.length;
        let ctx = c.getContext('2d');
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(title, 10, 50);
        ctx.font = "20px Arial";
        this.fillMultiLines(ctx, description, 25, 80, 550, 25);
        let imageY = 100 + despHeight;
        if (this.hasLocation()) {
            ctx.drawImage(images.map_image, 0, imageY);
            imageY += 250;
        }
        for (let i = 0; i < imageCnt; i++) {
            ctx.drawImage(images.base_images[i], 0, imageY);
            imageY += images.base_images[i].height;
        }
        var qrcodeY = imageY + 70;
        ctx.drawImage(images.qrcode_image, 170, qrcodeY);
        ctx.drawImage(images.qrcenter_image, (this.canvasWidth - 72) / 2, qrcodeY + 95);
        var qrcodeHintY = qrcodeY - 20;
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        var gotoY = qrcodeY + 300;
        ctx.fillText('扫描二维码查看详情，可私信po主', 160, qrcodeHintY);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText('更多咨询请查看haoshiyou.org', 100, gotoY);
        // ctx.drawImage(images.goto_image, 6, gotoY);
        // draw boundaries
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, this.canvasWidth, c.height); //for white background
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, this.canvasWidth, c.height); //for white background
        console.log(" --- Begin to download... --- ");
        let fileName = 'haoshiyou-' + (new Date(this.listing.lastUpdated)).toISOString() + '.png';
        if (this.platform.is('core')) {
            if (navigator.userAgent.indexOf("MSIE") > 0 ||
                navigator.userAgent.match(/Trident.*rv\:11\./)) {
                var blob = c.msToBlob();
                window.navigator.msSaveBlob(blob, fileName);
            }
            else {
                var a = document.getElementById("downloadLink");
                a.setAttribute("href", c.toDataURL());
                a.setAttribute("download", fileName);
                a.click();
            }
        }
        else {
            var imgDataUrl = c.toDataURL();
            var targetPath = cordova.file.dataDirectory + "/haoshiyou/" + fileName;
            var options = {};
            this.fileTransfer.download(imgDataUrl, targetPath, true)
                .then(function (result) {
                // Success!
                console.log("Download");
            }, function (err) {
                // Error
                console.log("Not Download");
            });
        }
    }
    getQrcodeImage(link) {
        var el = document.createElement('div');
        el.style.margin = "20%";
        var qrcode = new QRCode(el);
        qrcode.makeCode(link);
        return el.firstChild;
    }
    preCalculateHeight(context, text, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var lines = 0;
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines++;
            }
        }
        return lines * lineHeight; // height
    }
    fillMultiLines(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var lines = 0;
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
                lines++;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__loopbacksdk_models_HsyListing__["a" /* HsyListing */])
], LongImageComponent.prototype, "listing", void 0);
LongImageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'long-image',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/long-image.comp.html"*/'<button ion-button color="primary" clear item-left (click)="generateLongImage()">\n    下载长图片 <ion-icon name="ios-long-image"></ion-icon>\n</button>\n<a id="downloadLink" hidden></a>'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/long-image.comp.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */]])
], LongImageComponent);

//# sourceMappingURL=long-image.comp.js.map

/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnumMsgPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let EnumMsgPipe = class EnumMsgPipe {
    transform(value) {
        // TODO(xinbenlv): fix it
        if (value == 'NeedRoom') {
            return '求租';
        }
        else if (value == 'NeedRoommate') {
            return '招租';
        }
        else
            return '招租';
    }
};
EnumMsgPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'enumMsgPipe' })
], EnumMsgPipe);

//# sourceMappingURL=enum-msg.pipe.js.map

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ImageIdsToUrlPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageIdToUrlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_image_service__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ImageIdsToUrlPipe = class ImageIdsToUrlPipe {
    constructor(imageService) {
        this.imageService = imageService;
    }
    transform(ids) {
        return ids.map((id) => {
            return this.imageService.getUrlFromId(id);
        });
    }
};
ImageIdsToUrlPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'imageIdsToUrlPipe',
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_image_service__["b" /* IImageService */]])
], ImageIdsToUrlPipe);

let ImageIdToUrlPipe = class ImageIdToUrlPipe {
    constructor(imageService) {
        this.imageService = imageService;
    }
    transform(id, mode = "default") {
        if (mode == "default") {
            return this.imageService.getUrlFromId(id);
        }
        else if (mode == "full") {
            return this.imageService.getUrlFromId(id, 0, 0);
        }
    }
};
ImageIdToUrlPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'imageIdToUrlPipe',
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_image_service__["b" /* IImageService */]])
], ImageIdToUrlPipe);

//# sourceMappingURL=image-id-to-url.pipe.js.map

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeFromNowPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


__WEBPACK_IMPORTED_MODULE_1_moment___default.a.locale('zh-cn');
let TimeFromNowPipe = class TimeFromNowPipe {
    transform(value /*time in UTC ms */) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(new Date(value)).fromNow();
    }
};
TimeFromNowPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'timeFromNow'
    })
], TimeFromNowPipe);

//# sourceMappingURL=time-from-now.pipe.js.map

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 387,
	"./af.js": 387,
	"./ar": 388,
	"./ar-dz": 389,
	"./ar-dz.js": 389,
	"./ar-kw": 390,
	"./ar-kw.js": 390,
	"./ar-ly": 391,
	"./ar-ly.js": 391,
	"./ar-ma": 392,
	"./ar-ma.js": 392,
	"./ar-sa": 393,
	"./ar-sa.js": 393,
	"./ar-tn": 394,
	"./ar-tn.js": 394,
	"./ar.js": 388,
	"./az": 395,
	"./az.js": 395,
	"./be": 396,
	"./be.js": 396,
	"./bg": 397,
	"./bg.js": 397,
	"./bm": 398,
	"./bm.js": 398,
	"./bn": 399,
	"./bn.js": 399,
	"./bo": 400,
	"./bo.js": 400,
	"./br": 401,
	"./br.js": 401,
	"./bs": 402,
	"./bs.js": 402,
	"./ca": 403,
	"./ca.js": 403,
	"./cs": 404,
	"./cs.js": 404,
	"./cv": 405,
	"./cv.js": 405,
	"./cy": 406,
	"./cy.js": 406,
	"./da": 407,
	"./da.js": 407,
	"./de": 408,
	"./de-at": 409,
	"./de-at.js": 409,
	"./de-ch": 410,
	"./de-ch.js": 410,
	"./de.js": 408,
	"./dv": 411,
	"./dv.js": 411,
	"./el": 412,
	"./el.js": 412,
	"./en-au": 413,
	"./en-au.js": 413,
	"./en-ca": 414,
	"./en-ca.js": 414,
	"./en-gb": 415,
	"./en-gb.js": 415,
	"./en-ie": 416,
	"./en-ie.js": 416,
	"./en-nz": 417,
	"./en-nz.js": 417,
	"./eo": 418,
	"./eo.js": 418,
	"./es": 419,
	"./es-do": 420,
	"./es-do.js": 420,
	"./es-us": 421,
	"./es-us.js": 421,
	"./es.js": 419,
	"./et": 422,
	"./et.js": 422,
	"./eu": 423,
	"./eu.js": 423,
	"./fa": 424,
	"./fa.js": 424,
	"./fi": 425,
	"./fi.js": 425,
	"./fo": 426,
	"./fo.js": 426,
	"./fr": 427,
	"./fr-ca": 428,
	"./fr-ca.js": 428,
	"./fr-ch": 429,
	"./fr-ch.js": 429,
	"./fr.js": 427,
	"./fy": 430,
	"./fy.js": 430,
	"./gd": 431,
	"./gd.js": 431,
	"./gl": 432,
	"./gl.js": 432,
	"./gom-latn": 433,
	"./gom-latn.js": 433,
	"./gu": 434,
	"./gu.js": 434,
	"./he": 435,
	"./he.js": 435,
	"./hi": 436,
	"./hi.js": 436,
	"./hr": 437,
	"./hr.js": 437,
	"./hu": 438,
	"./hu.js": 438,
	"./hy-am": 439,
	"./hy-am.js": 439,
	"./id": 440,
	"./id.js": 440,
	"./is": 441,
	"./is.js": 441,
	"./it": 442,
	"./it.js": 442,
	"./ja": 443,
	"./ja.js": 443,
	"./jv": 444,
	"./jv.js": 444,
	"./ka": 445,
	"./ka.js": 445,
	"./kk": 446,
	"./kk.js": 446,
	"./km": 447,
	"./km.js": 447,
	"./kn": 448,
	"./kn.js": 448,
	"./ko": 449,
	"./ko.js": 449,
	"./ky": 450,
	"./ky.js": 450,
	"./lb": 451,
	"./lb.js": 451,
	"./lo": 452,
	"./lo.js": 452,
	"./lt": 453,
	"./lt.js": 453,
	"./lv": 454,
	"./lv.js": 454,
	"./me": 455,
	"./me.js": 455,
	"./mi": 456,
	"./mi.js": 456,
	"./mk": 457,
	"./mk.js": 457,
	"./ml": 458,
	"./ml.js": 458,
	"./mr": 459,
	"./mr.js": 459,
	"./ms": 460,
	"./ms-my": 461,
	"./ms-my.js": 461,
	"./ms.js": 460,
	"./mt": 462,
	"./mt.js": 462,
	"./my": 463,
	"./my.js": 463,
	"./nb": 464,
	"./nb.js": 464,
	"./ne": 465,
	"./ne.js": 465,
	"./nl": 466,
	"./nl-be": 467,
	"./nl-be.js": 467,
	"./nl.js": 466,
	"./nn": 468,
	"./nn.js": 468,
	"./pa-in": 469,
	"./pa-in.js": 469,
	"./pl": 470,
	"./pl.js": 470,
	"./pt": 471,
	"./pt-br": 472,
	"./pt-br.js": 472,
	"./pt.js": 471,
	"./ro": 473,
	"./ro.js": 473,
	"./ru": 474,
	"./ru.js": 474,
	"./sd": 475,
	"./sd.js": 475,
	"./se": 476,
	"./se.js": 476,
	"./si": 477,
	"./si.js": 477,
	"./sk": 478,
	"./sk.js": 478,
	"./sl": 479,
	"./sl.js": 479,
	"./sq": 480,
	"./sq.js": 480,
	"./sr": 481,
	"./sr-cyrl": 482,
	"./sr-cyrl.js": 482,
	"./sr.js": 481,
	"./ss": 483,
	"./ss.js": 483,
	"./sv": 484,
	"./sv.js": 484,
	"./sw": 485,
	"./sw.js": 485,
	"./ta": 486,
	"./ta.js": 486,
	"./te": 487,
	"./te.js": 487,
	"./tet": 488,
	"./tet.js": 488,
	"./th": 489,
	"./th.js": 489,
	"./tl-ph": 490,
	"./tl-ph.js": 490,
	"./tlh": 491,
	"./tlh.js": 491,
	"./tr": 492,
	"./tr.js": 492,
	"./tzl": 493,
	"./tzl.js": 493,
	"./tzm": 494,
	"./tzm-latn": 495,
	"./tzm-latn.js": 495,
	"./tzm.js": 494,
	"./uk": 496,
	"./uk.js": 496,
	"./ur": 497,
	"./ur.js": 497,
	"./uz": 498,
	"./uz-latn": 499,
	"./uz-latn.js": 499,
	"./uz.js": 498,
	"./vi": 500,
	"./vi.js": 500,
	"./x-pseudo": 501,
	"./x-pseudo.js": 501,
	"./yo": 502,
	"./yo.js": 502,
	"./zh-cn": 503,
	"./zh-cn.js": 503,
	"./zh-hk": 504,
	"./zh-hk.js": 504,
	"./zh-tw": 505,
	"./zh-tw.js": 505
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 839;

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CityNZipPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_map_service__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let CityNZipPipe = class CityNZipPipe {
    constructor(mapService) {
        this.mapService = mapService;
    }
    transform(latlng /*:google.maps.LatLng*/) {
        return this.mapService.getLocality(latlng).then((locality) => {
            return locality.city + ", " + locality.zip;
        }).catch((e) => {
            console.log(e);
            return Promise.resolve("Unknown City");
        });
    }
};
CityNZipPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'cityNZipPipe',
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_map_service__["a" /* MapService */]])
], CityNZipPipe);

//# sourceMappingURL=city-n-zip.pipe.js.map

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SDKBrowserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_core_search_params__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_core_error_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_core_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_custom_logger_service__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_custom_SDKModels__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_storage_swaps__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__storage_cookie_browser__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__storage_storage_browser__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_custom_HsyUser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_custom_HsyInteraction__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_index__ = __webpack_require__(843);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_index__ = __webpack_require__(844);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lb_config__ = __webpack_require__(54);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony reexport CookieBrowser */
/* unused harmony reexport StorageBrowser */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/














/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
let SDKBrowserModule = SDKBrowserModule_1 = class SDKBrowserModule {
    static forRoot(internalStorageProvider = {
            provide: __WEBPACK_IMPORTED_MODULE_5__storage_storage_swaps__["a" /* InternalStorage */],
            useClass: __WEBPACK_IMPORTED_MODULE_9__storage_cookie_browser__["a" /* CookieBrowser */]
        }) {
        return {
            ngModule: SDKBrowserModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__services_core_auth_service__["a" /* LoopBackAuth */],
                __WEBPACK_IMPORTED_MODULE_3__services_custom_logger_service__["a" /* LoggerService */],
                __WEBPACK_IMPORTED_MODULE_0__services_core_search_params__["a" /* JSONSearchParams */],
                __WEBPACK_IMPORTED_MODULE_4__services_custom_SDKModels__["a" /* SDKModels */],
                __WEBPACK_IMPORTED_MODULE_11__services_custom_HsyListing__["a" /* HsyListingApi */],
                __WEBPACK_IMPORTED_MODULE_12__services_custom_HsyUser__["a" /* HsyUserApi */],
                __WEBPACK_IMPORTED_MODULE_13__services_custom_HsyInteraction__["a" /* HsyInteractionApi */],
                internalStorageProvider,
                { provide: __WEBPACK_IMPORTED_MODULE_5__storage_storage_swaps__["b" /* SDKStorage */], useClass: __WEBPACK_IMPORTED_MODULE_10__storage_storage_browser__["a" /* StorageBrowser */] }
            ]
        };
    }
};
SDKBrowserModule = SDKBrowserModule_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_7__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["HttpModule"]],
        declarations: [],
        exports: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__services_core_error_service__["a" /* ErrorHandler */]
        ]
    })
], SDKBrowserModule);

/**
* Have Fun!!!
* - Jon
**/






var SDKBrowserModule_1;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HsyListing__ = __webpack_require__(50);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HsyUser__ = __webpack_require__(269);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HsyInteraction__ = __webpack_require__(270);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BaseModels__ = __webpack_require__(273);
/* unused harmony namespace reexport */
/* tslint:disable */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_index__ = __webpack_require__(845);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_index__ = __webpack_require__(281);
/* unused harmony namespace reexport */
/* tslint:disable */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__(53);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_service__ = __webpack_require__(52);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_params__ = __webpack_require__(51);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_service__ = __webpack_require__(93);
/* unused harmony namespace reexport */
/* tslint:disable */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HsyGroupEnumMsgPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let HsyGroupEnumMsgPipe = class HsyGroupEnumMsgPipe {
    transform(value) {
        switch (value) {
            case 'SanFrancisco':
                return '三番';
            case 'SouthBayWest':
                return '南湾西';
            case 'SouthBayEast':
                return '南湾东';
            case 'EastBay':
                return '东湾';
            case 'MidPeninsula':
                return '中半岛';
            case 'Seattle':
                return '西雅图';
            case 'ShortTerm':
                return '短租';
            case 'TestGroup':
                return '测试';
            default:
                return value;
        }
    }
};
HsyGroupEnumMsgPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'hsyGroupEnumMsgPipe' })
], HsyGroupEnumMsgPipe);

//# sourceMappingURL=hsy-group-enum-msg.pipe.js.map

/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormatterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


__WEBPACK_IMPORTED_MODULE_1_moment___default.a.locale('zh-cn');
let DateFormatterPipe = class DateFormatterPipe {
    transform(value /*time in UTC ms */) {
        let date = new Date(value);
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(date).format('YYYY-MM-DD HH:MM');
    }
};
DateFormatterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'dateFormatterPipe'
    })
], DateFormatterPipe);

//# sourceMappingURL=date-formatter.pipe.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingsTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listing_creation_page__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_url_util__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_flag_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__filter_settings_comp__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__map_view_comp__ = __webpack_require__(378);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const SEGMENT_KEY = 'segment';
const AREA_KEY = 'area';
/**
 * A page contains a map view and a list showing the listings.
 */
let ListingsTabPage = class ListingsTabPage {
    constructor(platform, nav, alertCtrl, auth, api, flagService, popoverCtrl, ref) {
        this.platform = platform;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.api = api;
        this.flagService = flagService;
        this.popoverCtrl = popoverCtrl;
        this.ref = ref;
        this.segmentModel = 'ROOMMATE_WANTED'; // by default for rent
        this.areaModel = 'All'; // by default for All
        this.useGrid = !(navigator.platform == 'iPhone');
        this.loadedListings = [];
        this.mapReady = false;
        this.currentIndex = 0;
        this.filterSettings = { 'types': {}, 'areas': {}, 'duration': {} };
        this.whereClause = {};
        this.isLoading = false;
        this.mapOrList = 'ONLY_LIST';
        this.options = [
            'All',
            'SanFrancisco',
            'MidPeninsula',
            'SouthBayWest',
            'SouthBayEast',
            'EastBay',
            'ShortTerm',
            'Seattle',
            'TestGroup',
        ];
        this.optionsMap = {
            'All': '全部',
            'SanFrancisco': '三番',
            'MidPeninsula': '中半岛',
            'SouthBayWest': '南湾西',
            'SouthBayEast': '南湾东',
            'EastBay': '东湾',
            'ShortTerm': '短租',
            'Seattle': '西雅图',
            'TestGroup': '测试',
        };
    }
    ngOnDestroy() {
        for (let marker of this.markers) {
            marker.setMap(null);
        }
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            let segmentFromUrl = __WEBPACK_IMPORTED_MODULE_6__util_url_util__["a" /* default */].getParameterByName(SEGMENT_KEY);
            if (segmentFromUrl) {
                this.segmentModel = segmentFromUrl;
            }
            let areaFromUrl = __WEBPACK_IMPORTED_MODULE_6__util_url_util__["a" /* default */].getParameterByName(AREA_KEY);
            if (areaFromUrl) {
                this.areaModel = areaFromUrl;
            }
            this.updateWhereClause();
            yield this.loadMoreListings();
            if (this.largeEnough()) {
                this.mapOrList = 'BOTH';
            }
            else
                this.mapOrList = 'ONLY_LIST';
            this.updateMapOrList(this.mapOrList);
        });
    }
    ionViewDidEnter() {
        ga('set', 'page', '/listings-tab.page.html');
        ga('send', 'pageview');
        this.ref.markForCheck();
    }
    //noinspection JSUnusedGlobalSymbols
    onSegmentModelChange(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            this.segmentModel = newValue;
            yield this.initLoad();
            ga('set', 'page', `/listings-tab.page.html#segment-${newValue}`);
            ga('send', 'pageview');
        });
    }
    //noinspection JSUnusedGlobalSymbols
    onAreaModelChange(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            this.areaModel = newValue;
            yield this.initLoad();
            ga('set', 'page', `/listings-tab.page.html#area-${newValue}`);
            ga('send', 'pageview');
        });
    }
    loadMoreListings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            ga('send', 'event', {
                eventCategory: 'load',
                eventAction: 'load-more-listings',
                eventLabel: `load-more-index-${this.loadedListings.length}`
            });
            let start = Date.now();
            // southwest: 37.148070, -122.852249
            // northeast: 38.072739, -121.473969
            let newItems = yield this.api
                .find({
                // TODO(zzn): use ListTypeEnum when migrated
                where: this.whereClause,
                order: 'latestUpdatedOrBump DESC',
                limit: 24,
                offset: this.loadedListings.length,
                include: ['interactions', 'owner'],
            })
                .take(1)
                .toPromise();
            let end = Date.now();
            ga('send', {
                hitType: 'timing',
                timingCategory: 'API Call',
                timingVar: 'load-more-listings',
                timingValue: end - start
            });
            for (let item of newItems) {
                this.loadedListings.push(item);
            }
            this.mapView.addListings(newItems);
            this.isLoading = false;
        });
    }
    updateMarkers() {
        // TODO(xinbenlv): update markers
    }
    fakeGoToCreationPage() {
        return __awaiter(this, void 0, void 0, function* () {
            ga('send', 'event', {
                eventCategory: 'go-to',
                eventAction: 'listing-creation',
            });
            let alert = this.alertCtrl.create({
                title: '新版app中发帖功能正在建设中',
                buttons: [
                    {
                        text: 'OK',
                    },
                ]
            });
            yield alert.present();
        });
    }
    goToCreationPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.auth.authenticated()) {
                //push another page onto the history stack
                //causing the nav controller to animate the new page in
                this.nav.push(__WEBPACK_IMPORTED_MODULE_2__listing_creation_page__["a" /* CreationPage */]);
            }
            else {
                let alert = this.alertCtrl.create({
                    title: '请登录后发帖',
                    buttons: [
                        {
                            text: '取消',
                        },
                        {
                            text: '登陆',
                            handler: () => {
                                this.auth.login();
                            }
                        }
                    ]
                });
                yield alert.present();
            }
        });
    }
    doInfinite(infiniteScroll) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadMoreListings();
            infiniteScroll.complete();
        });
    }
    isDebug() {
        return this.flagService.getFlag('debug');
    }
    // Hack introduced due to this issue: https://github.com/ionic-team/ionic/issues/6923
    setOption(index, event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options[index] != null) {
                this.areaModel = this.options[index];
                yield this.onAreaModelChange(this.areaModel);
                //note you have to use "tap" or "click" - if you bind to "ionSelected" you don't get the "target" property
                let segments = event.target.parentNode.children;
                let len = segments.length;
                for (let i = 0; i < len; i++) {
                    segments[i].classList.remove('segment-activated');
                }
                event.target.classList.add('segment-activated');
            }
        });
    }
    bumpUpdateOrder(hsyListing) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.loadedListings.length; i++) {
                let bumpedListing = hsyListing;
                if (this.loadedListings[i] == bumpedListing) {
                    yield this.content.scrollToTop();
                    this.loadedListings.splice(i, 1);
                    this.loadedListings.unshift(bumpedListing);
                    break;
                }
            }
        });
    }
    popoverFilter(myEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            let popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__filter_settings_comp__["a" /* FilterSettingsComponent */], { 'filterSettings': this.filterSettings }, {});
            yield popover.onDidDismiss((data) => __awaiter(this, void 0, void 0, function* () {
                console.log(`--- received ` + JSON.stringify(data));
                if (data !== undefined && data !== null) {
                    this.filterSettings = data["filterSettings"];
                }
                else if (this.popoverCtrl['_app'].filterSettings) {
                    this.filterSettings = this.popoverCtrl['_app'] /*a hack to access private */.filterSettings;
                }
                this.updateWhereClause();
                yield this.initLoad();
            }));
            yield popover.present({
                ev: myEvent
            });
        });
    }
    updateWhereClause() {
        /* START filtering type */
        let type = this.getType(this.filterSettings['types']['zhaozu'], this.filterSettings['types']['qiuzu']);
        let whereClause_ = {};
        if (type == 0) {
            whereClause_['listingTypeEnum'] = 'NeedRoommate';
        }
        else if (type == 1) {
            whereClause_['listingTypeEnum'] = 'NeedRoom';
        }
        else {
            delete whereClause_['listingTypeEnum'];
        }
        /* END filtering type */
        /* START filtering duration */
        let ago = null;
        switch (this.filterSettings['duration']) {
            case '最近3天':
                ago = new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000));
                break;
            case '最近7天':
                ago = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                break;
            case '最近30天':
                ago = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
                break;
            case '最近90天':
                ago = new Date(new Date().getTime() - (90 * 24 * 60 * 60 * 1000));
                break;
            case '不限': // fall though
            default:
        }
        if (ago)
            whereClause_['lastUpdated'] = { "gte": ago };
        /* END filtering duration */
        /* START filtering price */
        if (this.filterSettings['price']) {
            whereClause_['price'] = { lt: this.filterSettings['price'] };
        }
        else {
            delete whereClause_['price'];
        }
        /* END filtering price */
        /* START filtering area */
        let allArea = this.filterSettings['areas']["All"];
        if (allArea !== undefined && allArea === true) {
            whereClause_['hsyGroupEnum'] = { 'nin': ['BigTeam', 'TestGroup', 'None'] };
        }
        else {
            let areaClause = [];
            for (let area in this.filterSettings['areas']) {
                let selected = this.filterSettings['areas'][area];
                if (selected !== undefined && selected) {
                    areaClause.push(area);
                }
            }
            if (areaClause.length > 0)
                whereClause_['hsyGroupEnum'] = { 'inq': areaClause };
        }
        /* END filtering area */
        /* EXEC filtering */
        this.whereClause = whereClause_;
    }
    getType(zhaozu, qiuzu) {
        if (zhaozu === undefined || !zhaozu) {
            zhaozu = false;
        }
        if (qiuzu === undefined || !qiuzu) {
            qiuzu = false;
        }
        if (zhaozu && !qiuzu) {
            return 0;
        }
        if (!zhaozu && qiuzu) {
            return 1;
        }
        return -1;
    }
    largeEnough() {
        return window.innerWidth > 600;
    }
    updateMapOrList(value) {
        if (value == "ONLY_MAP") {
            this.listContainerCol.nativeElement.setAttribute('style', 'display:none;');
            this.mapContainerCol.nativeElement.setAttribute('style', 'display:block;');
            this.mapContainerCol.nativeElement.className = 'full-width';
        }
        else if (value == "ONLY_LIST") {
            this.listContainerCol.nativeElement.setAttribute('style', 'display:block;');
            this.mapContainerCol.nativeElement.setAttribute('style', 'display:none;');
            this.listContainerCol.nativeElement.className = 'full-width';
        }
        this.mapView.render();
    }
    onBoundaryFilter(boundary) {
        return __awaiter(this, void 0, void 0, function* () {
            let latMax = boundary.getNorthEast().lat();
            let latMin = boundary.getSouthWest().lat();
            let lngMax = boundary.getNorthEast().lng();
            let lngMin = boundary.getSouthWest().lng();
            this.whereClause['and'] = [
                { 'location_lat': { 'lt': latMax } },
                { 'location_lat': { 'gt': latMin } },
                { 'location_lng': { 'lt': lngMax } },
                { 'location_lng': { 'gt': lngMin } },
            ];
            yield this.initLoad();
        });
    }
    initLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadedListings = [];
            this.mapView.clearMarkers();
            yield this.loadMoreListings();
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* Content */])
], ListingsTabPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_9__map_view_comp__["a" /* MapViewComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_9__map_view_comp__["a" /* MapViewComponent */])
], ListingsTabPage.prototype, "mapView", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('mapContainerCol'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
], ListingsTabPage.prototype, "mapContainerCol", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('listContainerCol'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
], ListingsTabPage.prototype, "listContainerCol", void 0);
ListingsTabPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'listing-tab',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listings-tab.page.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-searchbar>\n\n        </ion-searchbar>\n        <ion-buttons end>\n            <button ion-button (click)="popoverFilter($event)">\n                <ion-icon name="funnel"> 筛选</ion-icon>\n            </button>\n            <button ion-button (click)="goToCreationPage()">\n                <ion-icon name="add"> 发帖</ion-icon>\n            </button>\n\n        </ion-buttons>\n    </ion-navbar>\n\n    <ion-navbar *ngIf="!largeEnough()">\n        <ion-segment [(ngModel)]="mapOrList" (ngModelChange)="updateMapOrList($event)">\n            <ion-segment-button value="ONLY_LIST">列表</ion-segment-button>\n            <ion-segment-button value="ONLY_MAP">地图</ion-segment-button>\n        </ion-segment>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-row style="height: 100%;">\n        <ion-col #listContainerCol class="grey-background"\n                 style="height: 100%;" id="left" no-padding>\n            <ion-content fullscreen>\n                <ion-row align-items-center justify-content-center *ngIf="isInitLoading">\n                    <ion-spinner></ion-spinner>\n                </ion-row>\n                <!--\n                    We duplicate the grid and original ion-item because responsive\n                    grid doesn\'t work well with iOS yet.\n                    TODO(xinbenlv): remove this ion-list when works on iOS.\n                -->\n                <ion-list *ngIf="!useGrid">\n                    <listing-item *ngFor="let listing of loadedListings; let i = index"\n                                  [listing]=listing (onBump)="bumpUpdateOrder($event)"></listing-item>\n                </ion-list>\n                <ion-grid *ngIf="useGrid">\n                    <ion-row>\n                        <ion-col\n                                col-xl-6\n                                col-lg-6\n                                col-md-6\n                                col-sm-12\n                                col-xs-12\n                                *ngFor="let listing of loadedListings; let i = index">\n                            <listing-item [listing]=listing (onBump)="bumpUpdateOrder($event)"></listing-item>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n                <ion-infinite-scroll *ngIf="!isInitLoading" (ionInfinite)="doInfinite($event)">\n                    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n            </ion-content>\n        </ion-col>\n        <!-- the main content -->\n        <ion-col #mapContainerCol style="height: 100%;" id="right" no-padding>\n            <map-view #mapView (onBoundaryFilter)="onBoundaryFilter($event)"></map-view>\n        </ion-col>\n    </ion-row>\n</ion-content>'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listings-tab.page.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_5__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */],
        __WEBPACK_IMPORTED_MODULE_7__services_flag_service__["a" /* FlagService */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])
], ListingsTabPage);

//# sourceMappingURL=listings-tab.page.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_uuid__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loopbacksdk_services_custom_HsyListing__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_map_service__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_flag_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loopbacksdk_services_custom__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const DEFAULT_LAT = 37.41666;
const DEFAULT_LNG = -122.09106;
const cityToHsyGroupEnum = {
    'Mountain View': 'SouthBayWest',
    'Sunnyvale': 'SouthBayWest',
    'Palo Alto': 'SouthBayWest',
    'East Palo Alto': 'SouthBayWest',
    'Stanford': 'SouthBayWest',
    'Menlo Park': 'SouthBayWest',
    'Cupertino': 'SouthBayWest',
    'Los Gatos': 'SouthBayWest',
    'Los Altos': 'SouthBayWest',
    'Los Altos Hills': 'SouthBayWest',
    'Milpitas': 'SouthBayEast',
    'San Jose': 'SouthBayEast',
    'Saratoga': 'SouthBayEast',
    'Santa Clara': 'SouthBayEast',
};
const hsyGroupEnumToName = {
    SanFrancisco: "三番",
    SouthBayWest: "南湾西",
    SouthBayEast: "南湾东",
    EastBay: "东湾",
    MidPeninsula: '中半岛',
    None: "暂未覆盖"
}; // TODO(zzn): merge with bot code
const countyToHsyGroupEnum = {
    'San Francisco County': 'SanFrancisco',
    'San Mateo County': 'MidPeninsula',
    'Alameda County': 'EastBay',
};
const getHsyGroupEnumFromLocality = function (city, county) {
    let ret = (county == 'Santa Clara County' ?
        cityToHsyGroupEnum[city] : countyToHsyGroupEnum[county]);
    let retFixed = (typeof ret === 'undefined') ? 'None' : ret;
    return retFixed;
};
/**
 * A page contains a map view and a list showing the listings.
 */
let CreationPage = class CreationPage {
    constructor(platform, params, nav, alertCtrl, authService, mapService, flagService, hsyListingApi, hsyUserApi, ref) {
        this.platform = platform;
        this.params = params;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.mapService = mapService;
        this.flagService = flagService;
        this.hsyListingApi = hsyListingApi;
        this.hsyUserApi = hsyUserApi;
        this.ref = ref;
        //noinspection JSUnusedLocalSymbols, JSMismatchedCollectionQueryUpdate
        // TODO(xinbenlv) uncomment this
        this.listingTypeEnums = ['NeedRoommate' /*招租*/, 'NeedRoom' /*求租*/];
        this.hsyGroupEnumOptions = [
            'SanFrancisco',
            'MidPeninsula',
            'SouthBayWest',
            'SouthBayEast',
            'EastBay',
            'ShortTerm',
            'Seattle',
            'TestGroup',
        ];
        this.hsyGroupEnumOptionsMap = {
            'SanFrancisco': '三番',
            'MidPeninsula': '中半岛',
            'SouthBayWest': '南湾西',
            'SouthBayEast': '南湾东',
            'EastBay': '东湾',
            'ShortTerm': '短租',
            'Seattle': '西雅图',
            'TestGroup': '测试',
        };
        this.amenityOptions = [
            '洗衣机', '停车位', '可养宠物'
        ];
        //noinspection JSMismatchedCollectionQueryUpdate used in HTML
        this.dirty = {};
        if (params.data.listing) {
            this.listing = params.data.listing;
        }
        else {
            this.listing = {};
            this.listing.uid = Object(__WEBPACK_IMPORTED_MODULE_2__util_uuid__["a" /* uuid */])();
        }
        if (!this.listing.location) {
            let loc = {
                lat: DEFAULT_LAT,
                lng: DEFAULT_LNG
            };
            this.listing.location = loc;
            this.listing.location_lng = loc.lng;
            this.listing.location_lat = loc.lat;
        }
        if (!this.listing.ownerId) {
            this.listing.owner = {};
            let local = window.localStorage;
            let meId = local['user_id']; // TODO(xinbenlv): use UserService
            this.listing.ownerId = meId;
            this.listing.owner.id = meId;
        }
        if (!this.listing.amenityArray) {
            this.listing.amenityArray = [];
        }
        if (!this.listing.imageIds)
            this.listing.imageIds = [];
    }
    ngOnInit() {
        this.marker = new google.maps.Marker(/*<google.maps.MarkerOptions>*/ {
            position: new google.maps.LatLng(this.listing.location.lat, this.listing.location.lng),
            animation: google.maps.Animation.DROP,
            draggable: true,
        });
        google.maps.event.addListener(this.marker, 'dragend', () => __awaiter(this, void 0, void 0, function* () {
            let location = {
                lat: this.marker.getPosition().lat(),
                lng: this.marker.getPosition().lng()
            };
            this.listing.location = location;
            this.listing.location_lng = location.lng;
            this.listing.location_lat = location.lat;
            let locality = yield this.mapService.getLocality(new google.maps.LatLng(this.listing.location.lat, this.listing.location.lng));
            let hsyGroupEnum = getHsyGroupEnumFromLocality(locality.city, locality.county);
            this.localityText = `${locality.city}, ${locality.zip} (${hsyGroupEnumToName[hsyGroupEnum]})`;
            this.listing.hsyGroupEnum = hsyGroupEnum;
            this.ref.detectChanges();
        }));
    }
    markAllControlsAsDirty() {
        Object.keys(this.hsyListingForm.controls).filter(k => {
            this.hsyListingForm.controls[k].markAsDirty();
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.markAllControlsAsDirty();
            if (this.validate()) {
                this.listing.lastUpdated = new Date();
                this.listing.latestUpdatedOrBump = this.listing.lastUpdated;
                if (!this.listing.ownerId) {
                    let local = window.localStorage;
                    let meId = local['user_id']; // TODO(xinbenlv): use UserService
                    this.listing.ownerId = meId;
                }
                if (this.inTestGroup) {
                    this.listing.hsyGroupEnum = 'TestGroup';
                }
                yield Promise.all([
                    yield this.hsyListingApi.upsert(this.listing).toPromise(),
                    yield this.hsyUserApi.upsert(this.listing.owner).toPromise()
                ]);
                yield this.nav.pop();
            }
            else {
                this.dirty['title'] = true;
                this.dirty['content'] = true;
                this.dirty['listingTypeEnum'] = true;
            }
        });
    }
    validate() {
        return (this.listing.title && this.listing.content && (this.listing.listingTypeEnum != null));
    }
    updateImageIds(imageIds) {
        this.listing.imageIds = imageIds;
    }
    deleteListing() {
        return __awaiter(this, void 0, void 0, function* () {
            let prompt = this.alertCtrl.create({
                title: '确认删除?',
                buttons: [
                    {
                        text: '取消',
                        handler: () => {
                            this.nav.pop(); // alert
                        }
                    },
                    {
                        text: '删除',
                        handler: () => {
                            this.hsyListingApi.deleteById(this.listing.uid).take(1).toPromise().then(() => {
                                this.nav.pop().then(() => {
                                    this.nav.pop();
                                }); // alert
                            });
                        }
                    }
                ]
            });
            yield prompt.present();
        });
    }
    isDebug() {
        return this.flagService.getFlag('debug');
    }
    toggleAmenity(amenity) {
        let array = this.listing.amenityArray;
        if (array.indexOf(amenity) >= 0) {
            this.listing.amenityArray = this.listing.amenityArray.filter(a => a != amenity);
        }
        else {
            this.listing.amenityArray.push(amenity);
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('hsyListingForm'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7__angular_forms__["d" /* NgForm */])
], CreationPage.prototype, "hsyListingForm", void 0);
CreationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'creation-page',template:/*ion-inline-start:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-creation.page.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            创建\n        </ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="save()">保存</button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content class="creation grey-background" id="page-container">\n        <ion-card offset-lg-3 col-lg-6 offset-md-2 col-md-8 >\n            <form #hsyListingForm="ngForm">\n            <ion-item>\n                <ion-label>类型</ion-label>\n                <ion-select interface="popover"\n                            text-right required [(ngModel)]="listing.listingTypeEnum"\n                            name="listingTypeEnum" placeholder="必选">\n                    <ion-option  *ngFor="let v of listingTypeEnums "\n                                 value={{v}}>{{ v | enumMsgPipe }}</ion-option>\n                </ion-select>\n            </ion-item>\n            <ion-item *ngIf="listing.listingTypeEnum == \'NeedRoommate\'"> <!-- 只有招租需要填写 -->\n                <ion-label>地址</ion-label>\n                <ion-input item-right class="address" text-right [(ngModel)]="listing.addressLine" name="addressLine"\n                ></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>城市</ion-label>\n                <ion-input item-right text-right [(ngModel)]="listing.addressCity"\n                           name="addressCity"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>预期价格</ion-label>\n                <ion-input item-right text-right\n                           type="number" min="0"\n                           [(ngModel)]="listing.price" name="price"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>标题</ion-label>\n                <ion-input\n                        item-right text-right required [(ngModel)]="listing.title"\n                        name="title" placeholder="必填"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>详情</ion-label>\n                <ion-textarea item-right text-right required [(ngModel)]="listing.content"\n                              name="content"\n                              placeholder="必填"></ion-textarea>\n\n            </ion-item>\n            <ion-item *ngIf="isDebug()">\n                <ion-label>测试</ion-label>\n                <ion-checkbox item-right text-right fixed color="dark" checked="true"\n                              [(ngModel)]="inTestGroup"\n                              name="inTestGroup"\n                ></ion-checkbox>\n\n            </ion-item>\n\n\n            <ion-item>\n                <ion-label>所在好室友群</ion-label>\n                <ion-select interface="popover"\n                            text-right [(ngModel)]="listing.hsyGroupEnum"\n                            name="type">\n                    <ion-option  *ngFor="let enum of hsyGroupEnumOptions "\n                                 value={{enum}}> {{ hsyGroupEnumOptionsMap[enum] }}\n                    </ion-option>\n                </ion-select>\n            </ion-item>\n            <ion-item>\n                <ion-label>群中昵称</ion-label>\n                <ion-input item-right text-right [(ngModel)]="listing.hsyGroupNick"\n                           name="hsyGroupNick"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>电子邮箱</ion-label>\n                <ion-input item-right text-right [(ngModel)]="listing.owner.contactEmail"\n                           name="contactEmail"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>联系电话</ion-label>\n                <ion-input item-right text-right [(ngModel)]="listing.owner.contactPhone"\n                           name="contactPhone"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>微信号</ion-label>\n                <ion-input item-right text-right [(ngModel)]="listing.owner.weixin"\n                           name="weixin"></ion-input>\n            </ion-item>\n            <ng-container *ngIf="listing.listingTypeEnum == \'NeedRoommate\'"><!-- 只有招租需要填写这段 -->\n                <ion-item>\n                    <ion-label>整租单租</ion-label>\n                    <ion-select item-right interface="popover" text-right\n                                [(ngModel)]="listing.isRentingEntireHouse"\n                                name="isRentingEntireHouse">\n                        <ion-option text-right [value]="true">整房出租</ion-option>\n                        <ion-option text-right [value]="false">单间出租</ion-option>\n                    </ion-select>\n                </ion-item>\n                <ion-item >\n                    <ion-label>卧室数量</ion-label>\n                    <ion-input item-right text-right\n                               type="number"\n                               [(ngModel)]="listing.numBedRoom"\n                    name="numBedRoom"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label>卫生间数量</ion-label>\n                    <ion-input item-right text-right\n                               type="number"\n                               [(ngModel)]="listing.numBathRoom"\n                    name="numBathRoom"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label>设施/须知</ion-label>\n                    <div item-right text-right text-wrap>\n                        <button ion-button small round color="primary"\n                                *ngFor="let o of amenityOptions"\n                                (click)="toggleAmenity(o)"\n                                [outline] = "listing.amenityArray.indexOf(o) < 0">{{o}}</button>\n                    </div>\n                </ion-item>\n            </ng-container>\n            <ion-item>\n                <ion-label>起租时间</ion-label>\n                <ion-datetime item-right text-right displayFormat="YYYY-MM-DD"\n                              min="2013-01-01"\n                              max="2020-01-01"\n                              pickerFormat="YYYY MM DD"\n                              [(ngModel)]="listing.rentalStartDate"\n                name="rentalStartDate"></ion-datetime>\n            </ion-item>\n            <ion-item>\n                <ion-label>终止时间</ion-label>\n                <ion-datetime item-right text-right displayFormat="YYYY-MM-DD"\n                              min="2013-01-01"\n                              max="2020-01-01"\n                              pickerFormat="YYYY MM DD" [(ngModel)]="listing.rentalEndDate"\n                name="rentalEndDate"></ion-datetime>\n            </ion-item>\n            <ion-item *ngIf="flagService.getFlag(\'requireToContact\')">\n                <ion-label>登LinkedIn才可联系我</ion-label>\n                <ion-toggle item-right text-right name="requireToContact"></ion-toggle>\n                <!--TODO(xinbenlv): wire it-->\n            </ion-item>\n            <ion-item>\n                <ion-label>图片</ion-label>\n                <ion-input item-right disabled name="imageBlock"></ion-input>\n            </ion-item>\n            <ion-item>\n                <image-grid\n                        [imageIds]="listing.imageIds"\n                        (updateImageIds)="updateImageIds($event)"\n                        [isEdit]="true"\n                ></image-grid>\n            </ion-item>\n            <ion-row>\n                <button col-6 ion-button block color="secondary" (click)="save()">保存</button>\n                <button col-6 ion-button outline block color="danger" (click)="deleteListing()">删除</button>\n            </ion-row>\n            </form>\n        </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/zzn/ws/haoshiyou-client/haoshiyou/src/pages/listings-tab/listing-creation.page.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_5__services_map_service__["a" /* MapService */],
        __WEBPACK_IMPORTED_MODULE_6__services_flag_service__["a" /* FlagService */],
        __WEBPACK_IMPORTED_MODULE_3__loopbacksdk_services_custom_HsyListing__["a" /* HsyListingApi */],
        __WEBPACK_IMPORTED_MODULE_8__loopbacksdk_services_custom__["a" /* HsyUserApi */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])
], CreationPage);

//# sourceMappingURL=listing-creation.page.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseLoopBackApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_params__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lb_config__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */










/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
let BaseLoopBackApi = class BaseLoopBackApi {
    constructor(http, models, auth, searchParams, errorHandler) {
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    request(method, url, routeParams = {}, urlParams = {}, postBody = {}, pubsub = false, customHeaders) {
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach((key) => {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            console.info('SDK: PubSub functionality is disabled, generate SDK using -io enabled');
        }
        else {
            // Headers to be sent
            let headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            // Authenticate request
            this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            let body;
            let postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            let filter = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (__WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].isHeadersFilteringSet()) {
                    headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    filter = `?filter=${encodeURIComponent(JSON.stringify(urlParams.filter))}`;
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            /**
            CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
            - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
            - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
            if (urlParams.where) {
              headers.append('where', JSON.stringify(urlParams.where));
              delete urlParams.where;
            }
            **/
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            this.searchParams.setJSON(urlParams);
            let request = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Request"](new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
                headers: headers,
                method: method,
                url: `${url}${filter}`,
                search: Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                body: body ? JSON.stringify(body) : undefined,
                withCredentials: __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getRequestOptionsCredentials()
            }));
            return this.http.request(request)
                .map((res) => (res.text() != "" ? res.json() : {}))
                .catch((e) => this.errorHandler.handleError(e));
        }
    }
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    authenticate(url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getAuthPrefix() + this.auth.getAccessTokenId());
        }
    }
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    create(data, customHeaders) {
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders).map((data) => this.model.factory(data));
    }
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    createMany(data, customHeaders) {
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((datum) => datum.map((data) => this.model.factory(data)));
    }
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    findById(id, filter = {}, customHeaders) {
        let _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, _urlParams, undefined, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    find(filter = {}, customHeaders) {
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .map((datum) => datum.map((data) => this.model.factory(data)));
    }
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    exists(id, customHeaders) {
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id }, undefined, undefined, null, customHeaders);
    }
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    findOne(filter = {}, customHeaders) {
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    updateAll(where = {}, data, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders);
    }
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    deleteById(id, customHeaders) {
        return this.request('DELETE', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    count(where = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    }
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    updateAttributes(id, data, customHeaders) {
        return this.request('PUT', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    upsert(data = {}, customHeaders) {
        return this.request('PUT', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    upsertPatch(data = {}, customHeaders) {
        return this.request('PATCH', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    upsertWithWhere(where = {}, data = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    replaceOrCreate(data = {}, customHeaders) {
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    replaceById(id, data = {}, customHeaders) {
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    createChangeStream() {
        let subject = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
        if (typeof EventSource !== 'undefined') {
            let emit = (msg) => subject.next(JSON.parse(msg.data));
            var source = new EventSource([
                __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
                __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    }
};
BaseLoopBackApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__["a" /* SDKModels */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* LoopBackAuth */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__search_params__["a" /* JSONSearchParams */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"],
        __WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__["a" /* SDKModels */],
        __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* LoopBackAuth */],
        __WEBPACK_IMPORTED_MODULE_2__search_params__["a" /* JSONSearchParams */],
        __WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorHandler */]])
], BaseLoopBackApi);

//# sourceMappingURL=base.service.js.map

/***/ })

},[508]);
//# sourceMappingURL=main.js.map