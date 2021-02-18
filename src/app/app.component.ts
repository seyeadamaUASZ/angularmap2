//app.component.ts
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Chart } from 'angular-highcharts';
import { ApiService } from './services/api.service';

export interface PeriodicElement {
  nomcom: string;
  numsiret: string;
  typeetab: string;
  categorie: string;
  raison:string;
} 

const ELEMENT_DATA: PeriodicElement[] = [
  {nomcom: "Sen Santé", numsiret: 'A15RT80', typeetab:'Privé', categorie: 'Cabinet dentaire',raison:'Raison sociale'},
  {nomcom: "Centre Fadhiou", numsiret: 'B41YIIZ', typeetab:'Public', categorie: 'Centre hospitalier',raison:'Raison sociale'},
  {nomcom: "Sahitna", numsiret: 'A15RT80', typeetab:'Privé', categorie: 'Cabinet généraliste',raison:'Raison sociale'},
  {nomcom: "Aféhanay", numsiret: 'C56TRE', typeetab:'Privé', categorie: 'Cabinet dentaire',raison:'Raison sociale'},
  {nomcom: "Sen Santé", numsiret: 'A15RT80', typeetab:'privé', categorie: 'Cabinet dentaire',raison:'Raison sociale'},
];
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  // google maps zoom level
  title='angularmap2'
  zoom: number = 8;
  pays:any;
  markers=[];
  communes:any;
  dataSource:any;
  countTotal:any=0;
  countEtabPublic:any=0;
  countEtabPrive:any=0;
  chart1:any;
  chart:any;
  chart2:any;
  identifiant:any;



  displayedColumns:string[]=['nomcom', 'numsiret', 'typeetab', 'categorie','raison', 'action'];
  dataEtablissements:any;
  constructor(private api:ApiService){
     this.allPays();
     //this.drawing();
  }

  ngOnInit(){
    $('button').click(function(){
      alert('Wass up!');
  });

  $('[id*=region_').on('click', function(){

    console.log($(this));

    //je recupere la region et la mets dans une variable region
    let region = $(this);
    let regionId = $(this)['0'].id;
    let allRegion = $('[id*=region_');

    //console.log(regionId);

    /*
    lors du clic, toutes les regions sont blanches
    seule la region selectionnes devient verte
    */
   allRegion.css("fill", "white");
   region.css("fill", "#00ff00");

   regionId = regionId.replace('region_', '');

   let boucle = true;

   do{
        regionId = regionId.replace('_', ' ');
        if(regionId.indexOf('_')==-1)
            boucle=false;
   }while(boucle);

   $('#infosRegion').text(regionId);

   console.log(regionId);
   
});

$('[id*=region_').on('mouseover', function(){

});

}
  

  allEtablissements(id){
    this.api.allEtablissements(id)
    .subscribe(resp=>{
       this.dataEtablissements=resp;
       this.dataSource=this.dataEtablissements;
    },err=>{
      console.log(err);
    })
  }
  
  countEtablissementTotal(id){
    this.api.countEtablissementsTotal(id)
    .subscribe(resp=>{
      this.countTotal=resp;
    },err=>{
      console.log(err);
    })
  }

  countEtablissementPublic(id){
    this.api.countEtablissementsPublics(id)
    .subscribe(resp=>{
      this.countEtabPublic=resp;
    },err=>{
      console.log(err);
    })
  }

  countEtablissementPrives(id){
    this.api.countEtablissementPrives(id)
    .subscribe(resp=>{
       this.countEtabPrive=resp;
    },err=>{
      console.log(err);
    })
  }




  changeWebsite(e) {
    console.log(e.target.value);
    let id=e.target.value;
    this.identifiant=id;
    this.api.communeById(id)
    .subscribe(resp=>{
      this.communes=resp;
      console.log(this.communes);
      for (var i=0;i<this.communes.length;i++){
        console.log("communes  "+ this.communes[i].latitude)
        // this.markers.push({
        //   "lat":this.communes[i].latitude,
        //   "lng":this.communes[i].longitude,
        //   "label":'A',
        //   "draggable": true
        // })
      }
      console.log(this.markers)
    })
  }

  allPays(){
    this.api.allPays()
    .subscribe(resp=>{
       this.pays=resp;
       console.log(resp);
    },err=>{
      console.log(err);
    })
  }
  
  // initial center position for the map
  lat: number = 7.546855;
  lng: number = -5.5471;


  drawing(){
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Bar Chart'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        title: {
            text: null
        }
    },
    colors:[
      '#6495ED',
      '#FFA500'
     ],
      credits: {
        enabled: false
      },
      series:[
        {
          type:undefined, 
          name: 'Legend 1',
          data: [107, 31, 635, 203, 40]
      }, {
          type:undefined,
          name: 'Legend 2',
          data: [133, 156, 947, 408, 37]
      }
      ]
      });


      this.chart1 = new Chart({
        chart: {
          type: 'pie'
        },
        title: {
          text: ' Pie Chart 1'
        },
  
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                //format: '<b>{point.name}</b>: {point.y} dossiers traités'
            },
              showInLegend: true
          }
      },
        colors:[
          '#6495ED',
          '#FFA500'
          ],
        credits: {
          enabled: false
        },
        series: [{
          type:undefined,
          name: 'Brands',
          colorByPoint: true,
          data: [{
              name: 'Légende 1',
              y: 61.41,
              sliced: true,
              selected: true
          }, {
              name: 'Légende 2',
              y: 13.84
          }]
      }]
    });

    this.chart2 = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: ' Pie Chart 2'
      },
  
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              //format: '<b>{point.name}</b>: {point.y} dossiers traités'
          },
            showInLegend: true
        }
    },
      colors:[
        '#6495ED',
        '#FFA500'
        ],
      credits: {
        enabled: false
      },
      series: [{
        type:undefined,
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Légende 1',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Légende 2',
            y: 13.84
        }]
    }]
  });

  }
  
  clickedMarker(label: number, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    console.log('id marker '+ this.identifiant)
    let id=this.identifiant;
    this.drawing();
    this.allEtablissements(id);
    this.countEtablissementTotal(id);
    this.countEtablissementPublic(id);
    this.countEtablissementPrives(id);
  }
  
  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
