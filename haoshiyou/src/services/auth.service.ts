// app/services/auth/auth.ts

import {tokenNotExpired, JwtHelper} from "angular2-jwt";
import {Injectable, NgZone} from "@angular/core";
import {User} from "../models/models";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Env} from "../app/env";
import {ToastController} from "ionic-angular";

// Avoid name not found warnings
declare let Auth0Lock:any;
declare let Auth0:any;
declare let console, alert, JSON, Date;
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
    magicLink: "已向您发送链接<br />到 %s 登录", // This one needs review
    signUp: "感谢您的注册。"
  },
  blankErrorHint: "不能为空",
  codeInputPlaceholder: "您的代码",
  databaseEnterpriseLoginInstructions: "",
  databaseEnterpriseAlternativeLoginInstructions: "或",
  databaseSignUpInstructions: "",
  databaseAlternativeSignUpInstructions: "或",
  emailInputPlaceholder: "yours@example.com",
  enterpriseLoginIntructions: "请用您的企业账号登录",  // This one needs review
  enterpriseActiveLoginInstructions: "请输入您的企业账号 %s。",  // This one needs review
  failedLabel: "失败!",
  forgotPasswordAction: "忘记您的密码？",
  forgotPasswordInstructions: "请输入您的邮箱，我们将为你发送重置密码的邮件。",
  forgotPasswordSubmitLabel: "发电子邮件", // needs review
  invalidErrorHint: "错误",
  lastLoginInstructions: "上次登陆的信息为",
  loginAtLabel: "登录到 %s",
  loginLabel: "登录",
  loginSubmitLabel: "登录", // needs review
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
  passwordlessEmailAlternativeInstructions: "您还可以通过邮箱登录<br>或者创建账号", // This one needs review
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
  signUpSubmitLabel: "注册", // needs review
  signUpTerms: "",
  signUpWithLabel: "通过 %s 注册",
  socialLoginInstructions: "",
  socialSignUpInstructions: "",
  ssoEnabled: "单点登录已激活",
  submitLabel: "提交", // needs review
  unrecoverableError: "出现错误。<br />请联系技术人员。",
  usernameFormatErrorHint: "请使用%d-%d个字母, 数字或 \"_\"的组合",
  usernameInputPlaceholder: "您的用户名",
  usernameOrEmailInputPlaceholder: "用户名/邮箱",
  title: "好室友™",
  welcome: "欢迎 %s!",
  windowsAuthInstructions: "您已连接到组织网络&hellip;",
  windowsAuthLabel: "Windows认证"
};
@Injectable()
export class AuthService {

  public user:Object;
  private auth0/*:Auth0*/;
  private lock/*:Auth0Lock*/;
  private zoneImpl:NgZone;
  private userSubject:Subject<User>;
  private idToken:string;
  private local = window.localStorage;
  //noinspection JSUnusedLocalSymbols
  private jwtHelper: JwtHelper = new JwtHelper(); // do nothing
  private refreshSubscription: any;

  constructor(zone:NgZone,
              private toastCtrl: ToastController) {
    this.auth0 = new Auth0({
      clientID: Env.configAuth0.clientId,
      domain: Env.configAuth0.accountDomain
    });
    this.lock = new Auth0Lock(
        Env.configAuth0.clientId,
        Env.configAuth0.accountDomain,
        {
          auth: {
            redirect: false, // For cordova to work it has to be false
            params: {
              scope: 'openid email offline_access' // Learn about scopes: https://auth0.com/docs/scopes
            }
          },
          theme: {
            logo: "assets/res/icon.png",
          },
          languageDictionary: zhDict,
          autoclose: true
        }
    );

    this.lock.on('authenticated_error', (err) => {
      this.showLoginErrorToast(err);
    });
    this.lock.on('authenticated', authResult => {
      this.local.setItem('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          alert(err); // TODO(xinbenlv): handle error
        } else {
          // If authentication is successful, save the items
          // in local storage
          this.local.setItem('profile', JSON.stringify(profile));
          this.local.setItem('id_token', this.idToken);
          this.local.setItem('refresh_token', authResult.refreshToken);
          this.zoneImpl.run(() => this.user = profile);
          // Schedule a token refresh
          this.scheduleRefresh();

          this.userSubject.next(AuthService.createHsyUser(this.user));
        }
      });

      this.showLoginSuccessToast();
    });
    this.zoneImpl = zone;
    this.userSubject = new Subject<User>();
    // If there is a profile saved in local storage
    let profile = this.local.getItem('profile');
    if (profile != null && profile.length > 0) {
      this.user = JSON.parse(profile);
      this.userSubject.next(AuthService.createHsyUser(this.user));
    }

    this.idToken = this.local.getItem('id_token');
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired('id_token', this.idToken);
  }

  public getUser() {
    return this.user;
  }

  public login() {

    this.lock.show({autoclose: true});
  }

  public logout() {
    this.local.removeItem('profile');
    this.local.removeItem('id_token');
    this.local.removeItem('refresh_token');
    this.idToken = null;
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
    let token = this.local.getItem('refresh_token');
    this.auth0.refreshToken(token, (err, delegationRequest) => {
      if (err) {
        alert(err);
      }
      this.local.setItem('id_token', delegationRequest.id_token);
      this.idToken = delegationRequest.id_token;
    });
  }

  private showLoginSuccessToast() {
    let toast = this.toastCtrl.create({
      message: '登录成功!',
      duration: 5000
    });
    toast.present();
  }
  private showLoginErrorToast(error) {
    let toast = this.toastCtrl.create({
      message: `登录失败!原因: ${error}`,
      duration: 5000
    });
    toast.present();
  }
}
