import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'flowbite';
import { Area } from 'src/app/models/Area.model';
import { Dependencie } from 'src/app/models/Dependencie.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {

  listDepencias: Dependencie[] = [];
  listAreas: Area[] = [];
  areaAux = new Area;
  modal: any;

  constructor(private api:ApiService, private router: Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDependencias();
    this.getAreas();
    const targetEl = document.getElementById('crud-modal');
    this.modal = new Modal(targetEl);
  }

  async getAreas() {
    (await this.api.consulta('areas', 'get')).subscribe((resp) => {
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
      this.areaAux = param!;
    }else{
      this.areaAux.level = '1';
    }

    this.modal.show();
  }

  async submitForm(){
    //this.areaAux.level = this.area.level + 1;
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
}
