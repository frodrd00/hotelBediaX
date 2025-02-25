import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

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
      id: [data.id],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      cc: [data.cc, Validators.required],
      type: [data.type, Validators.required],
    });
  }

  onSave(): void {
    if (this.destinationForm.valid) {
      this.dialogRef.close(this.destinationForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
