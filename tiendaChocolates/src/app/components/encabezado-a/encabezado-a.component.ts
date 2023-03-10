import { Component, OnInit } from '@angular/core';
import { AuthAService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encabezado-a',
  templateUrl: './encabezado-a.component.html',
  styleUrls: ['./encabezado-a.component.css']
})
export class EncabezadoAComponent implements OnInit{
  constructor(
    public authService:AuthAService
  ){}
  ngOnInit(): void {
    
  }

}
