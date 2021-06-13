export class Hotel{
    constructor(
        public _id: string,
        public name: string,
        public address: string,
        public phone: string,
        public coutry: string,
        public image: string,
        public idAdminHotel: string,
        public room: [],
        public event: [],
        public reservation: []
    ){}
}