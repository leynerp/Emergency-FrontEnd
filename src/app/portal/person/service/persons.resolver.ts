import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Nomenclator, NomenclatorData} from "../../nomenclator/service/data/nomenclator-data";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";
import {MessageType} from "../../../@shared/components/common";

@Injectable({
  providedIn: 'root'
})
export class PersonsResolver implements Resolve<Nomenclator[]> {
  constructor(private service: NomenclatorData,private menssage:MessageBox,private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nomenclator[]> | Observable<never> {
   /* return this.service.getAllDocument().pipe(
      take(3),
      mergeMap(res => {
        if (res) {
          console.log(res);
          return res;

        } else {
          // id not found
          console.log("Navigation cancelled");
          this.router.navigate([""]);
          return EMPTY;
        }
      })
    );*/
    return this.service.getAllDocument().pipe(
      catchError((err) => {
        let menssageWindows=this.menssage.show('Unable to connect with the Api, the application redirect to portal interface','Service Unable',undefined,MessageType.Error);
          menssageWindows.dialogResult$.subscribe({next:()=>{
              this.router.navigateByUrl("portal");
          }})
        return throwError(err);
      }),
      map(res => res)
    )
  }
}
