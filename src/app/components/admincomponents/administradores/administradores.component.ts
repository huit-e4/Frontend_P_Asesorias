import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit{
  ngOnInit(): void {
    this.GetAdmins();
  }
  constructor(private userS:UserService){

  }
  adminsArr:any[]=[];
  GetAdmins(){
    const users=this.userS.getAdmins().subscribe((res:any)=>{
      // console.log(res.users);
      this.adminsArr=res.users;
      console.log(this.adminsArr);
      
      
  })}
}