import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  @ViewChild("image") image: ElementRef;

  // @ViewChild("nameFile", { static: false }) nameFileLoad: ElementRef;


  solicitudForm: FormGroup;
  title: string;
  messageError: string = 'existe un error'
  currentControl: AbstractControlDirective | AbstractControl;
  isSummit: boolean = false
  selectedFile: File = null;
  imagen: string = ''
  nameFileLoad = ''
  constructor(private formbuilder: FormBuilder,
    private productService: ProductService,
    private modalProduct: MatDialogRef<ModalProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: ListProductEntity

  ) {

  }

  ngOnInit() {

    this.solicitudForm = this.formbuilder.group({
      ProductId: new FormControl(0),
      Name: ["",
        [Validators.required, Validators.minLength(0), Validators.maxLength(200),
          // Validators.pattern(`^[a-zA-Z'ñÑáéíóúÁÉÍÓÚ][a-zA-Z 'ñÑáéíóúÁÉÍÓÚ]*$`),
        ]
      ],
      Price: ["", [Validators.required, Validators.min(0), Validators.max(1000)]],
      Description: ["", [Validators.required]],
      files: ["", [Validators.required]]
    })
    this.loadForm()
  }


  loadForm() {
    if (this.data) {
      this.title = "Editar Productos"
      this.solicitudForm.get('ProductId').setValue(this.data.productId)
      this.solicitudForm.get('Name').setValue(this.data.name)
      this.solicitudForm.get('Price').setValue(this.data.price);
      this.solicitudForm.get('Description').setValue(this.data.description);
      this.imagen = this.data.pathUrlImage;
    }
    else {
      this.title = "Registrar Productos"
    }
  }






  validationErrores(nameControl: string): boolean {


    this.currentControl = this.solicitudForm.get(nameControl)

    const indicador = (this.currentControl.errors
      &&
      (
        this.currentControl.touched
        ||
        this.currentControl.dirty
      )
    )

      || (this.isSummit && this.currentControl.invalid)

      console.log(nameControl,this.currentControl);

    return indicador

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
      }
      reader.readAsDataURL(this.selectedFile)
      this.nameFileLoad = this.selectedFile.name
      this.solicitudForm.patchValue({ files: this.selectedFile })
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

    let request = new AddProductRequest()

    request = this.solicitudForm.value
    request.files = this.solicitudForm.get("files").value;
    if (!request.files) {
      this.snackBar.open('No existe archivo cargado', 'close', { duration: 5000, panelClass: ['error-snackbar'] });
      return
    }
    if (this.solicitudForm.valid) {

      this.productService.AddProduct(request).subscribe(
        response => {
          this.modalProduct.close()
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, 'close'
            , { duration: 5000, panelClass: ['error-snackbar'] });
          console.error(error);
        }

      );
    }
  }

//https://stackoverflow.com/questions/47560696/angular-5-and-material-how-to-change-the-background-color-from-snackbar-compon
  update() {

    if (this.selectedFile) {
      this.solicitudForm.get('files')
        .addValidators(Validators.required);
    }
    else {
      this.solicitudForm.get('files').setErrors(null);
    }

    if (this.solicitudForm.valid) {

      let request = new EditProductRequest()
      request = this.solicitudForm.value
      request.files = this.solicitudForm.get("files").value;

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
