export class Event{
    constructor(
        public _id: string,
        public name: String,
        public description: String,
        public typeEvent: String,
        public dateEvent: Date
    ){}
}