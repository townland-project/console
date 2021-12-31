import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITab, Tabs } from './tabs.database';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public Tab!: ITab
  public Tabs: ITab[] = Tabs
  public Change: EventEmitter<void> = new EventEmitter<void>()

  constructor(private router: Router) { }

  Set(tab: ITab): void {
    this.router.navigate([tab.path])
    this.Tab = tab
    this.SetBrowserColor(this.Tab.background)
    this.Change.emit()
  }

  Listen(): void {
    this.SetByPath()
    this.router.events.subscribe(() => this.SetByPath())
  }

  private SetByPath(): void {
    let path = window.location.pathname
    // if was same
    this.Tab = this.Tabs.find((tab) => tab.path == path)!
    // if was like
    if (!this.Tab)
      this.Tab = this.Tabs.find((tab) => path.includes(tab.path))!
    this.SetBrowserColor(this.Tab?.background)
    if (this.Tab)
      this.Change.emit()
  }

  private SetBrowserColor(color: string): void {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  }
}
