// app/services/auth/auth.ts

import {Storage} from "@ionic/storage";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
import {Injectable, NgZone} from "@angular/core";
import {User} from "../models/models";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Env} from "../app/env";

// Avoid name not found warnings
declare let Auth0Lock:any;
declare let Auth0:any;
declare let console, alert, JSON, Date;
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
    "serverErrorText": "处理服务器请求时出错。",
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
    "serverErrorText": "处理服务器请求时出错。"
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
  private auth0/*:Auth0*/;
  private lock/*:Auth0Lock*/;
  private zoneImpl:NgZone;
  private userSubject:Subject<User>;
  private idToken:string;
  //noinspection JSUnusedLocalSymbols
  private jwtHelper: JwtHelper = new JwtHelper(); // do nothing
  private refreshSubscription: any;

  constructor(zone:NgZone,
              private local:Storage) {
    this.auth0 = new Auth0({
      clientID: Env.configAuth0.clientId,
      domain: Env.configAuth0.accountDomain
    });
    this.lock = new Auth0Lock(
        Env.configAuth0.clientId,
        Env.configAuth0.accountDomain
    );
    this.lock.on('authenticated', authResult => {
      console.log("XXX Successfully logged in");
      this.local.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          alert(err); // TODO(xinbenlv): handle error
        } else {
          // If authentication is successful, save the items
          // in local storage
          console.log(`XXX profile=${profile}`);
          this.local.set('profile', JSON.stringify(profile));
          this.local.set('id_token', this.idToken);
          this.local.set('refresh_token', authResult.refreshToken);
          this.zoneImpl.run(() => this.user = profile);
          // Schedule a token refresh
          this.scheduleRefresh();

          this.userSubject.next(AuthService.createHsyUser(this.user));
        }
      });

    });
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
    return tokenNotExpired('id_token', this.idToken);
  }

  public getUser() {
    return this.user;
  }

  public login() {
    // Show the Auth0 Lock widget
    console.log("XXX start login!");

    this.lock.show({
      auth: {
        redirect: false,
        params: {scope: 'openid offline_access'},
        dict: zhDict,
        icon: 'assets/res/icon.png'
      }
    });
  }

  public logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    this.userSubject.next(null); // logout
    // Unschedule the token refresh
    this.unscheduleRefresh();
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

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    let source = Observable.of(this.idToken).flatMap(
        token => {
          console.log('token here', token);
          // The delay to generate in this case is the difference
          // between the expiry time and the issued at time
          let jwtIat = this.jwtHelper.decodeToken(token).iat;
          let jwtExp = this.jwtHelper.decodeToken(token).exp;
          let iat = new Date(0);
          let exp = new Date(0);

          let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

          return Observable.interval(delay);
        });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.local.get('refresh_token').then(token => {
      this.auth0.refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.local.set('id_token', delegationRequest.id_token);
        this.idToken = delegationRequest.id_token;
      });
    }).catch(error => {
      console.log(error);
    });

  }

  startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = Observable.of(this.idToken).flatMap(
          token => {
            // Get the expiry time to generate
            // a delay in milliseconds
            let now: number = new Date().valueOf();
            let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
            let exp: Date = new Date(0);
            exp.setUTCSeconds(jwtExp);
            let delay: number = exp.valueOf() - now;

            // Use the delay in a timer to
            // run the refresh at the proper time
            return Observable.timer(delay);
          });

      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() => {
        this.getNewJwt();
        this.scheduleRefresh();
      });
    }
  }
}
