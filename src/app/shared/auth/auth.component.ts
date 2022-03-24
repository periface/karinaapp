import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../components/base-component.component';
import { AuthService } from '../services/auth/auth.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import validationMessages from '../validation-messages/validation-messages';
import { ConfirmedValidator } from './confirm.validation';
import { FormHelper } from './forms-helper';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseComponent implements OnInit {
  showRegister = false;
  registerForm: FormGroup;
  recoverForm: FormGroup;
  currentActiveForm: FormGroup | undefined;
  returnUrl: string | undefined;
  loginForm: FormGroup;
  validationMessages = validationMessages.validationMessages;
  formActive = 'login';
  btnTxt = 'Iniciar Sesión';
  noAccountMsg = '¿No tienes cuenta?';
  callToAction = 'Registrate';
  topTxt = 'INICIO DE SESIÓN';
  registerAttempt: any;
  loading = false;
  ip: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    super();

    this.loginForm = this.formBuilder.group(FormHelper.LoginForm);

    this.registerForm = this.formBuilder.group(FormHelper.RegisterForm, {
      validator: ConfirmedValidator('contrasena', 'confirmarContrasena'),
    });
    this.recoverForm = this.formBuilder.group(FormHelper.RecoverForm);
    this.currentActiveForm = this.loginForm;
    this.returnUrl = this.activatedRoute.snapshot.params.returnUrl;
    this.registerAttempt = this.activatedRoute.snapshot.params.registerAttempt;
  }
  async ngOnInit() {
    this.ip = await this.getIPAddress();
    console.log(this.localStorageService.userData);
    if (this.localStorageService.userData) {
      if (this.localStorageService.userData.registroFinalizado) {
        this.redirect();
      } else {
        this.router.navigateByUrl('registration');
      }
    }
  }

  async handleLoginForm() {
    this.loading = true;
    const text = this.btnTxt;
    switch (this.formActive) {
      case 'login':
        this.btnTxt = 'Iniciando sesión...';

        await this.waitFor(2000);
        await this.login();
        break;
      case 'register':
        this.btnTxt = 'Creando usuario...';

        await this.waitFor(2000);
        await this.register();
        break;
      case 'recover':
        await this.waitFor(2000);
        await this.recover();
        break;
      default:
        return;
    }
    this.loading = false;
    this.btnTxt = text;
  }
  async login() {
    try {
      const userCredentials = await this.authService.emailPasswordLogin({
        email: this.loginForm.value.correo,
        password: this.loginForm.value.contrasena,
      });
      if (userCredentials) {
        if (userCredentials.registroFinalizado) {
          this.redirect();
        } else {
          this.router.navigateByUrl('registration');
        }
      } else {
        this.showMessage('Error de inicio de sesión');
        return;
      }
    } catch (error: any) {
      console.log(error);
      this.showMessage(error.toString());
    }
  }
  getFormActive() {
    switch (this.formActive) {
      case 'login':
        this.currentActiveForm = this.loginForm;
        return this.loginForm;
      case 'register':
        this.currentActiveForm = this.registerForm;
        return this.registerForm;
      case 'recover':
        this.currentActiveForm = this.recoverForm;
        return this.recoverForm;
      default:
        this.currentActiveForm = this.loginForm;
        return this.loginForm;
    }
  }
  async register() {
    try {
      const userCredentials = await this.authService.createEmailPasswordAccount(
        {
          email: this.registerForm.value.correo,
          password: this.registerForm.value.contrasena,
          nombreCompleto: this.registerForm.value.nombre,
          registerDate: new Date(Date.now()),
          registerIp: this.ip,
        }
      );
      if (userCredentials) {
        this.router.navigateByUrl('registration');
      } else {
        this.showMessage('No se encontro al usuario');
      }
    } catch (error: any) {
      this.showMessage(error);
    }
  }
  redirect() {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigate(['main-app', 'tab1']);
    }
  }
  async recover() {
    try {
      await this.authService.sendPasswordRecoveryMail(
        this.recoverForm.value.correo
      );
      this.showMessage(
        'Correo de recuperación enviado: ' + this.recoverForm.value.correo
      );
      this.toggleForm('login');
    } catch (error) {
      this.showMessage(JSON.stringify(error));
    }
  }
  toggleForm(form: string) {
    this.formActive = form;
    switch (form) {
      case 'login':
        this.btnTxt = 'Iniciar Sesión';
        this.noAccountMsg = '¿No tienes cuenta?';
        this.callToAction = 'Registrate';
        this.topTxt = 'INICIO DE SESIÓN';
        break;
      case 'register':
        this.btnTxt = 'Registrarse';
        this.callToAction = 'Inicia sesión';
        this.noAccountMsg = '¿Ya tienes cuenta?';
        this.topTxt = 'REGISTRO';
        break;
      case 'recover':
        this.btnTxt = 'Enviar correo de recuperación';
        this.callToAction = 'Inicia sesión';
        this.noAccountMsg = '¿Ya tienes cuenta?';
        this.topTxt = 'RECUPERACIÓN DE CONTRASEÑA';
        break;
      default:
        this.btnTxt = 'Iniciar Sesión';
        this.noAccountMsg = '¿No tienes cuenta?';
        this.callToAction = 'Registrate';
        this.topTxt = 'INICIO DE SESIÓN';
        break;
    }
  }
  handleError(error: any) {
    //console.log(error);
  }
  async useExternal(external: string) {
    try {
      const data = await this.authService.signInWith({
        external,
        ip: this.ip,
      });
      if (data) {
        if (data.registroFinalizado) {
          this.redirect();
        } else {
          this.router.navigateByUrl('registration');
        }
      } else {
        this.showMessage('Error de inicio de sesión');
        return;
      }
    } catch (error: any) {
      this.showMessage(error);
    }
  }
}
