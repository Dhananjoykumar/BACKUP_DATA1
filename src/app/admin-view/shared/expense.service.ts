import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ExpenseData } from 'app/admin-view/models/expenseData';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { read } from 'fs';
import { ExtraDetails } from 'app/admin-view/models/extraDetails';

@Injectable()
export class ExpenseService {
    sendExpense: ExpenseData[] = new Array<ExpenseData>();
    sendFund: FundDetails[] = new Array<FundDetails>();
    sendExtraDetails: ExtraDetails[] = new Array<ExtraDetails>();
    expenseArray: ExpenseData[] = new Array<ExpenseData>();
    expenseBaseUrl: string = 'http://mh.truevoters.in/WebServices/Expense.svc';
    basicBaseUrl: string = 'http://mh.truevoters.in/WebServices/BasicData.svc';
    storageEl: any;
    storageArr: any[] = [];
    tempStorageArr: any[] = [];
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        // console.log('ExpenseService Intialized!!!!');
        this.headers = new Headers({'Content-Type': 'applicationm/json', 'Accept': 'application/json'});
        this.options = new RequestOptions({headers: this.headers});
    }

    addExpenseData(expense: ExpenseData): Observable<any> {
        this.sendExpense[0] = expense;
        console.log(this.expenseArray);
        console.log(JSON.stringify(this.sendExpense));
        return this.http.post(this.expenseBaseUrl + '/InsertDailyExpense/ExpData', JSON.stringify(this.sendExpense))
                .map(res => res.json()['InsertDailyExpenseResult']);
    }

    addFundDetails(fund: FundDetails): Observable<any> {
        console.log(fund);
        this.sendFund[0] = fund;
        console.log(JSON.stringify(this.sendFund));
        return this.http.post(this.expenseBaseUrl + '/InsertUpdateFundDetails/FundData', JSON.stringify(this.sendFund))
        .map(res => res.json()['InsertUpdateFundDetailsResult']);
    }

    getExpenseData(): Observable<any> {
       return this.http.get(this.expenseBaseUrl + '/GetDailyExpense?Id=&FromDate=&ToDate=&MaxId=&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1')
                .map(res => res.json()['GetDailyExpenseResult']);
                // console.log(this.expenseArray);
    }

    getExpenseType(): Observable<any> {
        return this.http
                .get(this.expenseBaseUrl + '/DownloadExpenseType?StateId=27&MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF')
                .map(res => res.json()['DownloadExpenseTypeResult']);
    }

    getSubExpenseType(exptype: number): Observable<any> {
        return this.http
            .get(this.expenseBaseUrl + '/DownloadSubExpense?LocalBodyId=13626&DistId=521&ExpenseType=' + exptype + '&StateId=27&MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF')
            .map(res => res.json()['DownloadSubExpenseResult']);
    }

    searchExpenseData (id: number, fromDate: string, tillDate: string) {
        return this.http
            .get(this.expenseBaseUrl + '/GetDailyExpense?Id=' + id + '&FromDate=' + fromDate + '&ToDate=' + tillDate + '&MaxId=' + 0 + '&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1')
            .map(res => res.json()['GetDailyExpenseResult']);
    }
    searchExpenseByDate(date: string) {
        console.log(date);
        return this.http
                .get(this.expenseBaseUrl + '/DownloadDailyExpense?Date=' + date + '&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1')
                .map(res => res.json()['DownloadDailyExpenseResult']);
                // 9112019919
                // 7CCBA0F9-5490-4306-B814-9613ECF1417B
    }

    getFundDetails(): Observable<any> {
        return this.http
            .get(this.expenseBaseUrl + '/GetFundDetails?Id&FromDate&ToDate&MaxId=0&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1')
            .map(res => res.json()['GetFundDetailsResult']);
    }

    getPartyName(partyTypeId: number): Observable<any> {
        return this.http
                .get(this.expenseBaseUrl + '/DownloadPartyNames?PartyType=' + partyTypeId + '&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF&MobileNo=9422325020')
                .map(res => res.json()['DownloadPartyNamesResult']);
    }

    insertExtraDetails(extraDetail: ExtraDetails): Observable<any> {
        this.sendExtraDetails[0] = extraDetail;
        console.log(JSON.stringify(this.sendExtraDetails));
        return this.http
                .post(this.expenseBaseUrl + '/UploadCandidateBasicDetails/CandidateData', JSON.stringify(this.sendExtraDetails))
                .map(res => res.json()['UploadCandidateBasicDetailsResult']);
    }

    downloadExtraDetails() {
        return this.http
                .get(this.expenseBaseUrl + '/DownloadCandidateBasicDetails?MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF')
                .map(res => res.json()['DownloadCandidateBasicDetailsResult']);
    }

    downloadDistrictName() {
        return this.http
                .get(this.basicBaseUrl + '/GetDistricts?StateID=27&MobileNo=7741909862&TokenId=D29D522E-F95B-4191-BF73-440C196177B1')
                .map(res => res.json()['GetDistrictsResult']);
    }

    downloadLocalBodyName(distId: number, localBodyTypeId: number) {
        return this.http
                .get(this.basicBaseUrl + '/GetLocalBodyDetailsDistWise?DistrictId=' + distId + '&LocalBodyTypeId=' + localBodyTypeId + '&MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF')
                .map(res => res.json()['GetLocalBodyDetailsDistWiseResult']);
    }

    verifyExpense(expense: ExpenseData) {
        this.sendExpense[0] = expense;
        console.log(JSON.stringify(this.sendExpense));
        return this.http
                .post(this.expenseBaseUrl + '/UpdateDailyExpenseStatus/StatusDEData', JSON.stringify(this.sendExpense))
                .map(res => res.json()['UpdateDailyExpenseStatusResult']);
    }

    getExpenseTypeByState(getStateId: number) {
        return this.http
                .get(this.expenseBaseUrl + '/DownloadExpenseType?StateId='+ getStateId +'&MobileNo=9422325020&TokenId=15BB8580-1C3D-467D-9E82-450C37E8D6FF')
                .map(res => res.json()['DownloadExpenseTypeResult']);
    }

    uploadStdRate(stdRateData: ExpenseData) {
        console.log(stdRateData);
    }

    activateFundData(fundData: FundDetails) {
        this.sendFund[0] = fundData;
        return this.http.post(this.expenseBaseUrl + '/UpdateFundDetailsStatus/StatusFundData', JSON.stringify(this.sendFund))
                .map(res => res.json()['UpdateFundDetailsStatusResult']);
    }

    getStudentMarks(tmid: number): Observable<any> {
        console.log(tmid);
        return this.http.get('http://localhost:8086/mysocietyweb/student/getstudentmarks?tmid=' + tmid, this.options)
                .map(res => res.json()['response']);
    }

    getStudentTotalMarks(): Observable<any> {
        return this.http.get('http://localhost:8086/mysocietyweb/student/getstudenttotalmarks', this.options)
                    .map(res => res.json()['response']);
    }
}
