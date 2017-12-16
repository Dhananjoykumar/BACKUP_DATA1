import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { LocalBody } from 'app/admin-view/models/localbody';
import { TalukaList } from 'app/admin-view/models/talukaList';
import { AssemblyList } from 'app/admin-view/models/assemblyList';

@Injectable()
export class LocalBodyService {

  localBodyArray: LocalBody[] = [];
  baseUrl: string = 'http://mh.truevoters.in/WebServices/BasicData.svc';
  storageEl: any;
  assemblyList: any;
  constructor(private http: Http) { }

  getStateList() {
    return this.http
      .get(this.baseUrl + '/GetStates?MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1',
    ).map(res => res.json()['GetStatesResult']);
  }

  getDistrict(getStateId: number) {
    console.log(getStateId);
    return this.http
      .get(this.baseUrl + '/GetDistricts?StateID=' + getStateId + '&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1',
    ).map(res => res.json()['GetDistrictsResult']);
  }

  getTaluka(getDistrictId: number) {
    return this.http.
      get(this.baseUrl + '/GetTaluka?DistId=' + getDistrictId + '&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1',
    ).map(res => res.json()['GetTalukaResult']);
  }

  getAssembly(getDistrictId: number) {
    return this.http.
      get(this.baseUrl + '/GetAssembly?DistId=' + getDistrictId + '&MobileNo=9112019919&TokenId=7CCBA0F9-5490-4306-B814-9613ECF1417B',
    ).map(res => res.json()['GetAssemblyResult']);
  }

  addLocalBody(localBodyObj: LocalBody) {
    this.localBodyArray[0] = localBodyObj;
    console.log(JSON.stringify(this.localBodyArray));
    return this.http.post(this.baseUrl + '/InsertLocalBody/LBData', JSON.stringify(this.localBodyArray))
      .map(res => res.json()['InsertLocalBodyResult']);
  }

  addTalukaList(talukaList: TalukaList[]) {
    return this.http.post(this.baseUrl + '/InsertLocalBodyTaluka/LBTalData',
      JSON.stringify(talukaList)).map(res => res.json()['InsertLocalBodyTalukaResult']);
  }

  addAssemblyList(assemblyList: AssemblyList[]) {
    return this.http.post(this.baseUrl + '/InsertLocalBodyAssembly/LBAssData',
      JSON.stringify(assemblyList)).map(res => res.json()['InsertLocalBodyAssemblyResult']);
  }

  // to download complete list of data
  getLocalBodyData() {
    return this.http.
      get(this.baseUrl + '/GetLocalBodyDetails?MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF', ).map(res => res.json()['GetLocalBodyDetailsResult']);
  }

  downloadLocalBody(getStateId: number, getDistrictId: number, LocalBodyTypeId: number) {
    // console.log(getStateId, getDistrictId, LocalBodyTypeId);
    return this.http.
      get(this.baseUrl + '/GetLocalBody?StateId=' + getStateId + '&DistId=' + getDistrictId + '&LocalBodyTypeId=' + LocalBodyTypeId + '&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1',
    ).map(res => res.json()['GetLocalBodyResult']);
  }

  downloadAssemblyId(getLocalBodyId: number) {
    return this.http.get(this.baseUrl + '/GetAssemblyIds?LocalBodyId='+ getLocalBodyId +'&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1',
  ).map(res => res.json()['GetAssemblyIdsResult']);
  }
}
