import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-destination',
  templateUrl: './manage-destination.component.html',
  styleUrl: './manage-destination.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class ManageDestinationComponent {
  destinationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageDestinationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.destinationForm = this.fb.group({
      _id: [data._id],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      cc: [data.cc, Validators.required],
      type: [data.type, Validators.required],
    });
  }

  onSave(): void {
    if (this.destinationForm.valid) {
      const formValue = this.destinationForm.value;
      if (formValue._id === null) {
        delete formValue._id; // Remove _id to create a new document
      }
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
