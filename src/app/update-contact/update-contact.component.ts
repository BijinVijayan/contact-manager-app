import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from 'src/models/myContact';
import { MyGroup } from 'src/models/myGroup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit{

  contactId:string=''
  contact:MyContact={} as MyContact
  groups:MyGroup[]=[] as MyGroup[]

  constructor(private activateRoute:ActivatedRoute,private api:ApiService,private router:Router){}

  ngOnInit(): void {
    this.activateRoute.params
    .subscribe((data)=>{
      this.contactId=data['contactId'] 
    })
    // api call for particular contact details
    this.api.viewContact(this.contactId)
    .subscribe((data:any)=>{
      this.contact=data
    }


    )
    
    
    // for all groups
    this.api.getAllGroups().subscribe(
      (data:any)=>{
        this.groups=data
      }
    )

  }
  updateContact(){
    //update contact api call
    this.api.updateContact(this.contactId,this.contact)
    .subscribe(
      (data:any)=>{
    this.router.navigateByUrl('')
      }
    )
  }

}
