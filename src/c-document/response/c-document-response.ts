import { User } from "src/user/entity/user.entity";

export interface CDocumentResponse {
    _id: string;
    url: string;
    createdAt: string;
    uploadedBy: User;
}
