import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Web3Service } from '../../../services/web3/web3.service';
import { ContractService } from '../../../services/contract/contract.service';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public createable: boolean = false; // developer can create a new dapp id
  public loading: boolean = false;

  public select: FormGroup = new FormGroup({
    'input': new FormControl('', { validators: [Validators.required] })
  })

  public create: FormGroup = new FormGroup({
    'input': new FormControl('', { validators: [Validators.required] })
  });

  public manifest: FormGroup = new FormGroup({
    'name': new FormControl('', { validators: [Validators.required] }),
    'image': new FormControl('', { validators: [Validators.required] }),
    'description': new FormControl('', { validators: [Validators.required] }),
    'external_url': new FormControl('', { validators: [Validators.required] }),
    'author': new FormControl('', { validators: [Validators.required] })
  })

  get IDs(): string[] {
    return this.ContractService.DApps.filter((dapp) => dapp.owner == this.Web3Service.account).map((dapp) => dapp.id)
  }

  get SelectID(): string {
    return this.select.value['input']
  }

  get CreateID(): string {
    return this.create.value['input']
  }

  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(private MatSnackBar: MatSnackBar, private MatDialog: MatDialog, public Web3Service: Web3Service, public ContractService: ContractService) { }

  ngOnInit(): void {
  }

  OnDAppIDChange(event: MatSelectChange): void {
    if (event.value == "create-dapp-id") this.createable = true;
    else this.createable = false;
  }

  get ValidDAppID(): boolean {
    let split = this.CreateID.split('.')

    if (split.length != 3) return false
    else if (!(split[0].length == 2 || split[0].length == 3)) return false
    else if (split[1].length < 3) return false
    else if (split[2].length < 3) return false
    else if (this.ContractService.DApps.find((dapp) => dapp.id == this.CreateID) != undefined) return false;
    else if (!this.Web3Service.IsAvailable()) return false;

    return true
  }

  async ConfirmAndPayDAppID(): Promise<void> {
    if (this.ValidDAppID == false) return;
    this.loading = true
    let dialog = this.MatDialog.open(CreateDialogComponent, { closeOnNavigation: false })
    try {
      await this.ContractService.AddDApp(this.CreateID)
      this.MatSnackBar.open('Greetings to the new DApp ID owner.', 'ok', { duration: 3000 });
      dialog.close()
      this.Next()
    } catch (error) {
      this.MatSnackBar.open('Oh no! Payment faild or rejected.', 'ok', { duration: 3000 });
      dialog.close()
      this.loading = false
    }
  }

  SubmitManifest() {
    if (this.manifest.valid) this.Next();
  }

  async Submit(): Promise<void> {
    if (this.manifest.valid) {
      let value = this.manifest.value;
      console.log(value);
    }
  }

  // create footer buttons
  Back() {
    this.stepper.previous()
  }

  Next() {
    this.stepper.next()
  }
}
