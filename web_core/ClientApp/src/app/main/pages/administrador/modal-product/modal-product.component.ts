import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductRequest, EditProductRequest, ListProductEntity } from 'src/app/main/providers/services/Product/product.interface';
import { ProductService } from 'src/app/main/providers/services/Product/product.service';


@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  @ViewChild("foto") foto: ElementRef;
  @ViewChild("image") image: ElementRef;
  @ViewChild("imgProduct") imgProduct: ElementRef;
  @ViewChild("nameFile", { static: true }) nameFileLoad: ElementRef;


  solicitudForm: FormGroup;
  title: string;
  messageError: string = 'existe un error'
  currentControl: AbstractControlDirective | AbstractControl;
  isSummit: boolean = false
  selectedFile: File = null;
  imagen: string = ''

  constructor(private formbuilder: FormBuilder,
    private productService: ProductService,
    private modalProduct: MatDialogRef<ModalProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: ListProductEntity

  ) {

  }

  ngOnInit() {
    this.CreateForm()
    this.loadForm()
  }


  loadForm() {
    if (this.data) {
      this.title = "Editar Productos"
      this.solicitudForm.get('name').setValue(this.data.name)
      this.solicitudForm.get('precio').setValue(this.data.price);
      this.solicitudForm.get('detalle').setValue(this.data.description);
      this.imagen = this.data.pathUrlImage;
    }
    else {
      this.title = "Registrar Productos"
    }
  }


  fileName: any = '';

  CreateForm() {

    this.solicitudForm = this.formbuilder.group({
      name: ["",
        [Validators.required, Validators.minLength(0), Validators.maxLength(10),
        Validators.pattern(`^[a-zA-Z'ñÑáéíóúÁÉÍÓÚ][a-zA-Z 'ñÑáéíóúÁÉÍÓÚ]*$`),]
      ],
      precio: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      detalle: ["", [Validators.required]],
      imageLoad: ["", [Validators.required]]
    })

  }

  validationErrores(nameControl: string): boolean {


    this.currentControl = this.solicitudForm.get(nameControl)

    return (this.currentControl.errors
      &&
      (
        this.currentControl.touched
        ||
        this.currentControl.dirty
      )
    )

      || (this.isSummit && this.currentControl.invalid)


  }


  listOfErrors(nameControl: string): Array<string> {
    let errors: Array<string> = [];
    const control = this.solicitudForm.get(nameControl).errors
    if (control) {
      errors = Object.keys(control).map(
        (typeError) =>
          this.getMessage(typeError, control[typeError])
      )
    }
    return errors;
  }

  protected getMessage(type: string, params: any): string {

    return this.errorMessages[type](params);
  }

  readonly errorMessages = {
    required: () => 'Este campo es obligatorio',
    requiredFn: () => 'Este campo es obligatorio',
    invalidNumber: () => 'Solo se admiten números',
    invalidDecimal: () => 'Solo se admiten números decimales con coma (,)',
    invalidEmail: () => 'El correo electrónico es incorrecto',
    isValid: () => 'El formato no es valido',
    isEmailValid: () => 'Este correo no es valido',
    email: () => 'El formato del correo no es valido',
    messageEvent: () => 'Este correo ya existe en el sistema',
    emailExistSystem: () => 'Este correo ya existe en el sistema',
    invalidCalendarValidRange: () => 'Seleccione un rango de fecha',
    invalidRut: () => 'El RUT ingresado no es valido',
    minlength: (params) => `EL número mínimo de caracteres es ${params.requiredLength}`,
    maxlength: (params) => `EL número máximo de caracteres es ${params.requiredLength}`,
    // custom: () => `${this.messageCustom}`,
    pattern: () => 'Solo se adminite alfanumerico',
  };





  CargaImagen(event) {

    if (event.target.files) {
      this.selectedFile = <File>event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagen = reader.result as string;
        (this.nameFileLoad.nativeElement as HTMLElement).innerText = this.selectedFile.name

        this.solicitudForm.patchValue({ imageLoad: this.selectedFile })
      }
      reader.readAsDataURL(this.selectedFile)
    }
  };


  CargarProduct(formParent: FormGroup) {
    this.isSummit = true

    if (!this.data) {
      this.insertar(formParent);
    } else {
      this.update();
    }

  };

  insertar(form: FormGroup) {

    // let request = new AddProductRequest()

    // // request.files = this.fileData;
    // request.files = this.solicitudForm.get("imageLoad").value;
    // request.Name = this.solicitudForm.get("name").value;
    // request.Price = this.solicitudForm.get("precio").value;
    // request.Description = this.solicitudForm.get("detalle").value;


    // if (!request.files) {
    //   this.snackBar.open('No existe archivo cargado', 'close', { duration: 5000, panelClass: ['error-snackbar'] });
    //   return
    // }

    if (this.solicitudForm.valid) {

      this.productService.AddProduct(form.value).subscribe(
        response => {
          this.modalProduct.close()
        },
        error => {
          this.snackBar.open(error, 'close'
            , { duration: 5000, panelClass: ['error-snackbar'] });
          console.error(error);
        },
        () => { }

      );
    }
  }


  update() {

    if (this.selectedFile) {
      this.solicitudForm.get('imageLoad')

        .addValidators(Validators.required);
    }
    else {
      this.solicitudForm.get('imageLoad').setErrors(null);
    }

    if (this.solicitudForm.valid) {
      let request = new EditProductRequest()
      request.ProductId = this.data.productId;
      //request.files = this.fileData;
      request.files = this.solicitudForm.get("imageLoad").value;
      request.Name = this.solicitudForm.get("name").value;
      request.Price = this.solicitudForm.get("precio").value;
      request.Description = this.solicitudForm.get("detalle").value;

      this.productService.EditProduct(request).subscribe(
        response => {
          this.modalProduct.close()
        },
        error => { },
        () => { }

      );
    }
  }


  closeModal() {
    this.modalProduct.close();
  }
}
