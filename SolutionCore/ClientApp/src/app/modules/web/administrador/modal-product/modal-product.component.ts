import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductRequest } from 'src/app/agent/Product/Request/AddProductRequest';
import { ListProductEntity } from 'src/app/agent/Product/Response/ListProductResponse';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  formGroupProduct: FormGroup;

  constructor(private formbuilder: FormBuilder,
    private coreService: CoreService,
    private modalProduct : MatDialogRef<ModalProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: ListProductEntity

    ) {

    this.formGroupProduct = this.CreateForm();
  }

  ngOnInit() {

  this.formGroupProduct.get('name').setValue(this.data.name);
  this.formGroupProduct.get('precio').setValue(this.data.price);
  this.formGroupProduct.get('detalle').setValue(this.data.description);
  this.imagen='images/'+ this.data.photo;

  }



  fileName: any = '';
  CreateForm(): FormGroup {
    return this.formbuilder.group({
      name: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      precio: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      detalle: ["", [Validators.required]],
      // imageInput: [this.fileName, Validators.required]
      //  ,
      // archivo: [this.fileName, [Validators.required]]  
    })

  }



  fileData: File = null;
  imagen: string = ''

  CargaImagen(event) {
    console.log(event)
    if (event.target.files) {
      this.fileData = <File>event.target.files[0];
      // this.formGroupProduct.controls['imageInput'].setValue(this.fileData  ? this.fileData.name : ''); // <-- Set Value for Validation

      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (event: any) => {
        // you can perform an action with readed data here
        this.imagen = event.target.result;
      }
      console.log("archivo " + event.target.files[0].name.toString())

      //coloca el nombre al inputFile
      document.getElementById('fichero').innerHTML = event.target.files[0].name.toString();
    }
  };


  CargarProduct() {

    if (this.formGroupProduct.valid) {
      let request = new AddProductRequest()

      request.files = this.fileData;
      request.Name = this.formGroupProduct.get("name").value;
      request.Price = this.formGroupProduct.get("precio").value;
      request.Description = this.formGroupProduct.get("detalle").value;
      console.log(this.formGroupProduct)
      console.log(request)


      if (!request.files) {
        this.snackBar.open('No existe archivo cargado', 'close', { duration: 5000, panelClass: ['error-snackbar'] });
        return
      }

      this.coreService.AddProduct(request).subscribe(
      response =>{
        this.modalProduct.close()
      },
       error =>{},
       () => { }

      );
    }
  };


  closeModal(){

    this.modalProduct.close();
  }
}
