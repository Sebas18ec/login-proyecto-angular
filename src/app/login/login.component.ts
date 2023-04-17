import { Component } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  emisores: any;
  selectedEmisor: string;
  mensajeError: any;
  username!: string;  
  password!: string; 
  emisorComp: any; 
  logoUrl:any;
   
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) { 
    this.selectedEmisor= '';
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  

  }

  ngOnInit() {
    this.http.get<any>('api/ControladorAPI/api/v1/emisores')
      .subscribe((data: any[]) => {
        this.emisores = data.map(emisor => emisor.NombreEmisor);
        console.log(this.emisores); 
      });
  }
  

  onChangeEmisor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const emisorId = target.options[selectedIndex].value;
    const emisorNombre = target.options[selectedIndex].textContent;
    console.log('Emisor seleccionado:', emisorId);
    console.log('Nombre del emisor seleccionado:', emisorNombre);
    this.emisorComp = emisorNombre;
    this.selectedEmisor = emisorId;
  }

  onSubmit() {


    if (!this.username || !this.password || !this.emisorComp) {
      alert('ERROR');
      return;
    }
    else{
      const loginData = {
        usuario: this.username,
        contrasena: this.password
      };
      
      
      this.http.post('/api/ControladorAPI/login', loginData)
        .subscribe(response => {
          
        const data = JSON.stringify(response);
        const responseObj = JSON.parse(data);
          
        const emisorData = {
        nombre: responseObj[0].NOMBREEMISOR,
        ruc: responseObj[0].RucUsuario,
      };
      if (this.emisorComp === emisorData.nombre) {
        alert('¡Inicio de sesión exitoso!');
        this.emisorService.updateEmisorData(emisorData);
        this.router.navigate(['/home']); // aquí se navega a la ruta /home
  
      } else {
        // mostrar mensaje de error o hacer otra acción
        alert('¡Error al iniciar sesion!');
        
      }
  
  
        }, error => {
          console.log(error);
          alert('¡Inicio de sesión fallido!');
        });
    }
  
    
    
  }
  
  
  
}