import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IRepository } from '../../services/github/github.interface';
import { GithubService } from '../../services/github/github.service';


@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  styleUrls: ['./github-repo.component.scss']
})
export class GithubRepoComponent implements OnInit {

  public data: IRepository[] | undefined = undefined;
  public selected: IRepository | undefined;

  constructor(private ref: MatDialogRef<GithubRepoComponent>, private GitHubSeervice: GithubService) { }

  ngOnInit(): void {
    this.GitHubSeervice.FetchRepo().then((repo) => this.data = repo);
  }

}
