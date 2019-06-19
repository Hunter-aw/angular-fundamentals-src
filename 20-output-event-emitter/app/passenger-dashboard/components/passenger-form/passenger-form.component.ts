import { Component, Input } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
    <form #form="ngForm" novalidate>
      {{ details | json }}
      <div>
        Passenger name:
        <input type="text" name="fullname" [ngModel]="details?.fullname" />
      </div>

      <div>
        Passenger ID:
        <input type="number" name="id" [ngModel]="details?.id" />
      </div>

      <div>
        <label>
            <input
                type="radio"
                [value]="true"
                name="checkedIn"
                [ngModel] = "details?.checkedIn"
                (ngModelChange)="toggleCheckIn($event)">
                Yes
        </label>

        <label>
            <input
                type="radio"
                [value]="false"
                name="checkedIn"
                [ngModel] = "details?.checkedIn"
                (ngModelChange)="toggleCheckIn($event)">
                No
        </label>
      </div>

        <div *ngIf="form.value.checkedIn">
            Check In Date:
            <input
                type = "number"
                name="checkInDate"
                [ngModel]="details?.checkInDate">
        </div>

      {{ form.value | json }}
    </form>
  `
})
export class PassengerFormComponent {
  @Input()
  details: Passenger;
  toggleCheckIn(checkedIn: boolean) {
      if (checkedIn) {
          this.details.checkInDate = Date.now()
      }
  }
}
