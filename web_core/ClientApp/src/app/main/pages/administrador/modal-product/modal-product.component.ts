import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductRequest, EditProductRequest, ListProductEntity } from 'src/app/main/providers/services/Product/product.interface';
import { ProductService } from 'src/app/main/providers/services/Product/product.service';
 

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit   {
  @ViewChild("foto") foto: ElementRef;
  @ViewChild("image") image: ElementRef;
  @ViewChild("imgProduct") imgProduct: ElementRef;


  formGroupProduct: FormGroup;
  title: string;

  constructor(private formbuilder: FormBuilder,
    private productService: ProductService,
    private modalProduct: MatDialogRef<ModalProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: ListProductEntity

  ) {

    this.formGroupProduct = this.CreateForm();
    if (data) {
      this.title = "Editar Productos"
    }
    else {
      this.title = "Registrar Productos"
    }
  }

  ngOnInit() {


    this.formGroupProduct.get('name').setValue(this.data.name);
    this.formGroupProduct.get('precio').setValue(this.data.price);
    this.formGroupProduct.get('detalle').setValue(this.data.description);
    this.imagen = this.data.pathUrlImage;

  // console.log(this.foto.nativeElement.files);
    //  console.log(this.imgProduct.nativeElement);


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
      // console.log("detalle reade resul",reader.result);
        this.imagen = event.target.result;
      }
      console.log("archivo " + event.target.files[0].name.toString())

      //coloca el nombre al inputFile
      document.getElementById('fichero').innerHTML = event.target.files[0].name.toString();
    }
  };


  CargarProduct() {
    debugger
    if (this.formGroupProduct.valid) {
      if (!this.data) {
        this.insertar();
      } else {
        console.log("detalle src",this.imgProduct.nativeElement.src);
        console.log("detalle src2",this.imgProduct.nativeElement);
          this.update();

      }
    }
  };

  insertar() {
    let request = new AddProductRequest()

    request.files = this.fileData;
    request.Name = this.formGroupProduct.get("name").value;
    request.Price = this.formGroupProduct.get("precio").value;
    request.Description = this.formGroupProduct.get("detalle").value;
    // console.log(this.formGroupProduct)
    console.log(request)


    if (!request.files) {
      this.snackBar.open('No existe archivo cargado', 'close', { duration: 5000, panelClass: ['error-snackbar'] });
      return
    }

    this.productService.AddProduct(request).subscribe(
      response => {
        this.modalProduct.close()
      },
      error => { },
      () => { }

    );

  }


  update() {

    let request = new EditProductRequest()
    request.ProductId = this.data.productId;
    request.files = this.fileData;
    request.Name = this.formGroupProduct.get("name").value;
    request.Price = this.formGroupProduct.get("precio").value;
    request.Description = this.formGroupProduct.get("detalle").value;

    this.productService.EditProduct(request).subscribe(
      response => {
        this.modalProduct.close()
      },
      error => { },
      () => { }

    );
  }


  closeModal() {
    this.modalProduct.close();
  }
}
