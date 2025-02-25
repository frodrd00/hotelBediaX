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

const ELEMENT_DATA: destination[] = [
  {
    id: 1,
    name: 'Paris',
    description: 'City of Light',
    cc: 'FR',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 2,
    name: 'New York',
    description: 'The Big Apple',
    cc: 'US',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 3,
    name: 'Tokyo',
    description: 'Land of the Rising Sun',
    cc: 'JP',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 4,
    name: 'Sydney',
    description: 'Harbour City',
    cc: 'AU',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 5,
    name: 'Cape Town',
    description: 'Mother City',
    cc: 'ZA',
    type: TypeEnum.familiar,
    lastModif: new Date(),
  },
  {
    id: 6,
    name: 'London',
    description: 'The Old Smoke',
    cc: 'GB',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 7,
    name: 'Rome',
    description: 'The Eternal City',
    cc: 'IT',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 8,
    name: 'Berlin',
    description: 'The Grey City',
    cc: 'DE',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 9,
    name: 'Moscow',
    description: 'The Third Rome',
    cc: 'RU',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 10,
    name: 'Beijing',
    description: 'The Northern Capital',
    cc: 'CN',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 11,
    name: 'Rio de Janeiro',
    description: 'The Marvelous City',
    cc: 'BR',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 12,
    name: 'Dubai',
    description: 'The City of Gold',
    cc: 'AE',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 13,
    name: 'Bangkok',
    description: 'The City of Angels',
    cc: 'TH',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 14,
    name: 'Istanbul',
    description: 'The City on Seven Hills',
    cc: 'TR',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
  {
    id: 15,
    name: 'Los Angeles',
    description: 'The City of Angels',
    cc: 'US',
    type: TypeEnum.ocio,
    lastModif: new Date(),
  },
];

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
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = this.dataSource.data.filter(
          (destination) => destination.id !== id
        );
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
