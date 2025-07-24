import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Models, Query } from "appwrite";
import { from, Observable, of } from "rxjs";
import { collectionId, database, databaseId } from "../../lib/appwrite";

@Injectable({
  providedIn: "root",
})
export class PipelineService {
  isBrowser = false;
  cookieId = "";
  userId = "";

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getPipelines(): Observable<Models.DocumentList<Models.Document>> {
    if (this.isBrowser) {
      if (localStorage.getItem("uId")) {
        return this.getUserDocuments();
      } else if (localStorage.getItem("cookieId")) {
        return this.getUserDocumentsWithCookie();
      } else {
        return of({
          documents: [],
          total: 0,
        } as Models.DocumentList<Models.Document>);
      }
    } else {
      return of({
        documents: [],
        total: 0,
      } as Models.DocumentList<Models.Document>);
    }
  }

  getUserDocuments(): Observable<Models.DocumentList<Models.Document>> {
    if (this.isBrowser) {
      this.userId = localStorage.getItem("uId");
    }
    return from(
      database.listDocuments(databaseId, collectionId, [
        Query.equal("userId", this.userId),
      ])
    );
  }
  
    getUserDocumentsWithCookie(): Observable<
    Models.DocumentList<Models.Document>
  > {
    if (this.isBrowser) {
      this.cookieId = localStorage.getItem('cookieId');
    }
    return from(
      database.listDocuments(databaseId, collectionId, [
        Query.equal('cookieId', this.cookieId),
      ])
    );
  }
}
