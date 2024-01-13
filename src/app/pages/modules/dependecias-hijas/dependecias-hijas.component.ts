import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependencie } from 'src/app/models/Dependencie.model';
import { ApiService } from 'src/app/services/api/api.service';
import { Modal } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dependecias-hijas',
  templateUrl: './dependecias-hijas.component.html',
  styleUrls: ['./dependecias-hijas.component.scss']
})
export class DependeciasHijasComponent {

  dependenciaForm: FormGroup ;
  dependencia = new Dependencie;
  dependenciaAux = new Dependencie;
  idDependencia: string = '';
  listDepencias: Dependencie[] = [];
  modal: any;

  constructor(private api:ApiService, private route: ActivatedRoute, private fb: FormBuilder){
    this.dependenciaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.paramMap.subscribe(params => {
      this.idDependencia = params.get('id')!;
      console.log(this.idDependencia); // Mostrar el valor de 'id' en la consola
    });

    this.buscarDependencia();
    this.getDependencias();

    const targetEl = document.getElementById('crud-modal');
    this.modal = new Modal(targetEl);

  }

  async buscarDependencia(){
    (await this.api.consulta('dependencies/'+this.idDependencia ,'get')).subscribe((resp) => {

      this.dependencia = resp['data'];
      console.log(this.dependencia);
    });
  }

  async getDependencias() {
    (await this.api.consulta('dependencies?dependencie_id='+this.idDependencia, 'get')).subscribe((resp) => {
      console.log(resp);
      console.log(resp['data']['data']);
      this.listDepencias = resp['data']['data'];
    });
  }

  abrirModal(param?: Dependencie){
    if(param){
      this.dependenciaAux = param;
    }else{
      this.dependenciaAux.dependencie_id = this.dependencia.id;
    }

    this.modal.show();
  }

  async submitForm(){
    this.dependenciaAux.level = this.dependencia.level + 1;
    console.log(this.dependenciaAux);
    if (this.dependenciaAux.id == 0) {
      (await this.api.consulta('dependencies', 'post', this.dependenciaAux)).subscribe((resp) => {
        this.getDependencias();
        this.cerrarModal();
      });
    } else {
      (await this.api.consulta('dependencies/'+this.dependenciaAux.id, 'put', this.dependenciaAux)).subscribe((resp) => {
        this.getDependencias();
        this.cerrarModal();
      });
    }

  }

  cerrarModal(){
    this.dependenciaAux = new Dependencie;
    this.modal.hide();
  }

  async eliminarDependencia(id: number){
    (await this.api.consulta('dependencies/'+id, 'delete')).subscribe((resp) => {
      console.log(resp);
      this.getDependencias();
    });
  }
}
