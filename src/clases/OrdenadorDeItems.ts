import { Item } from "./Item";

export class OrdenadorDeItems{
    public static DESC: -1;
    public static ASC: 1;
    public items:Item[]=[];
    public orden:1;

    public constructor(orden){
        this.items.push(new Item("null","null","null"));
        this.orden=orden;
    }
    public pushItem(item:Item){
        this.items.push(item);
        var i=this.items.length-1;
        var p=0;
        var tem;
        while(i>1){
            p=Math.trunc(i/2);
            if(this.comparar(this.items[p],this.items[i])){
                tem=this.items[p];
                this.items[p]=this.items[i];
                this.items[i]=tem;
            }
            i=p;
        }
    }
    public push(data,val1,val2){
        let item=new Item(data,val1,val2);
        this.pushItem(item);
    }
    //0 1 2 3 4
    public popitem(){
        var largo=this.items.length-2;
        var item=this.items[1];
        if(this.getcount()==1){
            this.items.pop();
        }else{
            this.items[1]=this.items.pop();
            var p=1;
            var i=p*2;
            while(i<largo){
                let i2=this.comparar(this.items[i],this.items[i+1])?i:i+1;
                if(this.comparar(this.items[p],this.items[i2])){
                    let tem=this.items[p];
                    this.items[p]=this.items[i2];
                    this.items[i2]=tem;
                }
                p=i2;
                i=p*2;
            } 
            if(i==largo){
                if(this.comparar(this.items[p],this.items[i])){
                    let tem=this.items[p];
                    this.items[p]=this.items[i];
                    this.items[i]=tem;
                }
            }
        }
        return item;
    }
    
    public pop(){
        let item:Item=this.popitem();
        return item.data;
    }
    getcount(){
        return this.items.length-1;
    }
    comparar(nodo1:Item,nodo2:Item){
        var i=0;
        if(nodo1.valor>nodo2.valor){
            i=-1;
        }else if(nodo1.valor<nodo2.valor){
            i=1;
        }else{
            if(nodo1.valor2>nodo2.valor2){
                i=-1;
            }
        }
        return i==this.orden;
    }
    isempty(){
        return this.items.length<=1;
    }
}