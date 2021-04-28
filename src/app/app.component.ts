import { Component, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public restData: Data[] = [];
  public graphQlData: Data[] = [];
  constructor(private http: HttpClient, private apollo: Apollo) {
    // REST API fetch, server has all the control on what data to present
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .toPromise()
      .then((response: any) => {                
        if(response && response.length >0){
          this.restData = response.filter((d: Data)=> d.id <= 5);;
          console.log("REST API DATA - ",this.restData);
        }        
      });

// Graphql Fetch, Client (App/Browser) has all the control what date needs to be fetched
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
        if(result && result.data) {
          // we only want to display 5 entries
          this.graphQlData = (result.data.posts?.data).filter((d: Data)=> d.id <= 5);
          console.log('Graphql DATA - ', this.graphQlData);
        }
        
      });
  }
}

export interface Data {
  id: number;
  title: string;
  body: string;
  userId: number;
}
