import {ModelDefinition, Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

import {AuthProvider} from '@hoba/shared/interfaces';

@Schema()
export class UserAuthProvider extends Document {
    @Prop({type: String, enum: Object.values(AuthProvider)})
    providerType: AuthProvider;

    @Prop()
    providerUserId: string;

    @Prop({type: [Types.ObjectId], ref: 'User'})
    userId: string;
}

export const UserAuthProviderModelDefinition: ModelDefinition = {
    name: UserAuthProvider.name,
    schema: SchemaFactory.createForClass(UserAuthProvider),
};
