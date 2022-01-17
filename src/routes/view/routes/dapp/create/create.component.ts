import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Web3Service } from '../../../services/web3/web3.service';
import { ContractService } from '../../../services/contract/contract.service';
import { FsService } from '../../../services/fs/fs.service';
import { IpfsService } from '../../../services/ipfs/ipfs.service';
import { GithubService } from '../../../services/github/github.service';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { AllDAppPermissions, DAppPermissions, IDAppPermission, TDAppPermission } from '../../../../../database/dapp.permissions';
import { ManifestService } from '../../../services/manifest/manifest.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public loading: boolean = false;
  public permissions: IDAppPermission[] = DAppPermissions;
  public all_permissions: TDAppPermission = AllDAppPermissions

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
    'author': new FormControl('', { validators: [Validators.required] }),
    'email': new FormControl('', { validators: [Validators.required] }),
    'webpage': new FormControl('', { validators: [Validators.required] }),
    'version': new FormControl('', { validators: [Validators.required] }),
    'repository': new FormControl('', { validators: [Validators.required] }),
    'permissions': new FormControl([], { validators: [Validators.required, Validators.min(1)] })
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

  get ValidDAppID(): boolean {
    let split = this.CreateID.split('.')

    if (split.length != 3) return false
    else if (!(split[0].length == 2 || split[0].length == 3)) return false
    else if (split[1].length < 3) return false
    else if (split[2].length < 3) return false
    else if (this.ContractService.DApps.find((dapp) => dapp.id == this.CreateID) != undefined) return false
    else return true
  }

  get DAppImage(): string {
    return this.manifest.get('image')!.value;
  }

  get DAppPermissions(): TDAppPermission {
    let value = this.manifest.get('permissions')?.value as string[]
    if (value.includes('all')) value.splice(value.indexOf('all'), 1)
    return value as TDAppPermission;
  }


  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(private MatSnackBar: MatSnackBar, private MatDialog: MatDialog, public Web3Service: Web3Service, public ContractService: ContractService, private FsService: FsService, private IpfsService: IpfsService, private GithubService: GithubService, private ManifestService: ManifestService) { }

  ngOnInit(): void {
  }

  async SelectFromGithubRepo() {
    try {
      if (this.GithubService.Token.length == 0)
        await this.GithubService.Auth();
      let repo = await this.GithubService.ChooseRepo();
      if (repo) {
        let [releases, me, image] = await Promise.all([this.GithubService.FetchRelease(repo.full_name), this.GithubService.Me(), this.FsService.FileFromURI(repo.owner.avatar_url)])
        let blob = URL.createObjectURL(image)
        if (this.manifest.get('name')?.value.length == 0) this.manifest.get('name')?.setValue(repo.name)
        if (this.manifest.get('description')?.value.length == 0) this.manifest.get('description')?.setValue(repo.description)
        if (this.manifest.get('author')?.value.length == 0) this.manifest.get('author')?.setValue(repo.owner.login)
        if (this.manifest.get('email')?.value.length == 0) this.manifest.get('email')?.setValue(me.email)
        if (this.manifest.get('webpage')?.value.length == 0) this.manifest.get('webpage')?.setValue(`https://${me.login}.github.io`)
        if (this.manifest.get('version')?.value.length == 0) this.manifest.get('version')?.setValue(releases[0].name)
        this.manifest.get('repository')?.setValue(`https://github.com/${repo.full_name}`)
        if (this.manifest.get('image')?.value.length == 0) this.manifest.get('image')?.setValue(blob);
      }
    } catch (error) {

    }
  }

  async SelectAnImage() {
    try {
      let files = await this.FsService.File({ types: ['image/*'] });
      let blob = URL.createObjectURL(files[0])
      this.manifest.get('image')?.setValue(blob);
    } catch (error) {

    }
  }

  SelectionPermissionsChange(event: MatCheckboxChange) {
    this.manifest.get('permissions')?.setValue(event.checked ? AllDAppPermissions : [])
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

  SubmitDAppID(): void {
    if (this.create.valid && !this.loading && this.ValidDAppID) this.Next()
  }

  SubmitManifest() {
    if (this.manifest.valid) this.Next();
  }

  async Submit(): Promise<void> {
    let manifest = this.ManifestService.ToFile(this.manifest.value)
    console.log(manifest);
  }

  // create footer buttons
  Back() {
    this.stepper.previous()
  }

  Next() {
    this.stepper.next()
  }
}
