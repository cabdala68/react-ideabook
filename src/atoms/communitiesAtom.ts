import { Timestamp } from "firebase/firestore"
import {atom} from "recoil"

export interface Community{
    id: string
    creator: string
numberOfMember: number
privacyType: "public" | "restricted"| "private"
createAt?: Timestamp
imageURL?: string

}