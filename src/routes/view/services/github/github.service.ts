import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAuth, signOut, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { GithubRepoComponent } from '../../components/github-repo/github-repo.component';
import { IMe, IRelease, IRepository } from './github.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  get Token(): string {
    return window.localStorage.getItem('github-token') || ''
  }

  constructor(private FirebaseSerivce: FirebaseService, private MatDialog: MatDialog) { }

  async Auth(): Promise<void> {
    try {
      let auth = getAuth()
      let provider = new GithubAuthProvider()
      provider.addScope('repo,user')
      let result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result as any);
      const token = credential?.accessToken;
      window.localStorage.setItem('github-token', token!);
    } catch (error) {
      return Promise.reject();
    }
  }

  async UnAuth(): Promise<void> {
    let auth = getAuth()
    await signOut(auth)
    window.localStorage.removeItem('github-token')
  }

  async Me(): Promise<IMe> {
    if (this.Token.length == 0) return Promise.reject();
    try {
      let res = await fetch('https://api.github.com/user', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `bearer ${this.Token}`
        }
      })
      let json = await res.json()
      return json;
    } catch (error) {
      return Promise.reject();
    }
  }

  async FetchRepo(): Promise<IRepository[]> {
    if (this.Token.length == 0) return Promise.reject();
    try {
      let res = await fetch('https://api.github.com/user/repos', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `bearer ${this.Token}`
        }
      })
      let json = await res.json()
      return json;
    } catch (error) {
      return Promise.reject();
    }
  }

  async FetchRelease(repo: string): Promise<IRelease[]> {
    try {
      let res = await fetch(`https://api.github.com/repos/${repo}/releases`, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      })
      let json = await res.json();
      return json;
    } catch (error) {
      return Promise.reject()
    }
  }

  ChooseRepo(): Promise<IRepository | undefined> {
    return new Promise((resolve) => {
      let dialog = this.MatDialog.open(GithubRepoComponent, {
        disableClose: true,
      })

      dialog.afterClosed().subscribe(result => {
        resolve(result != '' ? result : undefined)
      })
    })
  }
}