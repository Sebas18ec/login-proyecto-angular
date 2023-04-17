import { Component } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  emisores: any;
  selectedEmisor: any;
  mensajeError: any;
  username!: string;  
  password!: string;  
  
   
  constructor(private http: HttpClient,private emisorService: EmisorService,private router: Router) { }

  ngOnInit() {
    this.http.get<any>('api/ControladorAPI/api/v1/emisores')
      .subscribe(data => {
        this.emisores = data;
        console.log(this.emisores); 
      });
  }


  onSubmit() {
    if (!this.username || !this.password) {
      alert('Por favor, ingrese un usuario y contraseña');
      return;
    }
  
    const loginData = {
      usuario: this.username,
      contrasena: this.password
    };
    
    console.log(loginData.usuario,loginData.contrasena);
    this.http.post('/api/ControladorAPI/login', loginData)
      .subscribe(response => {
        console.log(response);
        alert('¡Inicio de sesión exitoso!');
      
      const data = JSON.stringify(response);
      const responseObj = JSON.parse(data);
    
      const emisorData = {
      nombre: responseObj[0].NOMBREEMISOR,
      ruc: responseObj[0].RucUsuario,
    };
    

    this.emisorService.updateEmisorData(emisorData);
    this.router.navigate(['/home']); // aquí se navega a la ruta /home


      }, error => {
        console.log(error);
        alert('¡Inicio de sesión fallido!');
      });
  }
  
  
  
}