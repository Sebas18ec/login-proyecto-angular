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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('api/ControladorAPI/api/v1/emisores')
      .subscribe(data => {
        this.emisores = data;
        console.log(this.emisores); 
      });
  }
/*  
  emisores: any[] = [];
  selectedEmisor: any;
  username: string = '';
  password: string = '';
  

  constructor(private http: HttpClient) { }

  emisorSeleccionado(emisor: any) {
    this.selectedEmisor = emisor;
  }
  

  getEmisores() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<any>('api/ControladorAPI/api/v1/emisores', { headers })
  .subscribe(data => {
    this.emisores = data.map(emisor => emisor.nombreEmisor);
  });

  }
  
  ngOnInit() {
    this.getEmisores();
    
    
  }
  
  */

  onSubmit() {
    // Aquí iría la lógica para validar el usuario y la contraseña ingresados
  }
}
