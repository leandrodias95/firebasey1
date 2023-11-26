import { Component } from '@angular/core';
import { Contact } from '../shared/contact';
import { Router } from '@angular/router';
import {
   Firestore,
   collection,
   addDoc,
   collectionData,
   doc,
   updateDoc,
   deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
contactList!: Observable<any>;
contacts: Contact[]=[{name:'', telephone:''}];

constructor(private firestore: Firestore, private router: Router){
this.getData();
}
 

onSubmit(f:any){
  const collectionInstance = collection(this.firestore, 'contact');
  addDoc(collectionInstance, f.value).then(()=>{
    console.log('Data saved successfully!');
    const form = document.getElementById("form") as HTMLFormElement;
    if(form){
      form.reset();
    }
  })
  .catch((err)=>{
    console.log(err);
  })
}
getData(){
  const collectionInstance = collection(this.firestore, 'contact');
  collectionData(collectionInstance, {idField:'id'}).subscribe(val=>{
    console.log(val);
  })
  this.contactList = collectionData(collectionInstance,{idField:'id'}); 
}
updateData(id: string){
const docInstance = doc(this.firestore, 'contact', id);
const updateData = {
  nome: 'updatedName'
}
updateDoc(docInstance, updateData).then(()=>{
  console.log('Data updated');
})
.catch((err)=>{
console.log(err);
})
  }
  deleteData(id:string){
    const docInstance = doc(this.firestore, 'contact', id);
    deleteDoc(docInstance).then(()=>{
      console.log('Data Deleted');
    })
  }
}
