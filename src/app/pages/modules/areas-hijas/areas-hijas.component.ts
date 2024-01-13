import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'flowbite';
import { Area } from 'src/app/models/Area.model';
import { Dependencie } from 'src/app/models/Dependencie.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-areas-hijas',
  templateUrl: './areas-hijas.component.html',
  styleUrls: ['./areas-hijas.component.scss']
})
export class AreasHijasComponent {

  listDepencias: Dependencie[] = [];
  dependenciaForm: FormGroup ;
  area = new Area;
  areaAux = new Area;
  idArea: string = '';
  listAreas: Area[] = [];
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
      this.idArea = params.get('id')!;
      console.log(this.idArea); // Mostrar el valor de 'id' en la consola
    });

    this.getDependencias();
    this.buscarArea();
    this.getAreas();

    const targetEl = document.getElementById('crud-modal');
    this.modal = new Modal(targetEl);

  }

  async buscarArea(){
    (await this.api.consulta('areas/'+this.idArea ,'get')).subscribe((resp) => {

      this.area = resp['data'];
      console.log(this.area);
    });
  }

  async getAreas() {
    (await this.api.consulta('areas?area_id='+this.idArea, 'get')).subscribe((resp) => {
      console.log(resp);
      console.log(resp['data']['data']);
      this.listAreas = resp['data']['data'];
    });
  }

  async getDependencias() {
    (await this.api.consulta('dependencies', 'get')).subscribe((resp) => {
      console.log(resp);
      console.log(resp['data']['data']);
      this.listDepencias = resp['data']['data'];
    });
  }

  abrirModal(param?: Area){
    if(param){
      this.areaAux = param;
    }else{
      this.areaAux.area_id = this.area.id;
    }

    this.modal.show();
  }

  async submitForm(){
    this.areaAux.level = this.area.level + 1;
    console.log(this.areaAux);
    if (this.areaAux.id == 0) {
      (await this.api.consulta('areas', 'post', this.areaAux)).subscribe((resp) => {
        this.getAreas();
        this.cerrarModal();
      });
    } else {
      (await this.api.consulta('areas/'+this.areaAux.id, 'put', this.areaAux)).subscribe((resp) => {
        this.getAreas();
        this.cerrarModal();
      });
    }

  }

  cerrarModal(){
    this.areaAux = new Area;
    this.modal.hide();
  }

  async eliminarDependencia(id: number){
    (await this.api.consulta('areas/'+id, 'delete')).subscribe((resp) => {
      console.log(resp);
      this.getAreas();
    });
  }
}
