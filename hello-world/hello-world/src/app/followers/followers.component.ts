import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from '../services/followers.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: FollowersService
  ) {}

  ngOnInit(): void {
    Observable.combineLatest([this.route.paramMap, this.route.queryParamMap])
      .switchMap((combined) => {
        const id = combined[0].get('id');
        const page = combined[1].get('page');

        return this.service.getAll();
      })
      .subscribe((followers: any) => (this.followers = followers));
  }
}
