import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  emisores: any;
  selectedEmisor: any;
  usuario: any;
  contrasena: any;
  mensajeError: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('api/ControladorAPI/api/v1/emisores')
      .subscribe(data => {
        this.emisores = data;
        console.log(this.emisores); 
      });
  }


  onSubmit() {
    const loginData = {
      username: this.usuario,
      password: this.contrasena
    };
    console.log(this.usuario,this.contrasena);
    this.http.post('/api/ControladorAPI/login', loginData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }
  
}
