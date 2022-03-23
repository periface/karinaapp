/* eslint-disable @typescript-eslint/naming-convention */
import { Validators } from '@angular/forms';

export class FormHelper {
  static LoginForm = {
    correo: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
    ],
    contrasena: ['', Validators.required],
  };
  static RegisterForm = {
    nombre: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    correo: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
    ],
    contrasena: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ],
    ],
    confirmarContrasena: ['', [Validators.required]],
  };
  static RecoverForm = {
    correo: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]+$'),
      ],
    ],
  };
}
