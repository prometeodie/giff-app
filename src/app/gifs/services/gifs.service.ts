import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey     : string = 'QJ6LrMf37JSOgMvtQGNP5BZV8etEOoTz';
  private _servicioUrl: string = 'HTTP://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  public resultados   : Gif[] = [];

  

  get historial(){

    return [...this._historial];
  }

constructor(private http: HttpClient){

  this._historial = JSON.parse(localStorage.getItem( 'historial' )! ) || [];

  this.resultados = JSON.parse(localStorage.getItem( 'resultadoGif' )! ) || [];
}
  
  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify( this._historial ) );
    }
    //parametros para reutilizar el url 
    const params = new HttpParams()
    .set( 'api_key', this._apiKey ) 
    .set( 'limit', '10' )
    .set( 'q', query );
    
      this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
      .subscribe(( resp: any ) =>{
        console.log(resp);
        this.resultados = resp.data;
        localStorage.setItem('resultadoGif',JSON.stringify( this.resultados ) ); 

      });

     

    console.log(this._historial);
  }
}
