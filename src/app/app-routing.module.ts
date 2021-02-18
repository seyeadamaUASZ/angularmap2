import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartoComponent } from './carto/carto.component';

const routes: Routes = [
  {
  path:'',
  component:CartoComponent,
  pathMatch:'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
