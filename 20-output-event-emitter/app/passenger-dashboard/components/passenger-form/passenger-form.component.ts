import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      {{ details | json }}
      <div>
        Passenger name:
        <input
          type="text"
          name="fullname"
          #fullname="ngModel"
          required
          [ngModel]="details?.fullname"
        />
        <div *ngIf="fullname.errors?.required && fullname.dirty" class ="error">
            Passenger Name is required
        </div>
      </div>

      <div>
        Passenger ID:
        <input
          type="number"
          name="id"
          #id="ngModel"
          required
          [ngModel]="details?.id"
        />
        <div *ngIf="id.errors?.required && id.touched" class ="error">
            ID is required
        </div>

      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="details?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
        </label>
      </div>

      <div *ngIf="form.value.checkedIn">
        Check In Date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="details?.checkInDate"
        />
      </div>

      <div>
        Luggage:
        <select name="baggage" [ngModel]="details?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === details?.baggage"
          >
            {{ item.value }}
          </option>
        </select>
      </div>

      <button type="submit" [disabled]="form.invalid">
        Update Passenger
      </button>
    </form>
  `
})
export class PassengerFormComponent {
  @Input()
  details: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>()

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No baggage"
    },
    {
      key: "hand-only",
      value: "Hand baggage"
    },
    {
      key: "hold-only",
      value: "Hold baggage"
    },
    {
      key: "hand-hold",
      value: "Hand and hold baggage"
    }
  ];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.details.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
      if (isValid) {
        this.update.emit(passenger)
      }
  }
}
