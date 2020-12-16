import { Component, OnInit } from '@angular/core';
import { Register } from '../../models/register';
import { IpServiceService } from '../../services/ip-service.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register = new Register();
  category = ['Terrorism', 'Pornography', 'Investment', 'Phishing', 'Spam', 'RGPD'];
  ipAddress:string; 
  constructor(private ip:IpServiceService, private _registerService:RegisterService) { }

  ngOnInit(): void {

    this.getIP();
  }

  async guardar(){

    const idProcesado = await this.saveRegister();
        
    if (idProcesado != 0) {
          this.register=new Register();
    }else{

      alert("Error in load the form");
    }

   /*  if (idProcesado != 0) {
      this.persona.idProceso =Number(idProcesado);
      this.persona.dni=Number(this.dniWizard.dni);
    }else{
      this.toastr.error('Hubo un error al procesar su solicitud, pruebe mas tarde!', 'Error', {
        timeOut: 8000
      });          
      return; */
    




  }

  async saveRegister(): Promise<number>{
    try{
     let _register = new Register(this.register.email,this.register.url,this.register.category,this.register.details);
     await this._registerService.postRegister(_register);  
     return Promise.resolve(1);
    }catch (ex){
      //debería mostrar componente error
      console.log("Error" + ex);
      return Promise.resolve(0);
   
    }  
     
   }

   getIP()  
   {  
     this.ip.getIPAddress().subscribe((res:any)=>{  
       this.ipAddress=res.ip;  
       console.log(this.ipAddress);
     });  
   }  

/*  async saveDni(): Promise<number>{
   try{
    let dni = new Dni(Number(this.dniWizard.dni),Number(this.dniWizard.validarDni),this.ipAddress);
     const numberProcess = await this._dniService.postDni(dni);  
     return Promise.resolve(numberProcess);
     
   }catch (ex){
     //debería mostrar componente error
     console.log("Error" + ex);
     return Promise.resolve(0);
  
   }  
    
  } */
}
