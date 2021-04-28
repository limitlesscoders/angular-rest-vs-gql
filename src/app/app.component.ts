import { Component, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public restData: RestData[] = [];
  rates: any[];
  loading = true;
  error: any;
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.http
      .get("https://jsonplaceholder.typicode.com/users")
      .toPromise()
      .then((response: any) => {
        this.restData = response;
        console.log("console ", response);
      });

    this.apollo
      .watchQuery({
        query: gql`
        {
          posts {
            data {
              id
              title
            }       
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log('RESULT ', result);
        this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}

export interface RestData {
  id: number;
  address: any;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
