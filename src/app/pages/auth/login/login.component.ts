import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup ;
  private localStorageKey = 'user';
  modal: any;
  mensaje: string = "";

  constructor(private router: Router,private fb: FormBuilder,private api: ApiService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const targetEl = document.getElementById('popup-modal');
    this.modal = new Modal(targetEl);
  }

  async login(){
    if (this.loginForm.valid) {
      //let inputEmail: string = this.loginForm.controls['email'].value;

      var data = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      };

      (await this.api.consulta('login', 'post', data)).subscribe((resp) => {

        //if (resp.statusCode == 200) {
          localStorage.setItem(this.localStorageKey, JSON.stringify(resp));
          this.router.navigate(['/']);
        /*}else{
          this.mensaje = "Credenciales Invalidas";
          this.modal.show();
        }*/

      }, (error) => {
        // Resto de la lógica de manejo de errores
        this.mensaje = "Credenciales Invalidas";
          this.modal.show();
      });
    }
  }

  cerrarModal(){

    this.modal.hide();
  }
}
