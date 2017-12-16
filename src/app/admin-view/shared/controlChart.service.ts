import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ControlChart } from 'app/admin-view/models/controlChart';

@Injectable()
export class ControlChartService {
    baseUrl: string= 'http://mh.truevoters.in/WebServices/ControlChart.svc';
    chartsUdata: ControlChart[] = new Array<ControlChart>();
    storageEl: any;
    headers: Headers;
    options: RequestOptions;
    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
        this.options = new RequestOptions({headers: this.headers});
    }

getControlChartDetails(ACNO: string, PartNo: string, WardNo: string, Id: string, FromUser: string, ToUser: string, FromDate: string, ToDate: string): Observable<any> {
return this
.http.get(this.baseUrl + '/GetControlChartData?MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF&ACNO=' + ACNO + '&PARTNo=' + PartNo + '&WARDNo=' +WardNo+ '&SrId=' +Id+ '&FromUser=' +FromUser+ '&ToUser=' +ToUser+ '&FromDate=' +FromDate+ '&ToDate=' +ToDate)
.map(res => res.json()['GetControlChartDataResult']);
}
getSplitData(Id: string, SplitFrom: string, SplitTo: string): Observable<any> {

    return this
    .http.get(this.baseUrl + '/SplitControlChartData?MobileNo=9112019919&TokenId=7CCBA0F9-5490-4306-B814-9613ECF1417B&Id='+Id+'&SplitFrom='+SplitFrom+ '&SplitTo='+SplitTo)
    .map(res => res.json()['SplitControlChartDataResult']);
    }
    updateData(controlChart: ControlChart): Observable<any> {

        this.chartsUdata[0] = controlChart;
        return this
        .http.post(this.baseUrl + '/UpdateControlChart/UpdateCCData' , JSON.stringify(this.chartsUdata))
        .map(res => res.json());
    }
}

