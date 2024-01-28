import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strictMin } from '../../shared/validators/strict-min.validator';
import { SNACK_BAR_DURATION } from '../../shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewDialogComponent } from '../../shared/components/image-preview-dialog/image-preview-dialog.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  private dialogRef;

  product: Product = new Product(
    '',
    0,
    0,
    '',
    {paths: ['assets/imgs/question-mark.png']},
  );
  imagesUrls: string[] = [];
  productForm: FormGroup;
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.isEditMode = this.route.snapshot.params['id'] != null;

    if (this.isEditMode) {
      this.productService
        .fetchProductById(+this.route.snapshot.params['id'])
        .subscribe((product: Product) => {
          this.product = product;
          this.productForm.patchValue(this.product);
          this.product.productImages.paths.forEach((path: string) =>
            (<FormArray>this.productForm.get('productImages.paths')).push(
              this.formBuilder.control(path)
            )
          );
        });
    }
  }

  onSaveProduct() {
    const observer = {
      next: () => {
        this.snackBar.open(`Product has been saved successfully`, 'dismiss', {
          duration: SNACK_BAR_DURATION,
          panelClass: 'successful',
        });
        this.router.navigate(['products']);
      },
      error: (err) =>
        this.snackBar.open(
          `Failed to save product: ${err.message}`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'fail',
          }
        ),
    };    

    if (!this.isEditMode)
      this.productService
        .addProduct(this.productForm.value)
        .subscribe(observer);
    else
      this.productService
        .updateProduct(this.product.id, this.productForm.value)
        .subscribe(observer);
  }

  onProductImagesSelected(files: File[]) {
    files.forEach((image) => {
      (<FormArray>this.productForm.get('productImages.files')).push(
        this.formBuilder.control(image)
      );
      this.imagesUrls.push(URL.createObjectURL(image));
    });
  }

  onProductImageDelete(index: number) {
    (<FormArray>this.productForm.get('productImages.files')).removeAt(index);
    this.imagesUrls.splice(index, 1);
  }

  onImagePathDelete(index: number) {
    (<FormArray>this.productForm.get('productImages.paths')).removeAt(index);
  }

  openImagePreview(url: string) {
    this.dialogRef = this.dialog.open(ImagePreviewDialogComponent, {data: url});
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      unitPrice: ['', [Validators.required, strictMin(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      productImages: this.formBuilder.group({
        paths: this.formBuilder.array([]),
        files: this.formBuilder.array([])
      })
      //todo: in server, verify if an image doesn't have a path, in this case delete it, or if a path exists but image doesn't exists don't add it to the data base
    });
  }
}
