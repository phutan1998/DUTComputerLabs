export interface ComputerLab {
    id: number;
    name: string;
    condition: string;
    computers: number;
    damagedComputers: number;
    aircons: number;
    owner?: string;
    ownerPhoneNumber?: string;
    ownerEmail?: string;
    editMode?: number;
}
