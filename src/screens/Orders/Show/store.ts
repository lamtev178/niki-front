import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  initialized: boolean = false;
  id: string | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setId(id: string){
    this.id = id
  }

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  setOrder(order : SingleOrder){
    this.order = order
  }

  async loadOrder(){
    this.startLoading()
    const res = await client.query(ORDER_QUERY, {number: this.id}).toPromise()
    if(res?.data?.order){
      this.setOrder(res.data.order)
    }
    this.stopLoading()
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  initialize(id:string) {
    if (this.initialized) return;
    this.setId(id)
    this.initialized = true;
    this.loadOrder();
  }
}
