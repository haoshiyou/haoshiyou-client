// app/services/auth/auth.ts

import {Storage, LocalStorage} from "ionic-angular";
import {AuthHttp, JwtHelper, tokenNotExpired} from "angular2-jwt";
import {Injectable, NgZone, Inject} from "@angular/core";
import {IThreadService} from "./chats/thread.service";
import {User} from "../models/models";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {ICredentialService} from "./credential.service";
import {LogService, loggerToken} from "./log.service";
import {Logger} from "log4javascript/log4javascript";

// Avoid name not found warnings
declare var Auth0Lock:any;

// TODO(xinbenlv): update Auth0 once my pull request is pulled. https://github.com/auth0/lock/pull/447
let zhDict = {
  "//": "This is an automatic translation. Help us to improve it.",
  "loadingTitle": "请稍候。。。",
  "close": "关闭",
  "noConnectionError": "网络连接已中断。",
  "signin": {
    "title": "登录",
    "action": "登录",
    "all": "不是您的账户?",
    "strategyEmailEmpty": "电子邮件是空的。",
    "strategyEmailInvalid": "电子邮件是无效的。",
    "strategyDomainInvalid": "指定域 {domain} 无效。",
    "signinText": "登录",
    "signupText": "注册",
    "forgotText": "忘记密码？",
    "emailPlaceholder": "电子邮件",
    "usernamePlaceholder": "用户名",
    "passwordPlaceholder": "密码",
    "separatorText": "或",
    "serverErrorText": "处理所示的标志时出错。",
    "returnUserLabel": "上次登录账户为：",
    "wrongEmailPasswordErrorText": "电子邮件或密码不匹配。",
    "popupCredentials": "请在弹出窗口内登录",
    "or": "...或使用登录",
    "loadingMessage": "连接 {connection}..."
  },
  "signup": {
    "description": "",
    "title": "注册",
    "action": "注册",
    "signinText": "登录",
    "signupText": "注册",
    "emailPlaceholder": "电子邮件",
    "passwordPlaceholder": "密码",
    "cancelAction": "取消",
    "headerText": "请输入您的电子邮件和密码",
    "footerText": "",
    "signupOnSSODomainErrorText": "指定此域 {domain} 已配置为单一登录，且您不能创建一个帐户。请尝试登录其他方法。",
    "serverErrorText": "处理标志向上时出错。"
  },
  "newReset": {
    "title": "重置密码",
    "action": "发送",
    "emailPlaceholder": "电子邮件",
    "cancelAction": "取消",
    "footerText": "",
    "successText": "我们刚刚已经向您发送一封电子邮件，请查看以重置您的密码。",
    "headerText": "请输入您的电子邮件地址。我们会向您发送电子邮件重设密码。",
    "serverErrorText": "处理重置密码时出错。",
    "userDoesNotExistErrorText": "用户不存在。",
    "tooManyRequestsErrorText": "您已达密码重置尝试的极限。请稍候再试。"
  },
  "reset": {
    "title": "更改密码",
    "action": "发送",
    "emailPlaceholder": "电子邮件",
    "passwordPlaceholder": "新密码",
    "repeatPasswordPlaceholder": "再次输入新密码",
    "cancelAction": "取消",
    "successText": "我们刚刚已经向您发送一封电子邮件，重置您的密码。",
    "enterSamePasswordText": "请输入相同的密码。",
    "headerText": "请输入您的电子邮件和新的密码。我们将向您发送邮件以确认密码更改。",
    "serverErrorText": "处理重置密码时出错。",
    "userDoesNotExistErrorText": "用户不存在。",
    "tooManyRequestsErrorText": "您已达密码重置尝试的极限。重试前请稍候。",
    "invalidPassword": "密码太弱。"
  }
};
@Injectable()
export class AuthService {

  public user:Object;
  private jwtHelper:JwtHelper = new JwtHelper();
  private lock;
  private local:Storage = new Storage(LocalStorage);
  private refreshSubscription:any;
  private zoneImpl:NgZone;
  private userSubject:Subject<User>;

  constructor(private authHttp:AuthHttp, zone:NgZone,
              private threadService:IThreadService,
              private credentialService:ICredentialService,
              private logService:LogService,
              @Inject(loggerToken) private logger:Logger) {
    this.lock = new Auth0Lock(
        this.credentialService.get("AUTH0_CLIENT_ID"),
        this.credentialService.get("AUTH0_ACCOUNT_DOMAIN")
    );
    this.zoneImpl = zone;
    this.userSubject = new Subject<User>();
    // If there is a profile saved in local storage
    this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
      this.userSubject.next(AuthService.createHsyUser(this.user));
    }).catch(error => {
      console.log(error);
    });
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public getUser() {
    return this.user;
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device',
      },
      dict: zhDict,
      icon: 'res/icon.png'
    }, (err, profile, token, accessToken, state, refreshToken) => {
      if (err) {
        alert(err); // TODO(xinbenlv): handle error
      } else {
        // If authentication is successful, save the items
        // in local storage
        this.local.set('profile', JSON.stringify(profile));
        this.local.set('id_token', token);
        this.local.set('refresh_token', refreshToken);
        this.zoneImpl.run(() => this.user = profile);
        this.userSubject.next(AuthService.createHsyUser(this.user));
        this.logService.logEvent("authService", "login");
      }
    });
  }

  public logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    this.userSubject.next(null); // logout
    this.logService.logEvent("authService", "logout");
  }

  /**
   * Expose as an observable.
   * @returns {Subject<User>}
   */
  public userObservable():Observable<User> {
    return this.userSubject;
  }

  public static createHsyUser(user:Object):User {
    return <User> {
      id: btoa(user['email'])/* using BASE64 email as unique userId*/,
      name: user['name'],
      avatarSrc: user['picture']
    };
  }
}