import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Dependencie } from 'src/app/models/Dependencie.model';
import { Router } from '@angular/router';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-dependencias',
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.scss']
})
export class DependenciasComponent {

  listDepencias: Dependencie[] = [];
  dependenciaAux = new Dependencie;
  modal: any;

  constructor(private api:ApiService, private router: Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getDependencias();
    const targetEl = document.getElementById('crud-modal');
    this.modal = new Modal(targetEl);
  }



  async getDependencias() {
    (await this.api.consulta('dependencies', 'get')).subscribe((resp) => {
      console.log(resp);
      console.log(resp['data']['data']);
      this.listDepencias = resp['data']['data'];
    });
  }

  abrirModal(param?: Dependencie){
    //if(param){
      this.dependenciaAux = param!;
    //}else{
      //this.dependenciaAux.dependencie_id = this.dependencia.id;
    //}

    this.modal.show();
  }

  async submitForm(){
    //this.dependenciaAux.level = this.dependencia.level + 1;
    console.log(this.dependenciaAux);
    (await this.api.consulta('dependencies/'+this.dependenciaAux.id, 'put', this.dependenciaAux)).subscribe((resp) => {
      this.getDependencias();
      this.cerrarModal();
    });

  }

  cerrarModal(){
    this.dependenciaAux = new Dependencie;
    this.modal.hide();
  }

}
