import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { destination, TypeEnum } from '../../models/destination';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ManageDestinationComponent } from '../manage-destination/manage-destination.component';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-destinations-table',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    DatePipe,
    MatIcon,
    MatButtonModule,
    MatPaginator,
  ],
  templateUrl: './destinations-table.component.html',
  styleUrl: './destinations-table.component.scss',
})
export class DestinationsTableComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'cc',
    'type',
    'lastModif',
    'actions',
  ];

  ELEMENT_DATA: destination[] = [];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.destinationService.getDestinations().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private destinationService: DestinationService
  ) {}

  deleteRow(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar este destino?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService.deleteDestination(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (destination) => destination.id !== id
          );
        });
      }
    });
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(ManageDestinationComponent, {
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService
          .editDestination(result)
          .subscribe((updatedDestination) => {
            const index = this.dataSource.data.findIndex(
              (d) => d.id === updatedDestination.id
            );
            if (index !== -1) {
              this.dataSource.data[index] = updatedDestination;
              this.dataSource.data = [...this.dataSource.data];
            }
          });
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ManageDestinationComponent, {
      data: {
        id: null, // Ensure id is null for new destinations
        name: '',
        description: '',
        cc: '',
        type: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService
          .createDestination(result)
          .subscribe((newDestination) => {
            this.dataSource.data = [...this.dataSource.data, newDestination];
          });
      }
    });
  }

  getTypeName(type: TypeEnum): string {
    return type === TypeEnum.ocio ? 'Ocio' : 'Familiar';
  }
}
