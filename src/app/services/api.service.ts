import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host:String="http://localhost:8080/"
  constructor(private http:HttpClient) { }


  communeById(id):Observable<any>{
    return this.http.get(this.host+'communes/'+id);
  }

  allPays():Observable<any>{
    return this.http.get(this.host+"pays");
  }


  allEtablissements(id):Observable<any>{
    return this.http.get(this.host+"etablissements/"+id);
  }

  countEtablissementsTotal(id):Observable<any>{
    return this.http.get(this.host+"countEtablissements/"+id);
  }

  countEtablissementsPublics(id):Observable<any>{
    return this.http.get(this.host+"countEtablissementspublics/"+id);
  }

  countEtablissementPrives(id):Observable<any>{
    return this.http.get(this.host+"countEtablissementsprives/"+id);
  }


}
