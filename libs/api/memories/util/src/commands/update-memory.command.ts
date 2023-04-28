import { IUpdateMemoryRequest} from '../requests';

export class UpdateMemoryCommand{ 
    constructor(public readonly request: IUpdateMemoryRequest){}
}

