import { Component, EventEmitter, Output } from '@angular/core';
import { Permissions } from '../../shared/permissions/permission.model';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addPermission = new EventEmitter<{ username: string; permission: Permissions }>();

  username: string;
  selectedPermission: Permissions;
  permissions = Object.keys(Permissions).filter(key => isNaN(Number(key)));

  onGivePermission() {
    if (this.username && this.selectedPermission !== undefined) {
      this.addPermission.emit({ username: this.username, permission: this.selectedPermission });
      this.username = '';
      this.selectedPermission = undefined;
    } else {
      console.error('Username and permission are required to give permission.');
    }
  }

  onClose() {
    this.close.emit();
  }
}